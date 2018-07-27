/**
 * @file mip-ck-cnzz 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    // 主功能方法
    function doMain(element) {
        // 相关配置
        var token = element.getAttribute('token') || '1274191321';
        var domain = element.getAttribute('domain') || 's19.cnzz.com';
        // 动态判断添加协议头
        var cnzzProtocol = ('https:' === document.location.protocol) ? 'https://' : 'http://';

        var src =  [cnzzProtocol, domain, '/z_stat.php?id=', token].join('');

        // 创建统计脚本
        var sc = document.createElement('script');
        sc.setAttribute('type', 'text/javascript');
        sc.setAttribute('src', src);
        element.appendChild(sc);

        // 使用 window._czc 原因: 只有声明了全局_czc对象，cnzz平台提供的事件跟踪,相关API代码才能正常执行。文档链接：http://open.cnzz.com/a/new/define/
        window._czc = window._czc || [];
        window._czc.push(['_setAccount', token]);
    }

    /**
     * cnzz统计，只会运行一次
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        doMain(element);
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
    };

    return customElement;
});
