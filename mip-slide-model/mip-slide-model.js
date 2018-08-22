/**
 * @file 模态框点击下滑上拉插件
 * @author weiling(1084072318@qq.com)
 * @version 1.0.0
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element = this.element;
        $(element).find('.shortcut').click(function () {
            $(element).find('.mask-tm').show().click(function () {
                $(element).find('.mask-tm').hide();
                $(element).find('.shortcut').slideUp(200);
            });
            $(element).find('.shortcut').slideDown(200);
        });
    };
    return customElement;
});