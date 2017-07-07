/**
 * @file 控制客服与广告的显示隐藏
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var num = $(element).attr('data-num') || 2;
        var height = $('body').height();
        $(window).scroll(function () {
            if ($('body').scrollTop() > height * num) {
                $('.mip-appdl-box').removeClass('hide').show();
                $('.jumphelpera').removeClass('hide').show();
            } else {
                $('.mip-appdl-box').addClass('hide').hide();
                $('.jumphelpera').addClass('hide').hide();
            }
        });
    };
    return customElem;
});
