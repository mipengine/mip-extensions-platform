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
        $(element).on('click', '.linkmore', function () {
            if (flag) {
                if ($(element).find('.linkmore').html().indexOf('收起') > -1) {
                    $(element).find('.linkmore').html('更多<span class="icon-linkmore on">');
                }
                flag = !flag;
                $('.linkmore').removeClass('on');
                $(element).find('.main_nav_bar').hide();
            } else {
                if ($(element).find('.linkmore').html().indexOf('更多') > -1) {
                    $(element).find('.linkmore').html('收起<span class="icon-linkmore">');
                }
                flag = !flag;
                $('.linkmore').addClass('on');
                $(element).find('.main_nav_bar').removeClass('hide').show();
            }
        });
    };
    return customElem;
});
