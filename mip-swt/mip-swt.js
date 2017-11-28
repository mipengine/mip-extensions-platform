/**
 * @file mip-lnxyw-swt 组件
 * @author zhangyuling
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element = this.element;
        var time = element.getAttribute('swt-time') || '15000';
        var showtime = element.getAttribute('show-time') || '0';
        element.setAttribute('class', 'swt-close');
        setTimeout(function () {
            element.setAttribute('class', '');
        }, showtime);
        document.getElementById('swt-close').onclick = function () {
            element.setAttribute('class', 'swt-close');
            setTimeout(function () {
                element.setAttribute('class', '');
            }, time);
        };
    };
    return customElement;
});
