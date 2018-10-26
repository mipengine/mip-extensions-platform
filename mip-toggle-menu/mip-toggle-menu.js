/**
 * @file mip-toggle-menu 组件
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
        var menubox = document.querySelector('.menubox');
        var myclose = document.querySelector('.menubox .myclose');

        ele.addEventListener('click', function () {
            menubox.className += ' active';
        }, false);

        myclose.addEventListener('click', function () {
            menubox.className = menubox.className.replace('active', '');
        }, false);

// TODO
    };

    return customElement;
});
