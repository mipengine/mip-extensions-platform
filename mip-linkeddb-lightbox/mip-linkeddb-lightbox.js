/**
 * @file mip-linkeddb-lightbox 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        $(ele).parent().find('.menu').on('click', function () {
            $(ele).parent().find('.mip-opacity').toggleClass('mip-opacity-visible');
            $(ele).find('.mip-lightbox').toggleClass('show');
        });
        $(ele).parent().find('.mip-opacity').on('click', function () {
            $(ele).parent().find('.mip-opacity').removeClass('mip-opacity-visible');
            $(ele).find('.mip-lightbox').removeClass('show');
        });
        $(ele).parent().find('.mip-lightbox').on('click', function () {
            $(ele).parent().find('.mip-opacity').removeClass('mip-opacity-visible');
            $(ele).find('.mip-lightbox').removeClass('show');
        });
    };
    return customElement;
});