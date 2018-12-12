/**
 * @file mip-watch-nav 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO

        var element = this.element;

        $(element).find('.nav-more').click(function () {
            $('.nav-side-main').css({left: '0'});
        });

        $(element).find('.nav-side-close').click(function () {
            $('.nav-side-main').css({left: '-101%'});
        });
    };

    return customElement;
});
