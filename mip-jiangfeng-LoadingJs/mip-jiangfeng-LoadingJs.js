/**
 * @file mip-jiangfeng-LoadingJs 组件
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
        var sNewFirst = document.createElement('script');
        var sNewSencond = document.createElement('script');
        sNewFirst.async = true;
        sNewSencond.async = true;
        sNewFirst.src = element.getAttribute('url1');
        sNewSencond.src = element.getAttribute('url2');
        var s0 = document.getElementsByTagName('script')[0];
        var s1 = document.getElementsByTagName('script')[1];
        s0.parentNode.insertBefore(sNewFirst, s0);
        s1.parentNode.insertBefore(sNewSencond, s1);
        // TODO
    };

    return customElement;
});
