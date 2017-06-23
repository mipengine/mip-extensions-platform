/**
 * @file 加载更多插件
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var flag = false;
        // 点击切换下拉列表
        $('.icon-linkmore').click(function () {
            if (flag) {
                flag = !flag;
                $('.linkmore').removeClass('on');
                $(element).find('.main_nav_bar').hide();
            } else {
                flag = !flag;
                $('.linkmore').addClass('on');
                $(element).find('.main_nav_bar').removeClass('hide').show();
            }
        });
    };
    return customElem;
});
