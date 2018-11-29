/**
 * @file mip-article 组件
 * @author
 */

define(function (require) {
    'use strict';

    let customElement = require('customElement').create();
    let templates = require('templates');
    let fetchJsonp = require('fetch-jsonp');
    function getQueryStringByName(name) {
        let result = location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
        if (result == null || result.length < 1) {
            return '';
        }
        return result[1];
    }

    /**
    * [pushResult push结果函数]
    *
    * @param  {string} url ajax请求的url
    */
    function pushResult(url) {
        let self = this;
        fetchJsonp(url, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            renderTemplate.call(self, data.data);
        });
    }

    /**
    * [renderTemplate 获取模板]
    *
    * @param  {Object} data 渲染数据
    */
    function renderTemplate(data) {
        let self = this;
        templates.render(
            self.element, data
        ).then(function (html) {
            document.title = data.title;
            self.element.innerHTML = html;
            let article = document.createElement('div');
            article.innerHTML = data.content;
            self.element.appendChild(article);
        });
    }

    /**
    * [getUrl 获取最后拼接好的数据请求 url]
    *
    * @param  {string}  src    原始 url
    * @param  {Array} paramKeys     参数名称
    * @return {string}         拼接好的 url
    */
    function getUrl(src, paramKeys) {
        let url = src;
        if (src.indexOf('?') > 0) {
            url += src[src.length - 1] === '?' ? '' : '&';
        }
        else {
            url += '?';
        }
        paramKeys.forEach(element => {
            url += element + '=' + getQueryStringByName(element) + '&';
        });
        return url.slice(0, url.length - 1);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        let self = this;
        let element = self.element;
        let src = element.getAttribute('src') || '';
        let paramKeys = element.hasAttribute('paramKeys')
            ? JSON.parse(element.getAttribute('paramKeys').replace(/'/g, '\"')) : [];
        let url = getUrl(src, paramKeys);
        pushResult.call(self, url);
    };
    return customElement;
});
