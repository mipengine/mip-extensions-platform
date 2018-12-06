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
        console.log(pos);
        candan.addEventListener('click', function () {
            console.log(this);
            if (pos.style.display === 'none') {
                pos.style.display = 'block';
            } else {
                pos.style.display = 'none';
            }
        });
    };

    return customElement;
});
