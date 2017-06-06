/**
* 寻医问药mip改造 功能组件
* @file 脚本支持
* @author yaoyar6@gmail.com
* @time 2017.06.06
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var unfoldFunction = function () {
        if ($('.club-more-rebtn').length) {
            $('.club-more-rebtn').click(function () {
                $('.club-expert-reply-list li').each(function () {
                    if ($(this).hasClass('none')) {
                        $(this).removeClass('none').addClass('unfolded-li');
                    }
                });
                $(this).hide();
            });
        }
    };

    customElem.prototype.build = function () {
        unfoldFunction();
    };
    return customElem;
});
