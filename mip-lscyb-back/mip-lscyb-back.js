/**
 * @file mip-lscyb-back 绿色下载返回上一页组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        ele.addEventListener('click', function () {
            history.go(-1);
        }, false);
    };

    return customElement;
});
