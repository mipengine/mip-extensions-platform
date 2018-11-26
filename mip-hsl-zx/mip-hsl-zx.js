/**
 * @file mip-hsl-zx 组件
 * @author 韩森林
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var e = this.element;
        $('.hslswt').click(function () {
            window.top.location.href = 'https://ddt.zoosnet.net/lr/chatpre.aspx?id=ddt79088938';
        });
    };
    return customElement;
});