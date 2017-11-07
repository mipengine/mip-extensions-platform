/**
 * @file mip-jt-madapt 自动适配手机屏幕宽度
 * @author jt
 */

define(function (require) {

    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var element2 = this.element;
        var widthstr = $(element2).attr('width');
        var width = 750;
        if (width) {
            try {
                width = parseInt(widthstr, 10);
            } catch (e) {
                width = 750;
                console.log(e);
            }
        }
        var docEl = document.documentElement;
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        var resize = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                return;
            }
            if (clientWidth >= width) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / width) + 'px';
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
