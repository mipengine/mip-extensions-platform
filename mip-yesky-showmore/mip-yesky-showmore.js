/**
 * @file mip-yesky-showmore 组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var i = 1;
        $(element).find('.mbtn').click(function () {
            i++;
            $('.content' + i).show();
            if (i === 4) {
                $(this).hide();
            }
        });
    };
    return customElement;
});
