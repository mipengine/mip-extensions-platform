/**
 * @file mip-sy-rem 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        (function () {
            var base = element.getAttribute('base') || 32;
            var rootml = document.getElementsByTagName('html') || document.getElementsByTagName('HTML');
            rootml = rootml[0];
            var fontSize = window.screen.width < 640 ? window.screen.width / base : 20;
            rootml.style.fontSize = fontSize + 'px';
            console.log('1rem在320屏幕下为10px');
        })();
        window.onresize = function () {
            var base = element.getAttribute('base') || 32;
            var rootml = document.getElementsByTagName('html') || document.getElementsByTagName('HTML');
            rootml = rootml[0];
            var fontSize = window.screen.width < 640 ? window.screen.width / base : 20;
            rootml.style.fontSize = fontSize + 'px';
            console.log('1rem在320屏幕下为10px');
        };
    };
    return customElement;
});
