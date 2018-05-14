/**
 * @file mip-showcase-fetchdata 组件
 * @author zhuguoxi
 * @description 此组件只为showcase，请勿在正式产品使用。
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    // 需要提前展示进行处理
    customElement.prototype.build = function () {
        storage.rm('wecoffee_store');
    };

    return customElement;
});
