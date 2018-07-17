/**
 * @file mip-yesky-star 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var wid = $(element).attr('data-wid');
        $(element).find('.star').css({'width': wid});
    };
    return customElement;
});
