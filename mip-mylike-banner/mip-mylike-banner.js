/**
 * @file mip-mylike-banner 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var text = element.getAttribute('seo') || 'index';
        var href = element.getAttribute('url') || '';
        // get
        fetch(href + '?t=' + text).then(function (res) {
            return res.json();
        }).then(function (data) {
            var data = {musketeers: data};
            var templates = require('templates');
            templates.render(element, data).then(function (html) {
                element.innerHTML = html;
            });
        });
    };

    return customElement;
});
