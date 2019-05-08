/**
 * @file mip-hushenao-test1 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        var type = element.getAttribute('type');
        var iframe = document.createElement('iframe');
        var width = window.innerWidth;
        var height = window.innerHeight;
        iframe.width = width;
        iframe.height = height;
        iframe.src = '';
        if (!type) {
            iframe.src = 'http://www.baidu.com';
        };
        element.append(iframe);
    };

    return customElement;
});
