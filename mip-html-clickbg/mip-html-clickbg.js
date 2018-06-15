/**
 * @file mip-qqtn-num0
 * 判断当前页面地址与URL一致附加样式
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var mentext = window.location.href;
        $(ele).find('.g-gxhot-nav li a').each(function () {
            var menturl =  $(this).attr('href');
            if (mentext.indexOf(menturl) !== -1) {
                $(this).addClass('hover');
            }
        });
    };
    return customElement;
});
