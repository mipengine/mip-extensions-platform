/**
 * @file mip-iwanvi-list 组件
 * @author zhangmc to:重绘fetchJsonp header cookie对象[cookie暂时不支持跨域]
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    var fetchJsonp = require('fetch-jsonp');
    var util = require('util');
    var customStorage = util.customStorage(0);
    var $ = require('zepto');

    /**
     * [renderTemplate 获取模板]
     *
     * @param  {Object} data 渲染数据
     */
    function renderTemplate(data) {
        var self = this;
        if (data && data.items && data.items instanceof Array) {
            templates.render(
                self.element, data.items
            ).then(render.bind(self));
        }
        else {
            console.error('数据不符合规范');
        }
    }

    /**
     * [render dom渲染函数]
     *
     * @param  {Array} htmls [html对象数组]
     */
    function render(htmls) {
        var self = this;
        var fragment = document.createDocumentFragment();
        htmls.map(function (html) {
            var node = document.createElement('div');
            node.innerHTML = html;
            node.setAttribute('role', 'listitem');

            fragment.appendChild(node);
        });
        self.container.appendChild(fragment);
    }

    /**
     * [pushResult push结果函数]
     *
     * @param  {string} src ajax请求的url
     * @param  {string} mipcookie mipcookie
     */
    function pushResult(src, mipcookie) {
        var self = this;

        if (self.isEnd) {
            return;
        }

        self.button = document.querySelector('.mip-iwanvi-list-more');
        self.button.innerHTML = '加载中...';

        var url = getUrl(src, self.pnName, self.pn++);

        fetchJsonp(url, {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'json',
                    'cookie': mipcookie
                },
                mode: 'basic',
                credentials: 'same-origin',
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (!data.status && data.data) {
                    renderTemplate.call(self, data.data);
                    self.button.innerHTML = '点击查看更多';
                    if (data.data.isEnd) {
                        self.isEnd = data.isEnd;
                        self.button.innerHTML = '已经加载完毕';
                        self.button.removeAttribute('on');
                    }
                }
                else {
                    self.button.innerHTML = '加载失败';
                }
            });
    }

    /**
     * [getUrl 获取最后拼接好的数据请求 url]
     *
     * @param  {string}  src    原始 url
     * @param  {string}  pnName 翻页字段名
     * @param  {integer} pn     页码
	 * @param  {string}  _header cookie
     * @return {string}         拼接好的 url
     */
    function getUrl(src, pnName, pn) {
        if (!src) {
            console.error('mip-iwanvi-list 的 src 属性不能为空');
            return;
        }
        if (!pnName || !pn) {
            return;
        }
        var url = src;
        if (src.indexOf('?') > 0) {
            url += src[src.length - 1] === '?' ? '' : '&';
            url += pnName + '=' + pn;
        }
        else {
            url += '?' + pnName + '=' + pn;
        }

        return url;
    }


    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = this.element;

        self.container = document.createElement('div');
        self.applyFillContent(this.container);
        self.element.appendChild(this.container);


        if (!self.container.hasAttribute('role')) {
            self.container.setAttribute('role', 'list');
        }

        // 同步配置数据
        if (element.hasAttribute('synchronous-data')) {
            var script = element.querySelector('script[type="application/json"]');
            var data = script ? JSON.parse(script.textContent.toString()) : null;
            renderTemplate.call(self, data);
            return;
        }

        // 异步获取数据
        var src = element.getAttribute('src') || '';
        var url = src;
        if (!src) {
            console.error('mip-iwanvi-list 的 src 属性不能为空');
        }

        self.pnName = element.getAttribute('pnName') || 'pn';
        self.pn = element.getAttribute('pn') || 1;

        var headerdata =  element.getAttribute('data-header') || '';
        var mipcookie = customStorage.get('mipreadercookie');
        if (mipcookie) {
            // set 目前为true即可
            customStorage.set('mipreadercookie', headerdata);
        }
        else {
            customStorage.set('mipreadercookie', headerdata);
        }
        mipcookie = customStorage.get('mipreadercookie');

        // 有查看更多属性的情况
        if (element.hasAttribute('has-more')) {
            self.addEventAction('more', function () {
                pushResult.call(self, src, mipcookie);
            });
        }

        if (element.hasAttribute('preLoad')) {
            url = getUrl(src, self.pnName, self.pn++);
            fetchJsonp(url, {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'json',
                    'cookie': mipcookie
                },
                mode: 'basic',
                credentials: 'same-origin',
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (!data.status && data.data) {
                    renderTemplate.call(self, data.data);
                }
            });
        }
    };

    return customElement;
});
