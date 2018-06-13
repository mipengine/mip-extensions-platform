/**
 * @file mip-yesky-bdad 引入百度广告组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var e = this.element;
        e.innerHTML = '<a style="display:none!important"></a>';
        var d = document.createElement('script');
        d.type = 'text/javascript';
        d.charset = 'utf-8';
        d.async = true;
	// 百度广告组件说明:引入百度广告，为网站引流，服务提供商
        d.src = 'http://milk.yesky.com.cn/on3a1ecf94f7ceff30db137987a2f679f650f1d61d75e13eef51322a.js';
        var h = document.getElementsByTagName('head')[0];
        if (h) {
            h.insertBefore(d, h.firstChild);
        }
    };
    return customElement;
});
