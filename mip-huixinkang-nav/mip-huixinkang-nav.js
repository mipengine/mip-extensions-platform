



/**
* 世界之最mip改造 javascript功能插件
* @file 头部导航js展示
* @date 2016.12.12
* @author dinglei (375234944@qq.com)
* @version 1.0.1
*/

define(function (require) {

    var $ = require('zepto');
    var customElem = require('customElement').create();

    function open() {
        var w = $(window).width();
        var nav = $('nav');
        nav.find('ul').css({width: w});
        var navUl = nav.find('ul');
        nav.on('touchend', function (e) {
            var off = nav.attr('off');
            e.stopPropagation();
            if (!navUl.hasClass('origin')) {
                $('nav').attr('off', '0');
                navUl.addClass('origin');
            } else {
                $('nav').attr('off', '1');
                navUl.removeClass('origin');
            }
        });
    }

    function init() {
        open();
    }

    customElem.prototype.firstInviewCallback = init;

    return customElem;
});
