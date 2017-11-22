/**
 * @file mip-push-bd-caidashi 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO 这是一段百度的主动推送代码。内部虽然有script标签，但是他是一个固定的值。只适合我们公司
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(bp, s);
    };
    return customElement;
});
