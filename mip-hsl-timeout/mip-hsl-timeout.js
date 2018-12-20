/**
 * @file mip-hsl-timeout 定时显示某个DIV组件，可自定义显示时间
 * @author 韩森林
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var e = this.element;
        var hslshow = document.getElementById('hslshow');
        var hslclose = document.getElementById('hslclose');
        var hslopen = document.getElementById('hslopen');
        hslshow.style.display = 'none';
        hslclose.onclick = function () {
            hslshow.style.display = 'none';
        };
        hslopen.onclick = function () {
            hslshow.style.display = 'block';
        };
        setTimeout('hslshow.style.display = "block"', 4000);
    };
    return customElement;
});