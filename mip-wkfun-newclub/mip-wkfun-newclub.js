/**
* 寻医问药mip改造 功能组件
* @file 脚本支持
* @author yaoyar6@gmail.com
* @time 2017.04.01
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var viewport = require('viewport');
    var customElem = require('customElement').create();
    var newclubFunction = function () {
        var sHeight = $('.chat-top-search').height();

        viewport.on('scroll', function () {
            var scrollTop =  viewport.getScrollTop();
            if (scrollTop < sHeight) {
                $('.chat-top').css('margin-top', -scrollTop);
            } else if (scrollTop === 0) {
                $('.chat-top').css('margin-top', 0);
            } else {
                $('.chat-top').css('margin-top', -sHeight);
            }
        });

        // 顶部搜搜索
        $('.item-hd-so-input-box').on('click', function () {
            $('.item-hd-so-area').addClass('item-hd-so-focus');
        });
        $('.item-hd-so-back').on('click', function () {
            $('.item-hd-so-area').removeClass('item-hd-so-focus');
        });

    };

    customElem.prototype.build = function () {
        newclubFunction();
    };
    return customElem;
});
