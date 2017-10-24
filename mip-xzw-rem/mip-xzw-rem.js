/**
* 星座屋mip改造
* @file 星座屋rem组件
* @author mipxzw@163.com
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var html = $('html');
        var hW = $(window).width() > 640 ? 640 : $(window).width();
        var rem = hW / 10;
        html.css('fontSize', rem);
    };
    return customElem;
});
