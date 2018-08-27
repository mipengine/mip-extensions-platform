/**
 * @file mip-lscyb-cnzz 绿色下载cnzz统计组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * cnzz统计，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var e = this.element;
        var token = e.getAttribute('token');
        var id = e.getAttribute('id');
        var cnzzHtml = 'https://s12.cnzz.com/stat.php?id=' + id + '&web_id=' + token;
        if (e !== null) {
            var sc = document.createElement('script');
            sc.setAttribute('type', 'text/javascript');
            sc.setAttribute('src', cnzzHtml);
            e.appendChild(sc);
        }
    };

    return customElement;
});
