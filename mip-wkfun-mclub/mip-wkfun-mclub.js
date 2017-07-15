/**
* 寻医问药mip改造 功能组件
* @file 脚本支持
* @author yaoyar6@gmail.com
* @time 2017.07.14
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var unfoldFunction = function () {
        if ($('.club-new-more-rebtn').length) {
            $('.club-new-more-rebtn').click(function () {
                $('.club-expert-reply-list li').each(function () {
                    if ($(this).hasClass('none')) {
                        $(this).removeClass('none').addClass('unfolded-li');
                    }
                });
                $(this).hide();
            });
        }


        $('.club-new-spread').click(function () {
            var parent = $(this).closest('.club-expert-reply-conwrap');
            var content = parent.find('.club-expert-reply-box');
            content.removeClass('clamp4');
            parent.css({
                'height': 'auto',
                'maxHeight': '100%'
            });
            $(this).hide();
        });

        $('.club-banner-close').click(function () {
            $('.club-banner').remove();
        });
    };

    customElem.prototype.build = function () {
        unfoldFunction();
    };
    return customElem;
});
