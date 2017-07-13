/**
* fixed nav
* @file fixed nav component
* @author 873920193@qq.com
* @version 1.0
* @copyright 2016 onlinedown.net, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    function init() {
        $('.tabs-nav-top .item-nav').click(function () {
            var selector = $(this).attr('data-toggle');
            var $active = $(this).parents('.tabs-nav-top').find('.active');
            $active.removeClass('active');
            $(this).addClass('active');
            $(this).parents('.tabs').find('.tabs-contents').find('.tab-content').removeClass('active');
            $('#item-' + selector).addClass('active');
        });
    }
    customElem.prototype.build = function () {
        init();
    };
    return customElem;
});
