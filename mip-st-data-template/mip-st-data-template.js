/**
 * @file mip-st-data-template 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var templates = require('templates');
    var viewer = require('viewer');

    function getQuery(url) {
        url = url || location.href;
        var query = url.split('?')[1] || '';
        if (!query) {
            return {};
        }
        return query.split('&').reduce(function (obj, item) {
            var data = item.split('=');
            obj[data[0]] = decodeURIComponent(data[1]);
            return obj;
        }, {});
    }

    function queryToStr(obj) {
        return Object.keys(obj).map(function (key) {
            return key + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        // 需要从页面地址里获取，并使用另一个字段传给数据请求的映射表
        var params = element.getAttribute('params').split(',').reduce(function (obj, item) {
            var data = item.split(':');
            obj[data[0]] = data[1] || data[0];
            return obj;
        }, {});
        // 获取当前页面的所有query
        var query = getQuery();
        // 获取数据请求的url
        var url = element.getAttribute('url');
        // 获取数据请求url里已经写入的query
        var originQuery = getQuery(url);
        // 把需要映射的query与原有query混合
        Object.keys(params).map(function (key) {
            originQuery[params[key]] = query[key];
        });
        // 生成最终数据请求的query string
        var queryStr = queryToStr(originQuery);
        // 获取url问号前面的部分
        var uri = url.split('?')[0];
        // 获取数据
        fetch(uri + '?' + queryStr).then(function (res) {
            // 转json
            return res.json();
        }, function () {
            // 向外界组件暴露加载失败事件
            viewer.eventAction.execute('dataloadfail', element);
        }).then(function (res) {
            if (!res.code) {
                // 加载成功
                viewer.eventAction.execute('dataloaded', element);
                // 渲染模板
                templates.render(element, res.data).then(function (html) {
                    element.innerHTML = html;
                    // 渲染结束
                    viewer.eventAction.execute('templaterendered', element);
                });
            }
        });
    };

    return customElement;
});
