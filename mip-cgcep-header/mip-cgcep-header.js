/**
 * @file mip-cgcep-header 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var taggle = function (selector, tag) {
        var elementer = $(selector);
        var flag = elementer.hasClass(tag);
        if (flag) {
            elementer.removeClass(tag);
        }
        else {
            elementer.addClass(tag);
        }

    };

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInViewcallback = function () {
        var selef = this.element;
        var goalclass = '.' + selef.getAttribute('goalclass');
        var taclass = selef.getAttribute('taclass');
        selef.addEventListener('click', function () {
            taggle(goalclass, taclass);
        }, false);
    };

    return customElement;
});
