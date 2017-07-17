/**
* 寻医问药mip改造 功能组件
* @file 脚本支持
* @author yaoyar6@gmail.com
* @time 2017.07.17
* @version 1.0.1
*/
define(function (require) {
    var $ = require('jquery');
    var viewport = require('viewport');
    var customElem = require('customElement').create();
    var articleFunction = function () {
        var clientHeight = viewport.getHeight();
        $('.article-item').css({
            maxHeight: clientHeight * 1.5
        });

        $('.article-more-btn').click(function () {
            $('.article-item').css({
                height: 'auto',
                maxHeight: '100%'
            }).addClass('showH');
            $(this).hide();
        });

        $('.article-banner-close').click(function () {
            $('.article-banner').remove();
        });

    };

    customElem.prototype.build = function () {
        articleFunction();
    };
    return customElem;
});
