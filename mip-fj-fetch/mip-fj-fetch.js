/**
 * @file mip-fj-fetch 组件
 * @author Jason FJ
 */

define(function (require) {

    var customElement = require('customElement').create();

    var fetchFunc = require('./mip-fj-fetch-fn');

    /**
     * build说明：
     *  由于这是一个用于异步获取数据的组件，经常会放在首屏以外的位置，
     *  而且确实需要在首屏就尽快加载，以免出现操作时没反应的现象。
     */
    customElement.prototype.build = function () {

        // 绑定触发fetch的事件
        fetchFunc.addEventFetch(this);

    };

    return customElement;
});
