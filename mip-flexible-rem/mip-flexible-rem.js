/**
 * @file mip-flexible-rem 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        // 基准大小
        const baseSize = 100;
        // 设置 rem 函数
        function setRem() {
            var docEl = document.documentElement;
            document.documentElement.style.fontSize = 100 * ((docEl.clientWidth > 640 ? 640
                : docEl.clientWidth) / 640) + 'px';
        }
        // 初始化
        setRem();
        // 改变窗口大小时重新设置 rem
        window.onresize = function () {
            setRem();
        };
    };

    return customElement;
});
