/**
 * @file mip-cojay-test 组件
 * @author cojay
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        window.onload = function () {
            alert('test888');
        };
    };
    return customElement;
});
