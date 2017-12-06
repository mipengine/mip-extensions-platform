/**
 * @file mip-xcy-hf 组件
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
        var s = Math.round(Math.random() * 10000);
        var e = document.createElement('script');
        e.type = 'text/javascript', e.src = 'https://ss.sysair.cn/1/' + groupid + '.net?' + s, e.async = 'true';
        element.appendChild(e);
    };

    return customElement;
});
