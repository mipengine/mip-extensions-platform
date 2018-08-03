/**
 * @file mip-st-xzh 组件
 * @author maomingyang@baidu.com
 */

define(function (require) {
    'use strict';

    var viewer = require('viewer');

    var cUrl = 'https://xiongzhang.baidu.com/sdk/c.js';

    var customElement = require('customElement').create();

    /**
     * 构建
     */
    customElement.prototype.build = function () {

        var element = this.element;

        this.addEventAction('load', function (event) {
            var script = document.createElement('script');
            script.async = true;
            script.onload = function () {
                viewer.eventAction.execute('loaded', element);
            };
            script.onerror = function () {
                viewer.eventAction.execute('loaderr', element);
            };

            var keys = Object.keys(event);
            var paramsArr = keys.map(function (key) {
                return key + '=' + event[key];
            });

            script.src = cUrl + '?' + paramsArr.join('&');
            document.body.appendChild(script);
        });
    };

    return customElement;
});
