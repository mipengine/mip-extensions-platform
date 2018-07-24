/**
 * @file mip-otto-rem 组件
 * @author xinbao
 * @Date: 2018-07-23
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var element = this.element;
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        function recalc() {
            var clientWidth = document.documentElement.clientWidth || window.innerWidth;
            var UIWidth = parseFloat(element.getAttribute('baseWidth')) || 750; // 设计稿
            var baseFontSize = parseFloat(element.getAttribute('rem')) * 2 || 40;
            var result = ((clientWidth / UIWidth) * baseFontSize).toFixed(2);
            document.querySelector('html').style.fontSize = result + 'px';
        }
        recalc();
        // 屏幕切换
        if (document.addEventListener) {
            window.addEventListener(resizeEvt, recalc, false);
            document.addEventListener('DOMContentLoaded', recalc, false);
        }

    };

    return customElement;
});
