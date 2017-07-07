/**
* @file CNZZ统计
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0.3
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
            var dom = document.getElementById('mip-cr173-cnzz');
            var sc = document.createElement('script');
            sc.setAttribute('type', 'text/javascript');
            sc.setAttribute('src', 'https://s95.cnzz.com/z_stat.php?id=3608757&web_id=3608757');
            dom.appendChild(sc);
        };
    return customElement;
});
