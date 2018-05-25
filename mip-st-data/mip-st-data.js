/**
 * @file mip-st-data 组件
 * @author
 */
/* eslint-disable */
define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('url');
        var orderid = getQueryString('orderid');

        var html = '<mip-data src="' + url + '?order_id=' + orderid + '"></mip-data>';
        element.innerHTML = html;
    };

    return customElement;
});
