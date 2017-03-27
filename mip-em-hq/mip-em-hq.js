/**
 * @file 东方财富行情自有业务组件
 * @author www.eastmoney.com技术部
 */
define(function (require) {
    var customElem = require('customElement').create();
    var num = require('./em-hqnum');
    var common = require('./em-hqcommon');
    var $ = require('zepto');

    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        var scode = common.getQueryString('code') || '300059';
        var smkt = common.getMkt(scode);
        var stockcode = scode + smkt;
        num.intital(stockcode);
    };
    return customElem;
});
