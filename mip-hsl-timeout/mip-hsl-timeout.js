/**
 * @file mip-hsl-timeout 定时显示某个DIV组件，可自定义显示时间
 * @author 韩森林
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var e = this.element;
        var s = e.getAttribute('hslspeed');
        var hslshowfun = function () {
            $('#hslshow').show();
        };
        $('#hslclose').click(function () {
            $('#hslshow').hide();
        });
        setTimeout('hslshowfun()', s);
    };
    return customElement;
});