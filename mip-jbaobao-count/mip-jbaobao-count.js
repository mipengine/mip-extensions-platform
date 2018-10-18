/**
 * @file mip-jbaobao-count 组件
 * @author
 */

define(function (require) {
        var customElement = require('customElement').create();
        customElement.prototype.firstInviewCallback = function () {
            var e = document.createElement('script');
            e.setAttribute('src', 'https://wx.jbaobao.com/js/test.js?00202');
            var ele = this.element;
            ele.appendChild(e);
        };
        return customElement;
    });
