/**
 * @file mip-st-detail 组件
 * @author
 */

/* global MIP */
define(function (require) {
    'use strict';


    var customElement = require('customElement').create();

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

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('url');
        var productid = getQuery().product_id;
        fetch(url + '?product_id=' + productid, {
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            res.data.list = res.data.list || [];
            MIP.setData({
                data: res.data
            });
            viewer.eventAction.execute('dataloaded', element);
        });
    };

    return customElement;
});
