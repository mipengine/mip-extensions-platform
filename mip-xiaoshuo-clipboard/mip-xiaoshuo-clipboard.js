/**
 * @file mip-xiaoshuo-clipboard 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var ClipboardJS = require('./clipboard.min');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var clipEle = this.element;
        new ClipboardJS(clipEle);

    };

    return customElement;
});
