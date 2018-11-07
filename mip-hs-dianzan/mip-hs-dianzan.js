/**
 * @file mip-hs-dianzan 组件
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
        var add = document.querySelectorAll('.add');
        var num = document.querySelectorAll('.num');
        for (var i = 0; i < add.length; i++) {
            add[i].index = i;
            add[i].onclick = function () {
                num[this.index].innerText++;
            };
        };
    };

    return customElement;
});
