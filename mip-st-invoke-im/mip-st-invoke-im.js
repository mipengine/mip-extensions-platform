/**
 *
 * @file mip-st-invoke-im 组件
 *
 * @author liyinan
 */
/* global cambrian */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

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

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var appid = getQuery().id;
        // 加载熊掌号sdk
        var script = document.createElement('script');
        script.onload = function () {
            cambrian.isBox({
                success: function (res) {
                    if (res.result) {
                        element.style.display = '';
                    }
                }
            });
        };
        script.src = 'https://xiongzhang.baidu.com/sdk/c.js?appid=' + appid + '&timestamp=' + (+new Date());
        document.body.appendChild(script);

        var button = element.querySelector('button');

        button.addEventListener('click', function () {
            cambrian.invokeIM({});
        }, false);
    };

    return customElement;
});
