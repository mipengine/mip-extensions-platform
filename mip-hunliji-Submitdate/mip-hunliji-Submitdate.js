/**
 * @file mip-hunliji-Submitdate 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var viewer = require('viewer');
    var util = require('util');

    var customElement = require('customElement').create();

    function setuser(element, url, name, phone, id, event, params, sessionid, clickToken) {
        var body = Object.assign({}, {
            'merchant_id': id,
            'phone_num': phone,
            'fullname': name,
            'from_type': 12,
            'sessionid': sessionid,
            clickToken: clickToken
        }, params);

        $.ajax({
            url: url,
            type: 'post',
            data: body,
            success: function (result) {
                if (result.status.RetCode === 0) {
                    $(element).find('#open_tips p').html('预约成功');
                    $(element).find('#open_tips').show();
                    setTimeout(function () {
                        $(element).find('#open_tips').hide();
                        viewer.eventAction.execute('hide', event.target, event);
                    }, 2000);
                } else {
                    $(element).find('#open_tips p').html(result.status.msg);
                    $(element).find('#open_tips').show();
                    setTimeout(function () {
                        $(element).find('#open_tips').hide();
                        viewer.eventAction.execute('hide', event.target, event);
                    }, 2000);
                }
            }
        });
    }

    function sethotel(element, url, city, time, phone, event, params, sessionid, clickToken) {
        var body = Object.assign({}, {
            'phone': phone,
            'query_time': time,
            'cid': city,
            'type': 14,
            'sessionid': sessionid,
            clickToken: clickToken
        }, params);

        $.ajax({
            url: url,
            type: 'post',
            data: body,
            success: function (result) {
                if (+result.status.RetCode === 0) {
                    $(element).find('#open_tips p').html('预约成功');
                    $(element).find('#open_tips').show();
                    setTimeout(function () {
                        $(element).find('#open_tips').hide();
                        viewer.eventAction.execute('hide', event.target, event);
                    }, 2000);
                } else {
                    $(element).find('#open_tips p').html(result.status.msg);
                    $(element).find('#open_tips').show();
                    setTimeout(function () {
                        $(element).find('#open_tips').hide();
                        viewer.eventAction.execute('hide', event.target, event);
                    }, 2000);
                }
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var type = $(element).attr('data-type');
        var apiurl = $(element).attr('data-url');
        var merchantid = $(element).attr('data-id');
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;

        var script = element.querySelector('script[type="application/json"]');
        var params = {};
        if (script) {
            var customParams = JSON.parse(script.textContent.toString());
            params = util.fn.extend(params, customParams);
        }

        $(element).on('click', '.open_box_submit', function (event) {
            var info = JSON.parse($(element).attr('info'));
            var clickToken = $(element).attr('mip-click-token');

            if (!info.isLogin) {
                viewer.eventAction.execute('login', event.target, event);
                return;
            }

            if (type === 'package') {
                var name = $(element).find('.mipfrom input').eq(0).val();
                var phone = $(element).find('.mipfrom input').eq(1).val();
            } else {
                var name = $(element).find('.mipfrom input').eq(0).val();
                var city = $(element).find('.mipfrom input').eq(1).val();
                var time = $(element).find('.mipfrom input').eq(2).val();
                var phone = $(element).find('.mipfrom input').eq(3).val();
            }
            if (type === 'package') {
                if (!name) {
                    $(element).find('.name_box').css('visibility', 'visible');
                    return false;
                } else {
                    $(element).find('.name_box').css('visibility', 'hidden');
                }
            }
            if (!phone || !myreg.test(phone)) {
                $(element).find('.phone_box').css('visibility', 'visible');
                return false;
            } else {
                $(element).find('.phone_box').css('visibility', 'hidden');
            }
            if (name && phone) {
                if (type === 'package') {
                    setuser(element, apiurl, name, phone, merchantid, event, params, info.sessionId, clickToken);
                } else {
                    sethotel(element, apiurl, city, time, phone, event, params, info.sessionId, clickToken);
                }
            }
        });
    };

    return customElement;
});
