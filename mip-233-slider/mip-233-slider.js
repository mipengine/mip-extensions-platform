/**
 * @file 头部滑动并显示当前栏目
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var width = ($(element).find('.channel').width() + 5) * ($(element).find('.channel').length);
        var name = location.href.split('/')[location.href.split('/').length - 2];
        var list = $(element).find('.channel');
        var index = 0;
        for (var gg = 0; gg < list.length; gg++) {
            if ($(list[gg]).find('a').attr('href').indexOf(name) > -1) {
                index = gg;
            }
        }
        $(element).find('ul').width(width);
        if (index > 0) {
            $(element).find('.main_nav').scrollLeft(($(element).find('.channel').width() * (index - 1)));
        }
        $(element).find('.channel').eq(index).addClass('curr');
    };
    return customElem;
});
