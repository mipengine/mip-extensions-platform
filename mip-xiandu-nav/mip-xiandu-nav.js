/**
 * @file mip-xiandu-nav 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var jsurl = '';
        var ele = this.element;
        jsurl = ele.getAttribute('jsurl');
        var script = document.createElement('script');
        // 创建一个script 标签
        script.src = jsurl + '/nav.js?t=' + (new Date()).valueOf();
        // 把script的src设置为我们请求数据的地址并传递参数 和回调函数
        document.body.appendChild(script);
        // 把script 插入到body里面
    };
    return customElement;
});
