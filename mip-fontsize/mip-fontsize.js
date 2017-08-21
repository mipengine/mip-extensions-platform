/**
 * @file mip-fontsize 组件
 * @author zhouqian04<zhouqian04@baidu.com>
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var docEl = document.documentElement;
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        function recalc() {
            var clientWidth = docEl.clientWidth;
            if (clientWidth) {
                docEl.style.fontSize = 100 * (clientWidth / 720) + 'px';
               // docEl.style.display = 'block';
            }
        }
        recalc();
        if (document.addEventListener) {
            window.addEventListener(resizeEvt, recalc, false);
            document.addEventListener('DOMContentLoaded', recalc, false);
        }
    };

    return customElement;
});
