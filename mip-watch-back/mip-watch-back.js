/**
 * @file mip-watch-back 组件
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
        // TODO
        var element = this.element;
        element.find('.left-wrapper').click(function () {
            history.back();
        });
    };

    return customElement;
});
