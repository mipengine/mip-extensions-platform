/**
* 星座屋mip改造
* @file 星座屋rem组件
* @author mipxzw@163.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var html = $('html');
        var hW = html.outerWidth() > 640 ? 640 : html.outerWidth();
        var rem = hW / 10;
        html.css('fontSize', rem);
    };
    return customElem;
});
