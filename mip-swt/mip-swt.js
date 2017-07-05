/**
 * @file mip-swt 组件
 * @author zhangyuling
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element = this.element;
        var id = element.getAttribute('id');
        var time = element.getAttribute('swt-time');
        var t = document.getElementById(id);
        document.getElementById(id).className.replace('none', '');
        document.getElementById('swt-close').onclick = function () {
            t.setAttribute('class', 'swt-close');
            setTimeout(function () {
                document.getElementById(id).setAttribute('class', '');
            }, time);
        };
    };
    return customElement;
});
