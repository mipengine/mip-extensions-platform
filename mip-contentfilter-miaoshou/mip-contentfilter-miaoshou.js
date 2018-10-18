/**
 * @file mip-contentfilter-miaoshou 组件
 * @author qf_niewei@163.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    customElement.prototype.createdCallback = function () {
        var e = this.element;
        var selectName = e.getAttribute('selectName') ? e.getAttribute('selectName') : '.introduce_box';
        var contentContainer = e.querySelector(selectName);

        var p = contentContainer.querySelectorAll('p');
        var length = p.length;

        for (var i = 0; i < length; i++) {
            if (p[i].firstChild.tagName === 'BR') {
                p[i].parentNode.removeChild(p[i]);
            }
        }
    };

    return customElement;
});