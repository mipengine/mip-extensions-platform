/**
 * @file mip-page-size 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        function setFontSize() {
            var wb = document.documentElement.clientWidth;
            wb = wb > 768 ? 768 : wb;
            document.documentElement.style.fontSize = wb / 16 + 'px';
        }
        var t1 = null;
        window.addEventListener('resize', function () {
            clearTimeout(t1);
            t1 = setTimeout(setFontSize, 100);
        }, false);
        setFontSize();
    };

    return customElement;
});
