/**
 * @file mip-xxd-im 组件
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
        var redirect = self.element.dataset.redirect || '/';
        self.element.addEventListener('click', function () {
            window.cambrian && window.cambrian.invokeBcpIM({
                fail: function () {
                    window.top.location.href = redirect;
                }
            });
        });
    };

    return customElement;
});
