/**
 * @file mip-yuandun-article 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var content = element.getAttribute('content');
        var container = element.getAttribute('container');
        $('#' + container).append(content);
        element.remove();
    };
    return customElement;
});
