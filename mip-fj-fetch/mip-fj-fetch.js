/**
 * @file mip-fj-fetch 组件
 * @author Jason FJ
 */

define(function (require) {

    var customElement = require('customElement').create();

    var fetchFunc = require('./mip-fj-fetch-fn');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        // 绑定触发fetch的事件
        fetchFunc.addEventFetch(this);

    };

    return customElement;
});
