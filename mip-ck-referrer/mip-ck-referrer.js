/**
 * @file mip-ck-referrer 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $body = document.querySelector('body'); // 业务需求操作body元素的class

    // 简单解析url
    function parseUrl(url) {
        var resObj = {
            protocol: /([^\/]+:)\/\/(.*)/i,
            host: /(^[^\:\/]+)((?:\/|:|$)?.*)/,
            port: /\:?([^\/]*)(\/?.*)/,
            pathname: /([^\?#]+)(\??[^#]*)(#?.*)/
        };
        var tmp;
        var res = {};
        res.href = url;

        if (url.length <= 0) {
            res.host = '';
            res.pathname = '';
            res.search = '';
            res.hash = '';
            return res;
        }

        for (var p in resObj) {
            if (!resObj.hasOwnProperty(p)) {
                return res;
            }

            tmp = resObj[p].exec(url);
            res[p] = tmp[1];
            url = tmp[2];
            if (url === '') {
                url = '/';
            }
            if (p === 'pathname') {
                res.pathname = tmp[1];
                res.search = tmp[2];
                res.hash = tmp[3];
            }
        }

        return res;
    }

    var isSogousearch = (function (ua) {
        return ua.indexOf('sogousearch') > -1;
    })(window.navigator.userAgent.toLowerCase() || '');

    // 主功能方法
    function setHtmlDomain(elem, data) {

        var elemDomainType = elem.getAttribute('referrer') || '';
        var domainsType = elemDomainType.split(',') || [];
        var len = domainsType.length;
        var i = 0;
        var domainType = '';
        var converse = elem.getAttribute('converse');
        var domainClass = domainsType.join('__').replace(/\./g, '-').replace(/\s?/g, '');
        var converseClass = '';
        var isSogouReferrer;

        if (converse !== null) {
            converseClass = '-' + 'converse';
        }

        for (i; i < len; i++) {
            domainType = domainsType[i].trim();

            var flag = false;

            // 判断元素是否domain取反
            if (converse === null) {
                if (domainType === data) { // 判断domain
                    flag = true;
                    break;
                }
            }
            else {
                if (domainType === data) {
                    flag = false;
                    break;
                }
                else {
                    flag = true;
                }
            }
        }

        if ((elemDomainType.indexOf('sogou.com') > -1 && data.indexOf('sogou.com') > -1) || isSogousearch) {
            flag = true;
            isSogouReferrer = true;
        }


        if (flag) {
            // 真 显示元素
            elem.classList.add('mip-ck-referrer--show');
            $body.classList.add('view-mip-ck-referrer-' + domainClass + converseClass); // 向body添加特定的class,目的是为了以后可以方便地的通过选择器来控制页面元素的相关展示

            if (isSogouReferrer) {
                $body.classList.add('view-mip-ck-referrer--sogou');
            }
        }
        else {
            // 假 移除元素
            elem.parentNode.removeChild(elem);
        }
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
    };

    /**
     * 展示逻辑内容在首屏展示，需要尽快加载
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        var referrer = document.referrer;
        setHtmlDomain(element, parseUrl(referrer).host);
    };
    return customElement;
});
