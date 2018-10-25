/**
 * @file mip-html-goup
 * 判断栏目ID属于软件或游戏添加class
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        $(ele).find('.g-nav-full').click(function () {
            history.back(-1);
        });
    };
    return customElement;
});
