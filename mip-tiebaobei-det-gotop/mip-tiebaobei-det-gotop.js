/**
 * @file mip-tiebaobei-det-gotop 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $ = require('zepto');
        var ele = $(this.element);
        ele.find('.fix-gotop').on('click', function () {
            // 返回顶部
            document.documentElement.scrollTop = document.body.scrollTop = 0;
            ele.find('.fix-btn').removeClass('showFixBtn');
            return false;
        });
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var windowHeight = $(this).height();
            if (scrollTop > windowHeight) {
                ele.find('.fix-btn').addClass('showFixBtn');
            }
            else {
                ele.find('.fix-btn').removeClass('showFixBtn');
            }
        });
    };
    return customElement;
});
