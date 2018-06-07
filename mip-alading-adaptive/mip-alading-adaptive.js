/**
 * @file mip-alading-adaptive 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    (function (doc, win, designWidth) {
        var rootDom = doc.body || doc.documentElement;
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        var recalc = function () {
            var clientWidth = rootDom.clientWidth;
            if (!clientWidth) {

                return;
            }
            rootDom.style.fontSize = 40 * (clientWidth / designWidth) + 'px';
            doc.documentElement.style.fontSize = 40 * (clientWidth / designWidth) + 'px';
        };
        if (!doc.addEventListener) {
            return;
        }
        recalc();
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    }(document, window, 750));
    customElement.prototype.firstInviewCallback = function () {
    };
    return customElement;
});
