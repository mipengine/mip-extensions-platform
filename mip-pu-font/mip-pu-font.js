/**
 * @file mip-pu-font 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        (function (doc, win) {
            var docEl = doc.documentElement;
            var resizeEvt = 'orientationchange' ? 'orientationchange' : 'resize';
            var recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) {
                    return;
                } ;
                if (clientWidth >= 640) {
                    docEl.style.fontSize = 20 +  'px';
                } else {
                    docEl.style.fontSize = (ele.getAttribute('hhh') - 0) * (clientWidth / 640) +  'px';
                };
            };

            if (!doc.addEventListener) {
                return;
            };
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
    };

    return customElement;
});
