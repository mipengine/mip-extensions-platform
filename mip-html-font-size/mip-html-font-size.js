/**
 * @file mip-html-font-size 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = document.documentElement;
        var eleW = screen.availWidth;
        var fz = eleW  * .1;
        ele.style.fontSize = fz + 'px';
    };
    return customElement;
});
