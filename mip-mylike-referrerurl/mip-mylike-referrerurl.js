/**
 * @file mip-mylike-referrerurl 组件
 * @author 55555
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    // build说明: 统计来源功能，需首屏获取相关信息。
    customElement.prototype.build = function () {
        var element = this.element;
        var expiryTime = element.getAttribute('time') || 86400000;
        var expiry = storage.get('expiry');
        var date = new Date().getTime();
        if (!expiry || date > expiry) {
            var refurl = document.referrer;
            storage.set('expiry', date + parseInt(expiryTime, 10));
            storage.set('firstEnterUrl', document.URL);
            storage.set('referrerUrl', refurl);
        }
        storage.set('enterUrl', document.URL);
    };
    return customElement;
});
