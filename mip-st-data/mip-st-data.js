/**
 * @file mip-st-data 组件
 * @author
 */
/* eslint-disable */
define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('url');
        var orderid = MIP.hash.get('orderid');

        var html = '<mip-data src="' + url + '?order_id=' + orderid + '"></mip-data>';
        element.innerHTML = html;
    };

    return customElement;
});
