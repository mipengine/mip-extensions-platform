/**
 * @file mip-html-count
 * 获取ul下面li的个数然后赋值
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var mentext = window.location.href;
        var lengli = $(ele).find('.g-morebox ul li').length;
        $('.g-morebox p i').html(lengli);
    };
    return customElement;
});
