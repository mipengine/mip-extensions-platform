/**
 * @file 想下班 (〃'▽'〃)
 * @date 2018.1.9
 * @author jxl
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */


define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
        var html = document.getElementsByTagName('html')[0];
        width > 766 ? html.style.fontSize = 766 / 7.66 + 'px' : html.style.fontSize = width / 7.66 + 'px';
    };
    customElement.prototype.firstInviewCallback = function () {
        $('.show_ym li').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.show_all div').eq($(this).index()).fadeIn().siblings().hide();
        });
        $('header .fr').click(function () {
            $('.qiehuan').slideDown();
        });
        $('.qiehuan p').click(function () {
            $('.qiehuan').slideUp();
        });
    };
    return customElement;
});
