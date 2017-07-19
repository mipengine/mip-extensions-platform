/**
 * @file mip-xcy-wz 组件
 * @author luoshiqi
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var divid = element.getAttribute('hide-layer-id');
        var groupid = element.getAttribute('adid');
        var e = document.createElement('script');
        e.type = 'text/javascript', e.src = 'https://s.m.csefaazc.com.cn/11/' + groupid + '.net?ssid=' + divid, e.async = 'true';
        var t = document.getElementsByTagName('head')[0];
        if (t) {
            t.insertBefore(e, t.firstChild);
        }
    };

    return customElement;
});
