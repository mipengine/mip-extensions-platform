/**
* @file CNZZ统计插件
* @exports modulename
* @author yang/
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/


define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * cnzz统计，只会运行一次
     */
    customElement.prototype.build = function () {
            var dom = document.getElementById('mip-5hcnzz');
            var cnzzHtml = 'https://s13.cnzz.com/z_stat.php?id=1265726224&web_id=1265726224';
            if (dom !== null) {
                var sc = document.createElement('script');
                sc.setAttribute('type', 'text/javascript');
                sc.setAttribute('src', cnzzHtml);
                dom.appendChild(sc);
            }
        };
    return customElement;
});
