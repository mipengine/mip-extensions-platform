/**
 * @file mip-adaptable 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    window.onload = function () {
        document.documentElement.style.fontSize = window.innerWidth / 6.4 + 'px';
    };
    customElement.prototype.firstInviewCallback = function () {
        window.onresize = function () {
            document.documentElement.style.fontSize = window.innerWidth / 6.4 + 'px';
        };
    };

    return customElement;
});
