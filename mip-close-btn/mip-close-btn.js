/**
 * @file mip-close-btn 组件
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
        var targetName = ele.getAttribute('close-target');
        var target = document.getElementById(targetName);
        ele.addEventListener('click', function () {
            // target.parentElement.removeChild(target);
            if (!hasClass(target, ' hide')) {
                target.className += ' hide';
            }
        }, false);
    };
    return customElement;
});

function hasClass(ele, clsName) {
    return (' ' + ele.className + ' ').indexOf(' ' + clsName + ' ') > -1;
}
