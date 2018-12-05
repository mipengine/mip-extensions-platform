/**
 * @file mip-menu 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var candan = document.querySelector('#candan');
        var pos = document.querySelector('#pos');

        ele.addEventListener('click', function () {
            if (candan.src === './imgs/caidan.png') {
                pos.style.display = 'block';
                candan.src = './imgs/x.png';
            } else {
                pos.style.display = 'none';
                candan.src = './imgs/caidan.png';
            }
        });
    };

    return customElement;
});
