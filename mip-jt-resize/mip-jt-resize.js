/**
 * @file mip-jt-resize 金投适配
 * @author jt
 */

define(function (require) {

    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var element2 = this.element;
        var widthstr = $(element2).attr('width');
        var width = 750;
        if (widthstr) {
            try {
                width = parseInt(widthstr, 10);
                if (isNaN(width)) {
                    width = 750;
                }
            } catch (e) {
                width = 750;
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
        // 检查页面大小变化,重新适配用的
        document.addEventListener('DOMContentLoaded', resize, false);
    };

    return customElement;
});
