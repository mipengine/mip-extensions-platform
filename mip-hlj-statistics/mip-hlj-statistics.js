/**
 * @file mip-hlj-statistics 组件
 * @author kong_kong@hunliji.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var id = element.dataset.id;

        var h = document.createElement('script');
        h.type = 'text/javascript';
        h.async = true;
        // 谷歌统计链接，计算页面的访问量。使用谷歌的原因是，目前百度统计的结果不准确
        h.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(h, s);
        setTimeout(function () {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', id);
        }, 300);
    };

    return customElement;
});
