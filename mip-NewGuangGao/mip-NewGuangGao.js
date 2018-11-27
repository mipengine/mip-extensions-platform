/**
 * @file mip-NewGuangGao 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        var sNew = document.createElement('script');
        sNew.async = true;
        sNew.src = element.getAttribute('url');
        var s0 = document.getElementsByTagName('script')[0];
        s0.parentNode.insertBefore(sNew, s0);
    };

    return customElement;
});
