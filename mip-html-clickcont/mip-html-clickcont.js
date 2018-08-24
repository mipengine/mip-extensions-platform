/**
 * @file mip-qqtn-num0
 * 获取li数量添加数字
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        $(ele).find('.f-btns').click(function () {
            $(ele).find('.g-fix-cont').show();
        });
        $(ele).find('.g-fix-contbg ,.rkclose').click(function () {
            $(ele).find('.g-fix-cont').hide();
        });
    };
    return customElement;
});
