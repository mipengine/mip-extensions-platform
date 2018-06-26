/**
 * @file mip-zol-coordinates 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var item = element.querySelectorAll('.item')[0];

        // console.log(item);
        item.style.left = parseInt(item.getAttribute('data-val'), 2) + '%';
    };
    return customElement;
});
