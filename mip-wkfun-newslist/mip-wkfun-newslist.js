/**
* 底层页功能组件
* @file 脚本支持
* @author wss
* @time 2017.06.20
* @version 1.0.2
*/
define(function (require) {
    var $ = require('zepto');
    var viewport = require('viewport');
    var customElem = require('customElement').create();
    var chatFunction = function () {
        var sHeight = $('.item-hd-so').height();

        viewport.on('scroll', function () {
            var scrollTop =  viewport.getScrollTop();
            if (scrollTop < sHeight) {
                $('.item-hd-so-box').css('margin-top', -scrollTop);
            }
            else if (scrollTop === 0) {
                $('.item-hd-so-box').css('margin-top', 0);
            }
            else {
                $('.item-hd-so-box').css('margin-top', -sHeight);
            }
        });
        // 展开全文
        $('.sy-more').on('click', function () {
            $('.sy-main').removeClass('h500');
            $(this).hide();
        });
    };

    customElem.prototype.build = function () {
        chatFunction();
    };
    return customElem;
});
