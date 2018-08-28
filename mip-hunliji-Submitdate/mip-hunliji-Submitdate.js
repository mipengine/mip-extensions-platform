/**
 * @file mip-hunliji-Submitdate 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');

    var customElement = require('customElement').create();

    function setuser(element, url, name, phone, id) {
        $.ajax({
            url: url,
            type: 'post',
            data: {
                'merchant_id': id,
                'phone_num': phone,
                'fullname': name,
                'from_type': 12
            },
            success: function (result) {
                if (result.status.RetCode === 0) {
                    if (result.data.is_login === 1) {
                        location.href = location.origin
                        + '/p/wedding/Public/wap/m/mip_baidu/chat/dist/index.html?id=' + id;
                    } else {
                        $(element).find('#open_tips p').html('预约成功');
                        $(element).find('#open_tips').show();
                        setTimeout(function () {
                            $(element).find('#open_tips').hide();
                            window.top.location.href = location.href;
                        }, 2000);
                    }
                } else {
                    $(element).find('#open_tips p').html(result.status.msg);
                    $(element).find('#open_tips').show();
                    setTimeout(function () {
                        $(element).find('#open_tips').hide();
                        window.top.location.href = location.href;
                    }, 2000);
                }
            }
        });
    }

    function sethotel(element, url, city, time, phone) {
        $.ajax({
            url: url,
            type: 'post',
            data: {
                'phone': phone,
                'query_time': time,
                'cid': city,
                'type': 14
            },
            success: function (result) {
                if (+result.status.RetCode === 0) {
                    $(element).find('#open_tips p').html('预约成功');
                    $(element).find('#open_tips').show();
                    setTimeout(function () {
                        $(element).find('#open_tips').hide();
                        window.top.location.href = location.href;
                    }, 2000);
                } else {
                    $(element).find('#open_tips p').html(result.status.msg);
                    $(element).find('#open_tips').show();
                    setTimeout(function () {
                        $(element).find('#open_tips').hide();
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
        $(element).on('click', '.open_box_submit', function () {
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
                    setuser(element, apiurl, name, phone, merchantid);
                } else {
                    sethotel(element, apiurl, city, time, phone);
                }
            }
        });
    };

    return customElement;
});
