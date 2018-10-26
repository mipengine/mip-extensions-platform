/**
 * @file mip-jiahezigui-search 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var scrollTop = document.documentElement.scrollTop || 0;
        var element = this.element;
        var showClassName = element.getAttribute('show-class') || 'show-class';
        var html = document.querySelector('html');

        /**
         * 显示
         *
         * @param  {Object} event 触发时透传的 event 对象
         * @param  {string} str   在 HTML `on` 属性中透传的参数，如：on="tap:id.click(test)"
         */
        this.addEventAction('open', function (event, str) {
            html.classList.add(showClassName);
            scrollTop = document.documentElement.scrollTop;
        });

        /**
         * 关闭
         *
         * @param  {Object} event 触发时透传的 event 对象
         * @param  {string} str   在 HTML `on` 属性中透传的参数，如：on="tap:id.click(test)"
         */
        this.addEventAction('close', function (event, str) {
            html.classList.remove(showClassName);
            document.documentElement.scrollTop = scrollTop;
        });
    };
    return customElement;
});
