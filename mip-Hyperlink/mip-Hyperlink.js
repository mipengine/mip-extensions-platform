/**
 * @file mip-Hyperlink 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;
        element.addEventListener('click', function (evt) {
            window.location.href = element.getAttribute('href');
        });
    };

    return customElement;
});
