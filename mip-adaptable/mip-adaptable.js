/**
 * @file mip-adaptable 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    window.onload = function () {
        document.documentElement.style.fontSize = Math.floor((window.innerWidth / 6.4) * 10) / 10 + 'px';
    };
    window.onresize = function () {
        document.documentElement.style.fontSize = Math.floor((window.innerWidth / 6.4) * 10) / 10 + 'px';
    };
    customElement.prototype.firstInviewCallback = function () {
        window.onload = function () {
            document.documentElement.style.fontSize = Math.floor((window.innerWidth / 6.4) * 10) / 10 + 'px';
        };
        window.onresize = function () {
            document.documentElement.style.fontSize = Math.floor((window.innerWidth / 6.4) * 10) / 10 + 'px';
        };
    };

    return customElement;
});