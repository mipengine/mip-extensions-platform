/**
 * @file mip-qqy-yuyue 去去游手机预约组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var e = $(this.element);
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

    };

    return customElement;
});
