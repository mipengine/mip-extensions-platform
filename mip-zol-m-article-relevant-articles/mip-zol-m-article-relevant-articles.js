/**
 * @file mip-zol-m-article-relevant-articles 组件
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
        var dataset = Object.assign({
            hideClass: 'hide'
        }, element.dataset);

        var content = element.querySelector('[data-role="list"]');
        var btn = element.querySelector('[data-role="load-btn"]');

        if (content && btn) {
            btn.addEventListener('click', function () {
                [].forEach.call(content.querySelectorAll('.' + dataset.hideClass), function (item) {
                    if (item.parentNode === content) {
                        item.classList.remove(dataset.hideClass);
                    }
                });
                btn.remove();
                btn = null;
            });
        }
    };

    return customElement;
});
