/**
 * @file mip-qqtn-num0
 * 判断栏目ID属于软件或游戏添加class
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var fid = $(ele).find('.f-rootid').attr('data-rootid');
        $(ele).find('.g-nav-full').each(function () {
            if (fid === '16' || fid === '19') {
                $('.g-nav-full a').eq(2).addClass('m-hover');
            } else {
                $('.g-nav-full a').eq(1).addClass('m-hover');
            }
        });
    };
    return customElement;
});
