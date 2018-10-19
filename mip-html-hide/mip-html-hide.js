/**
 * @file mip-qqtn-num0
 * 判断无内容隐藏
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var fli = $(ele).find('.g-down-information p a').length;
        $(ele).find('.g-down-information').each(function () {
            if (fli <= 0) {
                $('.g-down-information p').hide();
            }
        });
    };
    return customElement;
});
