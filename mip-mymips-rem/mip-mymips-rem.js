/**
 * @file mip-mymips-rem 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        const baseSize = 100;
        // 计算
        function calculateRem() {
            var docEle = document.documentElement;
            document.documentElement.style.fontSize = baseSize * ((docEle.clientWidth > 640 ? 640
                : docEle.clientWidth) / 640) + 'px';
        }
        calculateRem();
        window.onresize = function () {
            calculateRem();
        };
    };

    return customElement;
});
