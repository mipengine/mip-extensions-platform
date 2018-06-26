/**
 * @file mip-st-picslide 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var templates = require('templates');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var inner = element.querySelector('.inner');
        inner.addEventListener('click', function () {
            inner.classList.add('hide');
        }, false);
        this.addEventAction('open', function (pics) {
            templates.render(element, pics).then(function (html) {
                inner.classList.remove('hide');
                inner.innerHTML = html;
            });
        });
    };

    return customElement;
});
