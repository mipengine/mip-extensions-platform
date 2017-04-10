/**
* 寻医问药mip改造 功能组件
* @file 脚本支持
* @author yaoyar6@gmail.com
* @time 2017.04.10
* @version 1.0.2
*/
define(function (require) {
    var $ = require('zepto');
    var viewport = require('viewport');
    var customElem = require('customElement').create();
    var newclubFunction = function (ans) {
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

        if ($('.computedLine').length) {
            $.each($('.computedLine'), function (i) {
                if ($(this).height() < ans) {
                    $(this).closest('.chat-con-box').find('.moreCon').hide();
                }
            });

            $('.moreCon').click(function () {
                $(this).closest('.chat-con-box').find('.computedLine').removeClass('computedLine');
                $(this).hide();
            });
        }

    };

    customElem.prototype.build = function () {
        var elem = this.element;
        if ($(elem).attr('ans')) {
            var elStr = parseInt($(elem).attr('ans'), 10);
            newclubFunction(elStr);
        } else {
            newclubFunction();
        }
    };
    return customElem;
});
