/**
* @file CNZZ统计插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
            var dom = document.getElementById('qqtncnzz');
            var sc = document.createElement('script');
            sc.setAttribute('type', 'text/javascript');
            sc.setAttribute('src', 'https://s12.cnzz.com/z_stat.php?id=5932461&web_id=5932461');
            dom.appendChild(sc);
            var domh = document.getElementById('healthcnzz');
            var sch = document.createElement('script');
            sch.setAttribute('type', 'text/javascript');
            sch.setAttribute('src', 'https://s12.cnzz.com/z_stat.php?id=1257361975&web_id=1257361975');
            domh.appendChild(sch);
        };
    return customElement;
});
