/**
 * @file mip-qqy-like 去去游喜欢tab组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var e = $(this.element);
        e.find($('.gxhhd li')).off('click').on('click', function () {
            var index = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            e.find($('.swiper-wrapper .swiper-slide')).eq(index).addClass('dis').siblings().removeClass('dis');
        });
    };

    return customElement;
});
