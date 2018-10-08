/**
 * @file mip-anchor 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var attr = element.getAttribute('data-to');
        element.addEventListener('click', function () {
            var divTop = document.getElementById(attr).offsetTop;
            window.scrollTo(0, divTop);
        });
    };
    return customElement;
});
