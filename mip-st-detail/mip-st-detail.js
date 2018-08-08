/**
 * @file mip-st-detail 组件
 * @author
 */

/* global MIP, m */
define(function (require) {
    'use strict';


    var customElement = require('customElement').create();

    var viewer = require('viewer');

    function getQuery(url) {
        url = url || location.href;
        var query = url.split('?')[1] || '';
        query = query.split('#')[0] || '';
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
        var xzhid = getQuery().xzh_id;
        if (productid) {
            url += '?product_id=' + productid;
        }
        else if (xzhid) {
            url += '?xzh_id=' + xzhid;
        }
        if (m.currentTab) {
            url += '&spu_cate=' + m.currentTab;
        }
        fetch(url, {
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            res.data.list = res.data.list || [];
            MIP.setData({
                data: res.data
            });
            var url = location.href;
            if (!/tag=/.test(url)) {
                url = url.replace('?', '?tag=all&');
            }
            history.replaceState('', null, url);
            viewer.eventAction.execute('dataloaded', element, res.data);
        });
    };

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;
});
