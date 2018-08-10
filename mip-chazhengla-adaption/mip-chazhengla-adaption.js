/**
 * @file mip-adaption 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        (function (doc, win) {
            var docEl = doc.documentElement;
            var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
            var reCalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) {
                    return;
                }
                win.baseFontSize = 100 * (clientWidth / 750);
                docEl.style.fontSize = win.baseFontSize + 'px';
            };
            if (!doc.addEventListener) {
                return;
            }
            reCalc();
            win.addEventListener(resizeEvt, reCalc, false);
            doc.addEventListener('DOMContentLoaded', reCalc, false);
        })(document, window);
    };
    return customElement;
});
