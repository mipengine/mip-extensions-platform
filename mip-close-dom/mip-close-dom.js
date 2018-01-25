/**
 * @file mip-close-dom 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        ele.addEventListener('click', function () {
            var target = ele.parentElement;
            target.parentElement.removeChild(target);
        }, false);
        ele.addEventListener('mousedowm', function () {
            ele.className += 'touchdown';
        });
        ele.addEventListener('mouseup', function () {
            ele.className = ele.className.replace('touchdown', '');
        });
    };
    return customElement;
});