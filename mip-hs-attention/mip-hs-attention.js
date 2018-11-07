/**
 * @file mip-hs-attention 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var test = document.querySelector('.test');
        test.onclick = function () {
            if (test.style.background = 'lightgray') {
                test.style.background = '#ff9900';
                test.style.color = 'white';
            } else {
                test.style.background = 'lightgray';
                test.style.color = 'black';
            }
        };
    };

    return customElement;
});
