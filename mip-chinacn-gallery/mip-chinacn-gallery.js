/**
 * @file mip-chinacn-gallery 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var Swiper = require('./swiper/swiper.jquery.min');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var viewNum = element.getAttribute('num');
        var between = parseInt(element.getAttribute('between'), 10) || 0;
        var current = element.querySelector('.current');
        var freeMode = element.getAttribute('free');
        var options = {};
        if ('auto' !== viewNum) {
            viewNum = parseInt(viewNum, 10) || 1;
        }

        options.slidesPerView = viewNum;
        options.spaceBetween = between;
        if (current !== null) {
            options.initialSlide = $(current).parent().index();
        }

        if (freeMode !== null) {
            options.freeMode = true;
        }

        new Swiper('.swiper-container', options);
    };

    return customElement;
});
