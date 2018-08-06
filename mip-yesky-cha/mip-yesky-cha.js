/**
 * @file mip-yesky-cha 组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        // 关闭浮层
        $(element).find('.cha').click(function () {
            $(this).parent().hide();
        });
    };
    return customElement;
});
