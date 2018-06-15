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
        $(ele).find('#f-number li').each(function () {
            var lengli = $(this).index() + 1;
            $(this).find('li b').append(lengli);
        });
    };
    return customElement;
});
