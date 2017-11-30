/**
 * @file mip-jia-tbs 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $ele = $(this.element);
        var stick = $ele.attr('data-stick');
        var navOffsetTop = $ele.find('mip-semi-fixed');

        $ele.find('.tab-head li').click(function () {
            var index = $(this).index();
            if (!$(this).hasClass('cur')) {
                $(this).addClass('cur').siblings().removeClass('cur');
                var movedis = -(index * 100);
                $ele.find('.item-box').eq(index).removeClass('hide').siblings().addClass('hide');
                $ele.find('.tab-wrapper').css({
                    '-webkit-transform': 'translateX(' + movedis + '%)',
                    '-ms-transform': 'translateX(' + movedis + '%)',
                    'transform': 'translateX(' + movedis + '%)'
                });

                // 是否置顶
                if (navOffsetTop.length && stick) {
                    $(window).scrollTop(navOffsetTop.offset().top);
                }
            }

            // 手动触发滚动，显示图片
            if (!$(this).hasClass('init')) {
                $(this).addClass('init');
                var top = $(window).scrollTop();
                setTimeout(function () {
                    $(window).scrollTop(top + 1);
                    $(window).scrollTop(top);
                }, 300);
            }
        });
    };

    return customElement;
});
