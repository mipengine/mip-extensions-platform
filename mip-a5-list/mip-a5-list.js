/**
 * @file mip-a5-list 组件
 * @author cuikangyi
 */

define(function (require) {
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var viewport = require('viewport');

    /**
     * [pushResult push结果函数]
     *
     * @param  {string} dataSrc ajax请求的url
     */
    function pushResult(dataSrc) {
        var self = this;

        if (self.isEnd || self.isLoading) {
            return;
        }

        self.isLoading = true;
        self.button = document.querySelector(self.btn);
        self.button.innerHTML = '加载中...';

        var url = getUrl(dataSrc, self.pageName, self.page++);

        fetchJsonp(url, {
            jsonpCallback: 'jsonpcallback',
            timeout: self.timeout
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            var htmlStr = data[self.respDataName];
            if (htmlStr) {
                var htmlObj = parseDom(htmlStr);
                var listNode = htmlObj.querySelector(self.list);
                if (listNode) {
                    self.container.appendChild(listNode);
                    self.button.innerHTML = '点击查看更多';
                }
                else {
                    self.isEnd = true;
                    self.button.innerHTML = '已经加载完毕';
                    self.button.removeAttribute('on');
                }
            }
            else {
                self.button.innerHTML = '加载失败';
            }
            self.isLoading = false;
        });
    }

    /**
     * [parseDom 字符串转DOM对象]
     *
     * @param {string} nodelist   html字符串
     * @return {Object}   DOM对象
     */
    function parseDom(nodelist) {
        var objE = document.createElement('html');
        objE.innerHTML = nodelist;
        return objE;
    }


    /**
     * [getUrl 获取最后拼接好的数据请求 url]
     *
     * @param  {string}  dataSrc    原始 url
     * @param  {string}  pageName 翻页字段名
     * @param  {integer} page     页码
     * @return {string}         拼接好的 url
     */
    function getUrl(dataSrc, pageName, page) {
        if (!dataSrc) {
            console.error('dataSrc 属性不能为空');
            return;
        }
        if (!pageName || !page) {
            return;
        }
        var url = dataSrc;
        if (dataSrc.indexOf('?') > 0) {
            url += dataSrc[dataSrc.length - 1] === '?' ? '' : '&';
            url += pageName + '=' + page;
        }
        else {
            url += '?' + pageName + '=' + page;
        }

        return url;
    }

    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = this.element;

        var dataSrc = element.getAttribute('dataSrc') || '';
        self.page = element.getAttribute('page') || 1;
        self.btn = element.getAttribute('btn') || '#more-btn';
        self.list = element.getAttribute('list') || '#more-list';

        self.pageName = element.getAttribute('pageName') || 'page';
        self.jsonpcallback = element.getAttribute('jsonpcallback') || 'jsonpcallback';
        self.timeout = element.getAttribute('timeout') || 5000;
        self.respDataName = element.getAttribute('respDataName') || 'html';

        self.container = element.querySelector(self.list);

        if (element.hasAttribute('hasMore')) {
            self.addEventAction('more', function () {
                pushResult.call(self, dataSrc);
            });
        }

        var scrollPage = element.getAttribute('scrollPage') || -1;
        var bufferHeightPx = element.getAttribute('bufferHeightPx') || 10;
        if (scrollPage >= 0) {
            var winHeight = viewport.getHeight();
            viewport.on('scroll', function () {
                var scrollTop = viewport.getScrollTop();
                var diff = viewport.getScrollHeight() - winHeight - scrollTop - bufferHeightPx;
                if (diff <= 0 && (scrollPage === 0 || self.page <= scrollPage)) {
                    pushResult.call(self, dataSrc);
                }
            });
        }
    };

    return customElement;
});
