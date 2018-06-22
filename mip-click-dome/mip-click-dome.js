/**
 * @file mip-click-dome
 * 选项卡效果
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        $(ele).find('.g-dome-title li').eq(0).addClass('m-hover');
        $(ele).find('.g-dome .g-dome-list').eq(0).addClass('m-hover');
        $(ele).find('.g-dome-title li').click(function () {
            $(this).addClass('m-hover').siblings().removeClass('m-hover');
            var contul = $(ele).find('.g-dome-title li').index(this);
            $(ele).find('.g-dome-list').eq(contul).addClass('m-hover').siblings().removeClass('m-hover');
        });
    };
    return customElement;
});
