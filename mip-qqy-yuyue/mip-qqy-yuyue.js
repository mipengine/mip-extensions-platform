/**
 * @file mip-qqy-yuyue 去去游手机预约组件
 * @author chinayubo 415204@qq.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var e = $(this.element);
        var element = this.element;
        var yuyue =  e.find($('.yuyue'));
        var tbox = e.find('.msg_box');
        var bg = e.find('.opacity_bg');

        yuyue.off('click').on('click', function () {
            var bodyheight = $(document).height();
            bg.css('height', bodyheight);
            tbox.show();
            bg.css('opacity', '.4');
        });
        e.find('.msg_box .msg_close').off('click').on('click', function () {
            tbox.hide();
            bg.hide();
        });
        // 提交预约
        e.find('.yuyue_btn').on('click', function () {
            var id = $(this).attr('data-id');
            var url = element.getAttribute('url');
            var phone = e.find('input[name=phone]').val();
            var reg = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(199|198|166)|(17[0,1,3,5,6,7,8]))\d{8}$/;
            if (!reg.test(phone)) {
                alert('请填写正确手机号码');
                return false;
            }
            $.getJSON(url + '&type=1&id=' + id + '&callback=?', function (data) {
                if (data.status) {
                    alert('恭喜您，预约成功。');
                    tbox.hide();
                    bg.hide();
                }
                else {
                    alert(data.message);
                    return false;
                }
            });
        });

    };

    return customElement;
});
