/**
 * @file mip-alertaa 组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var text = element.getAttribute('alert-text') || ' 默认 alert 内容 ';
        element.addEventListener('click', function () {
            alert(text);
        });
    };
    return customElement;
});
