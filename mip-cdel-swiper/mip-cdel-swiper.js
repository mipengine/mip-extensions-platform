/**
 * @file mip-cdel-swiper 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var Swiper = require('./swiper/swiper.min');

    /**
     * 构造元素，只会运行一次
     * 元素构建完成后马上初始化swiper
     */

    customElement.prototype.build = function () {
        var element = this.element;
        var container = element.getAttribute('container') || '.swiper-container';
        var pag = element.getAttribute('pag') || '';
        var pager = element.getAttribute('pager') || '.swiper-pagination-bullet';
        var pageron = element.getAttribute('pageron') || 'swiper-pagination-bullet-active';
        var script = element.querySelector('script[type="application/json"]');
        var data = script ? JSON.parse(script.textContent.toString()) : {};
        var swiper;
        if (pag) {
            var pager = $(pag).children(pager);
            data.onSlideChangeEnd = function (swiper) {
                pager.removeClass(pageron).eq(swiper.activeIndex).addClass(pageron);
            };
            pager.on('click', function () {
                var self = $(this);
                var index = self.index();
                swiper.slideTo(index, 500, false);
                pager.removeClass(pageron).eq(index).addClass(pageron);
            });
        }
        swiper = new Swiper(container, data);
    };
    return customElement;
});
