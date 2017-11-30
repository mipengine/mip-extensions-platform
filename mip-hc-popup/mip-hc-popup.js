/**
 * @file mip-hc-popup 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var parentEl = ele.parentElement;
        var attRs = ele.attributes;
        var objVal = {};
        var hcAlert = '';
        for (var i in attRs) {
            objVal[attRs[i].name] = attRs[i].value;
        };
        if (objVal.target === undefined) {
            hcAlert = document.querySelector('#hc-alert');
        }
        else {
            hcAlert = document.querySelector('#' + objVal.target);
        }
        if (hcAlert !== null) {
            hcAlert.addEventListener('click', function () {
                parentEl.className = parentEl.className.replace(' hc-hide', '');
            });
        };
        parentEl.addEventListener('click', function () {
            this.className += ' hc-hide';
        }, false);
    };

    return customElement;
});
