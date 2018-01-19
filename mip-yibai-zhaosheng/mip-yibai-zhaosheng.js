/**
 * @file
 * @date 2018.1.17
 * @author jy
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
        $('.tab-nav li a').click(function () {
            if ($(this).hasClass('active')) {
                return false;
            } else {
                $('.tab-nav li a').removeClass('active');
                $(this).addClass('active');
            };
            $('#moduleWrap ul').hide();
            $('#module' + $(this).attr('flag')).show();
            return false;
        });
        $('.location').click(function () {
            $('.js-location').toggle();
        });
    };
    return customElement;
});
