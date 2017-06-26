/**
 * @file 添加233首页点击出现新闻相关列表功能
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var flag = false;
        $(element).find('.more1').click(function () {
            if (flag) {
                $(element).find('.eaxm-box').hide();
            } else {
                $(element).find('.eaxm-box').removeClass('hide').show();
            }
            flag = !flag;
        });
    };
    return customElem;
});
