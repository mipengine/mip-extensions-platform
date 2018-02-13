/**
 * @file mip-and-resize 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var num = this.element.dataset.and - 0;
        var util = require('util');
        var html = document.querySelectorAll('html');
        function size() {
            util.css(html[0], 'font-size', html[0].offsetWidth / num * 100 + 'px');
        }
        size();
        window.addEventListener('resize', size);
    };

    return customElement;
});
