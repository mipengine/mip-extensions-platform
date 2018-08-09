/**
 * @file mip-carousel-figure 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var offs = true;

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    function open() {
        $(function () {
            var item = $('.mip-carousel-figure-item');
            for (var i = 0; i < item.length; i++) {
                item[i].style.left = 100 * i + '%';
                var childLens = $(item[i]).find('.mip-carousel-figure-img').length;
                $(item[i]).find('.mip-carousel-figure-img').width((100 - childLens) / childLens + '%');
            }
            var h = Number(item.height());
            $('.mip-carousel-figure-list').height(h + 'px');
            $('.mip-carousel-figure-left').css({'top': (h - 50) / 2 + 'px'});
            $('.mip-carousel-figure-right').css({'top': (h - 50) / 2 + 'px'});
        });
        $('.mip-carousel-figure-right').on('click', function () {
            if (offs) {
                offs = false;
                var item = $('.mip-carousel-figure-item');
                for (var i = 0; i < item.length; i++) {
                    var posLeft = parseInt(item[i].style.left.replace(/'%'/, ''), 10);
                    item.eq(i).animate({'left': posLeft - 100 + '%'},
                        function () {
                            offs = true;
                            for (var i = 0; i < item.length; i++) {
                                var posLeftNew = parseInt(item[i].style.left.replace(/'%'/, ''), 10);
                                if (posLeftNew < 0) {
                                    item.eq(i).css({'left': posLeftNew + 300 + '%'});
                                }
                            }
                        });
                }
            }
        });
        $('.mip-carousel-figure-left').on('click', function () {
            if (offs) {
                offs = false;
                var item = $('.mip-carousel-figure-item');
                for (var i = 0; i < item.length; i++) {
                    var posLeft = parseInt(item[i].style.left.replace(/'%'/, ''), 10);
                    item.eq(i).animate({'left': posLeft + 100 + '%'},
                        function () {
                            offs = true;
                            for (var i = 0; i < item.length; i++) {
                                var posLeftNew = parseInt(item[i].style.left.replace(/'%'/, ''), 10);
                                if (posLeftNew >= 102) {
                                    item.eq(i).css({'left': posLeftNew - 300 + '%'});
                                }
                            }
                        });
                }
            }
        });
    }
    function init() {
        open();
    }
    customElement.prototype.build = init;
    return customElement;
});
