/**
 * @file mip-adaption 组件
 * @author
 */

define(function (require) {
    'use strict';

    var docEl = document.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    if (!document.addEventListener) {
        return;
    }
    reCalc();
    window.addEventListener(resizeEvt, reCalc, false);
    document.addEventListener('DOMContentLoaded', reCalc, false);

    function reCalc() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) {
            return;
        }
        window.baseFontSize = 100 * (clientWidth / 750);
        docEl.style.fontSize = window.baseFontSize + 'px';
    }


    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {};
    return customElement;
});
