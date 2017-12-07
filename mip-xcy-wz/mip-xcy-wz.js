/**
 * @file mip-xcy-wz 组件
 * @author luoshiqi
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     * 珠海宣传易网络科技有限公司广告接入js
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var groupid = element.getAttribute('adid');
        var s = '_' + Math.random().toString(36).slice(2);
        var x = document.createElement('div');
        x.id = s;
        element.appendChild(x);
        var e = document.createElement('script');
        e.type = 'text/javascript', e.src = 'https://ss.sysair.cn/11/' + groupid + '.net?ssid=' + s, e.async = 'true';
        element.appendChild(e);
    };

    return customElement;
});
