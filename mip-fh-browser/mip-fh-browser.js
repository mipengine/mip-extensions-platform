/**
 * @file mip-fh-browser 组件
 * @author sunxiaopeng
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var device = require('./fh-browser');
    var browser = device.browser;

    function reloadPageOfBrowser(el, browsersType) {
        var len = browsersType.length;
        var i = 0;
        var browserType = '';
        var converse = el.getAttribute('converse');
        // 最好提供一个地址，否则会默认 view页面跳转到hview页面
        var href = resetHref(el.getAttribute('href'));
        var flag = false;
        if (converse !== null) {
            flag = true;
            for (i = 0; i < len; i++) {
                browserType = browsersType[i].toLocaleUpperCase();
                if (browserType === browser) {
                    flag = false;
                    break;
                }
            }
        }
        else {
            for (i = 0; i < len; i++) {
                browserType = browsersType[i].toLocaleUpperCase();
                if (browserType === browser) {
                    flag = true;
                    break;
                }
            }
        }
        if (flag) {
            window.top.location.href = href;
        }
    }

    function resetHref(href) {
        if (href) {
            return href;
        }
        return window.top.location.href.replace('/view/', '/hview/');
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var self = this;

        var browserType = self.element.getAttribute('browser') || '';
        var browsersType = browserType.split(',') || [];

        reloadPageOfBrowser(self.element, browsersType);
    };
    return customElement;
});
