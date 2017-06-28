/**
 * @file 添加cnzz统计
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var src = $(element).attr('data-host') + $(element).attr('data-query');
        var s = document.createElement('script');
        s.src = src;
        s.style.display = 'none';
        s.language = 'JavaScript';
        element.appendChild(s);
    };
    return customElem;
});
