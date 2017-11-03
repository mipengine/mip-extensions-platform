/**
 * @file mip-jt-madapt 自动适配手机屏幕宽度
 * @author jt
 */

define(function (require) {

    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var docEl = document.documentElement;
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        var resize = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                return;
            }
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

        if (!document.addEventListener) {
            return;
        }
        window.addEventListener(resizeEvt, resize, false);
        document.addEventListener('DOMContentLoaded', resize, false);
    };

    return customElement;
});
