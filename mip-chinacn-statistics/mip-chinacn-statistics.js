/**
 * @file mip-chinacn-statistics 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var data = {};
        // 页面地址
        data.url = location.href;
        // 来源
        data.referrer = document.referrer;
        // ua
        data.userAgent = navigator.userAgent;
        // 页面类型
        var page = this.element.getAttribute('page');
        // 请求
        fetch('https://api.china.cn/dms/s.php?', {
            method: 'POST',
            body: 'type=mip&page=' + page + '&str=' + JSON.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };

    return customElement;
});
