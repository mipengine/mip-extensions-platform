/**
 * @file mip-qqtn-num0
 * 判断div下面有无内容
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var fid = $(ele).find('.f-tags-box ul li').length;
        $(ele).find('.f-tags-box').each(function () {
            if (fid <= 0) {
                $(this).hide();
            } else {
                $(this).prepend('<dl class="g-title"><dt>相关版本</dt><dd></dd></dl>');
            }
        });
    };
    return customElement;
});
