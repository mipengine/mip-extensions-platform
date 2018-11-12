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
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var element = this.element;
        var showClassName = element.getAttribute('show-class') || 'show-class';
        var html = document.querySelector('html');
        var clearUrl = element.getAttribute('clear-url') || false;
        var historySelector = element.getAttribute('history-selector') || '.search-history';

        /**
         * 显示
         *
         * @param  {Object} event 触发时透传的 event 对象
         * @param  {string} str   在 HTML `on` 属性中透传的参数，如：on="tap:id.click(test)"
         */
        this.addEventAction('open', function (event, str) {
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            html.classList.add(showClassName);
            event.stopPropagation();
            event.preventDefault();
            return false;
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
            document.body.scrollTop = scrollTop;
            event.stopPropagation();
            event.preventDefault();
            return false;
        });

        /**
         * 清空搜索记录
         *
         * @param  {Object} event 触发时透传的 event 对象
         * @param  {string} str   在 HTML `on` 属性中透传的参数，如：on="tap:id.click(test)"
         */
        this.addEventAction('clear', function (event, str) {
            if (clearUrl) {
                var fetchJsonp = require('fetch-jsonp');
                fetchJsonp(clearUrl, {
                    jsonpCallback: 'callback'
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    if (parseInt(res.err_code, 10) === 0) {
                        var util = require('util');
                        util.css(document.querySelector(historySelector), 'display', 'none');
                    }
                });
            }
            event.stopPropagation();
            event.preventDefault();
            return false;
        });
    };
    return customElement;
});
