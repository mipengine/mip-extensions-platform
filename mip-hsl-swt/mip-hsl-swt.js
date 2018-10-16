/**
 * @file mip-hsl-swt 组件
 * @author 韩森林
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var e = this.element;
        var s = e.getAttribute('hslid');
        var d = document.createElement('script');
		// 忠仕网站商务通在线客服系统，方便统计访客点击咨询来源以及数据
        d.src = 'https://ddt.zoosnet.net/JS/LsJS.aspx?siteid=' + s + '&float=1&lng=cn';
        d.language = 'javascript';
        e.appendChild(d);
    };
    return customElement;
});