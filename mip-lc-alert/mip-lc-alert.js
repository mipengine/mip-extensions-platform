/**
 * @file mip-lc-alert 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var alertElement = $(element).find('#btnId');
        alertElement.on('click', function () {
            var text = alertElement.attr('alert-text') || ' 默认 alert 内容 ';
            alert(text);
        });
    };

    return customElement;
});
