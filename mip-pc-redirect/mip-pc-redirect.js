/**
 * @file mip-pc-redirect 实现当使用非移动设备访问时自动跳转到PC页面
 * @author vodjk
 */

define(function (require) {
    var customElem = require('customElement').create();

    /**
     * isMobile 判断是否是移动浏览器
     *
     * @return {boolean}
     */
    function isMobile() {
        return /(Android|iOS|BlackBerry|Mobile|Alipay|MicroMessenger)/i.test(navigator.userAgent);
    }

    /**
     * build 该组件用于检测非移动端浏览器时跳转到PC页面，无需展示DOM，而且应尽快执行跳转
     */
    customElem.prototype.build = function () {
        var url = this.element.getAttribute('url');
        if (url && !isMobile()) {
            window.top.location.href = url;
        }
    };

    return customElem;
});
