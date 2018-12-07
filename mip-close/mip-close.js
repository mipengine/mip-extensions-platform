/**
 * @file mip-close 组件
 * @author
 */
(function (doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                return;
            }
            docEl.style.fontSize = 40 * (clientWidth / 640) + 'px';
        };
    if (!doc.addEventListener) {
        return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        ele.addEventListener('click', function () {
            var target = ele.parentElement;
            target.parentElement.removeChild(target);
        }, false);
    };

    return customElement;
});
