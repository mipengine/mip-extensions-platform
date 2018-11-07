/**
 * @file mip-hs-like 组件
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
        var num = 0;
        var btn = document.getElementById('btn');
        btn.onclick = function () {
            num++;
            btn.innerText = num;
        };
    };

    return customElement;
});
