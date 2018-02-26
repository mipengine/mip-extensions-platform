/**
 * @file mip-close-dom 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        element.addEventListener('click', function () {
            var target = element.parentElement;
            target.parentElement.removeChild(target);
        }, false);

        element.addEventListener('mousedown', function () {
            element.className += 'touchdown';
        });

        element.addEventListener('mouseup', function () {
            element.className = element.className.replace('touchdown', '');
        });
    };

    return customElement;
});
