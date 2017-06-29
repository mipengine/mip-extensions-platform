/**
 * @file 倒计时功能
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var change = $(element).attr('data-change');
        var content = $(element).attr('data-content');
        var flag = false;
        $(element).find('.' + change).click(function () {
            if (flag) {
                $('.' + content).hide();
            } else {
                $('.' + content).removeClass('hide').show();
            }
        });
        $('.' + content).find('.close-btn').click(function () {
            $('.' + content).hide();
        });
    };
    return customElem;
});
