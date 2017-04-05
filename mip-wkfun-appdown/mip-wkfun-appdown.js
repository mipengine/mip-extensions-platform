/**
* 寻医问药下载提示条
* @file 脚本支持
* @author 1220849060@qq.com
* @time 2017.4.5
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var appdownFun = function () {
        // 下载条是否显示
        if (sessionStorage.flags !== '0') {
            $('.AppBar').show();
        }
        $('.AppBar_close').on('click', function () {
            $('.AppBar').hide();
            sessionStorage.flags = '0';
        });
    };
    customElem.prototype.build = function () {
        appdownFun();
    };
    return customElem;
});
