/**
 * @file 东方财富行情自有业务组件
 * @author www.eastmoney.com技术部
 */
define(function (require) {
    var customElem = require('customElement').create();
    var num = require('./em-hqnum');
    var common = require('./em-hqcommon');
    var pageevent = require('./em-hqevent');
    var $ = require('zepto');

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var scode = common.getQueryString('code') || '300059';
        var smkt = common.getMkt(scode);
        var stockcode = scode + smkt;
        num.intital(stockcode);
        pageevent.intital(stockcode);
    };
    return customElem;
});
