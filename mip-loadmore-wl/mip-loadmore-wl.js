/**
 * @file mip-loadmore-wl 组件
 * @author
 */
define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        var parent = ele.find('.max-height');
        ele.find('.more-box').on('click', function () {
            var $this = $(this);
            $this.remove();
            parent.removeClass('max-height');
        });
    };
    return customElement;
});