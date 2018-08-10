/**
 * @file mip-qtkj-rem 组件
 * @author yzxsl
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var winW = document.documentElement.offsetWidth || document.body.offsetWidth;
        var conW = parseInt(element.getAttribute('width'), 10);
        if (winW < (conW + 10)) {
            document.getElementsByTagName('html')[0].style.fontSize = winW / conW * 100 + 'px';
        }
        window.onresize = function () {
            var winW = document.documentElement.offsetWidth || document.body.offsetWidth;
            if (winW < (conW + 10)) {
                document.getElementsByTagName('html')[0].style.fontSize = winW / conW * 100 + 'px';
            }
        };
    };
    return customElement;
});
