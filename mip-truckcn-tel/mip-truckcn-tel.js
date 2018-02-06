/**
 * @file mip-truckcn-tel 组件
 * @author
 */

define(function (require) {
    var MIP = window.MIP || {};
    var a = MIP.hash.get('a');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        if (a) {
            var tel = (a.split('*', 1));
        }
        else {
            var element = this.element;
            tel = element.getAttribute('default-tel');
        }
        document.write('<a href=tel:', tel, '>', tel, '</a>');
    };
    return customElement;
});
