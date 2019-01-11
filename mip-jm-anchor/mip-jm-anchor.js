/**
 * @file mip-jm-anchor 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    // zepto一些方法不支持，比如is,animate等，所以使用jquery;
    var customElement = require('customElement').create();
    // 锚点链接跳转tab隐藏显示
    $('.other-show').click(function () {
        $('.brands-intro').show();
        $('.coOperate').show();
        $('.liucheng').show();
        $('.future').hide();
    });
    $('.info-show').click(function () {
        $('.pro-news').show();
        $('.brands-intro').hide();
        $('.coOperate').hide();
        $('.liucheng').hide();
        $('.future').hide();
    });
    $('.pro-show').click(function () {
        $('.pro-news').hide();
        $('.brands-intro').hide();
        $('.coOperate').hide();
        $('.liucheng').hide();
        $('.future').show();
    });

    // 导航滑动状态改变
    $('.banner_tab_wrapper ul li a').on('click', function () {
        $(this).addClass('cur');
        $(this).parent('li').siblings().find('a').removeClass('cur');
    });

    // navTo锚点链接定位
    $('.navItems').click(function () {
        var navto = $(this).attr('navto');
        if (navto !== '#') {
            var $div = $('#' + navto);
            var top = $div.offset().top || 0;
            $('html,body').animate({
                'scroll-top': top - 240
            }, 500);
        }
        else {
            $('html,body').animate({
                'scroll-top': 0
            }, 500);
        }
    });
    customElement.prototype.firstInviewCallback = function () {
        // TODO
    };

    return customElement;
});
