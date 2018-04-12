/**
 * @file mip-cgcep-swiper 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var Swiper = require('./swiper/swiper.jquery.min');

    /**
     * 构造元素，只会运行一次
     * 元素构建完成后马上初始化swiper
     */

    customElement.prototype.build = function () {
        var element = this.element;
        var container = element.getAttribute('container') || '.swiper-container';
        var script = element.querySelector('script[type="application/json"]');
        var data = script ? JSON.parse(script.textContent.toString()) : {};
        var swiper = new Swiper(container, data);
    };

    return customElement;
});
