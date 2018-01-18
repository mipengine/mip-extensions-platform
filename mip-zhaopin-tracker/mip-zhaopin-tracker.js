/**
 * @file mip-zhaopin-tracker 组件
 * @author shawn
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
		// jssdk  统计需要挂载在window上
        var a = window;
        var e = document;
        var f = 'script';
        var g = document.location.protocol + '//statistic.zhaopin.cn/sdk/zhaopin_tracker.js';
        var b = 'za';
        var c;
        var d;
        a.ZhaoPinBigdataAnalyticsObject = b;
        a[b] = a[b] || function () {
                    (a[b].q = a[b].q || []).push(arguments);
                };
        a[b].l = 1 * new Date;
        a._ATAD_GIB_NIPOAHZ_ || (c = e.createElement(f), d = e.getElementsByTagName(f)[0],
                c.async = 1, c.src = g, d.parentNode.insertBefore(c, d), a._ATAD_GIB_NIPOAHZ_ = !0);
        window.za('creat', 'A24');
    };
    return customElement;
});