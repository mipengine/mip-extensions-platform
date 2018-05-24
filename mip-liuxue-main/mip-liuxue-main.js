/**
 * @file
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
        $('header').find('.bd').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.wsxx').eq($(this).index()).fadeIn().siblings().hide();
        });
        $('header').find('.fr').on('click', function () {
            $('.qiehuan').show();
        });
        $('.shouqi').on('click', function () {
            $('.qiehuan').hide();
        });
    };
    return customElement;
});
