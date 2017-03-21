/**
 * @file mip-stats-qiyu 七鱼在线客服组件
 * @author marhey
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var element = this.element;
        var token = element.getAttribute('token');
        var qiyu = document.createElement('script');

        var defer = !!element.hasAttribute('defer');
        var async = !!element.hasAttribute('async');
        if (defer) {
            qiyu.defer = document.createAttribute('defer');
        }
        if (async) {
            qiyu.async = document.createAttribute('async');
        }

        qiyu.src = 'https://qiyukf.com/script/' + token + '.js';
        qiyu.defer = document.createAttribute('defer');
        qiyu.async = document.createAttribute('async');
        $(element).append(qiyu);
    };
    return customElement;
});
