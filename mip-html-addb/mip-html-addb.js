/**
 * @file mip-html-name
 * 在页面li标签指定位置加入标签
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var html = '<b></b>';
        $(ele).find('.g-morebox ul li:nth-child(8n)').after(html);
    };
    return customElement;
});

