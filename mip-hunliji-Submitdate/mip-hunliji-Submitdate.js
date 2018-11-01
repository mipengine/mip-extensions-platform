/**
 * @file mip-hunliji-Submitdate 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var viewer = require('viewer');
    var util = require('util');
    // require('./utils');

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
                    $.toast('预约成功', 'text');
                    viewer.eventAction.execute('hide', event.target, event);
                } else {
                    $.toast(result.status.msg, 'text');
                    viewer.eventAction.execute('hide', event.target, event);
                    //     viewer.eventAction.execute('hide', event.target, event);
                    // }, 2000);
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
                    $.toast('预约成功', 'text');
                    viewer.eventAction.execute('hide', event.target, event);
                } else {
                    $.toast(result.status.msg, 'text');
                    viewer.eventAction.execute('hide', event.target, event);
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
        var clickToken = $(element).attr('mip-click-token');
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var info;
        var script = element.querySelector('script[type="application/json"]');
        var params = {};
        if (script) {
            var customParams = JSON.parse(script.textContent.toString());
            params = util.fn.extend(params, customParams);
        }

        this.addEventAction('submitdateCustomLogin', function (e) {
            if (e.origin === 'actionSubmitdate') {
                validateSub(info, clickToken);
            }
        });
        $(element).on('click', '.open_box_submit', function (event) {
            info = JSON.parse($(element).attr('info'));
            if (!info.isLogin) {
                viewer.eventAction.execute('actionSubmitdate', event.target, event);
            }
            validateSub(info, clickToken);
        });

        function validateSub(info, clickToken) {
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
        }
    };

    (function ($) {
        'use strict';
        var defaults;
        var show = function (html, className) {
            className = className || '';
            var mask = $('<div class="weui-mask_transparent"></div>').appendTo(document.body);
            var tpl = '<div class="weui-toast ' + className + '">' + html + '</div>';
            var dialog = $(tpl).appendTo(document.body);
            dialog.addClass('weui-toast--visible');
            // dialog.show();
        };
        var hide = function (callback) {
            $('.weui-mask_transparent').remove();
            $('.weui-toast--visible').removeClass('weui-toast--visible');
        };
        $.toast = function (text, style, callback) {
            if (typeof style === 'function') {
                callback = style;
            }
            var className;
            var iconClassName = 'weui-icon-success-no-circle';
            var duration = 2500;
            if (style === 'cancel') {
                className = 'weui-toast_cancel';
                iconClassName = 'weui-icon-cancel';
            }
            else if (style === 'forbidden') {
                className = 'weui-toast--forbidden';
                iconClassName = 'weui-icon-warn';
            }
            else if (style === '') {
                className = 'weui-toast--text';
            }
            else if (typeof style === typeof 1) {
                duration = style;
            };
            show('<i class="' + iconClassName + ' weui-icon_toast"></i>'
                + '<p class="weui-toast_content">' + (text || '已经完成') + '</p>', className);
            setTimeout(function () {
                hide(callback);
            }, duration);
        };
        $.showLoading = function (text) {
            var html = '<div class="weui_loading">';
            html += '<i class="weui-loading weui-icon_toast"></i>';
            html += '</div>';
            html += '<p class="weui-toast_content">' + (text || '数据加载中') + '</p>';
            show(html, 'weui_loading_toast');
        };
        $.hideLoading = function () {
            hide();
        };
    }($));

    return customElement;
});
