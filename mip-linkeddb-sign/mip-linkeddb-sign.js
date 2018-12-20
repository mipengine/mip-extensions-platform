/**
 * @file mip-linkeddb-sign 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        if ($(ele).find('a').attr('href') === 'https://mip.linkeddb.com/sign_in/') {
            if (window.top.location.pathname === 'https://mip.linkeddb.com/sign_in/') {
                $(ele).find('a').attr('href', '###');
            } else {
                $(ele).find('a').attr('href', 'https://mip.linkeddb.com/sign_in/?callUrl=' + window.top.location.pathname);
            }
        }
    };

    return customElement;
});
