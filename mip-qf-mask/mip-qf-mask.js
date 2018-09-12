/**
 * @file mip-qf-mask 组件
 * @author 9-lives
 */

define(function (require) {
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var component = this.element; // 组件元素

        this.addEventAction('close', function () {
            component.style.display = 'none';
        });
        this.addEventAction('open', function () {
            component.style.display = 'block';
        });
        this.addEventAction('toggle', function () {
            /* eslint-disable */
            component.style.display = window.getComputedStyle(component, null).getPropertyValue('display') === 'none' ? 'block' : 'none';
            /* eslint-disable */
        });
    };

    return customElement;
});
