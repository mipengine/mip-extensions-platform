/**
 * @file mip-qqtn-num0
 * 判断假如没有li则将外层隐藏
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    function nonum() {
        $('.f-num').each(function () {
            var fnum = $(this).find('li').length;
            if (fnum < 1) {
                $(this).hide();
            }
        });
    }
    customElement.prototype.build = function () {
        nonum();
    };
    return customElement;
});
