/**
 * @file mip-xyz-toggle-class 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var _this = this;
        var el = _this.element;
        var target = document.querySelector(el.getAttribute('target'));
        var cls = el.getAttribute('className');
        el.addEventListener('click', function() {
            el.classList.toggle(cls);
            target && target.classList.toggle(cls);
        });
    };
    return customElement;
});
