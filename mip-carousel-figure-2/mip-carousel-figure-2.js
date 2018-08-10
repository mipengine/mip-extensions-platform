/**
 * @file mip-carousel-figure-2 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var offs = true;

    /**
     * 第一次进入可视区回调，只会执行一次
     * @param {Object} element 当前操作对象
     */
    function open(element) {
        $(function () {
            var item = $('.mip-carousel-figure-2-item');
            for (var i = 0; i < item.length; i++) {
                item[i].style.left = 100 * i + '%';
                var childLens = $(item[i]).find('.mip-carousel-figure-2-img').length;
                $(item[i]).find('.mip-carousel-figure-2-img').width((100 - childLens) / childLens + '%');
            }
            var h = Number(item.height());
            $('.mip-carousel-figure-2-list').height(h + 'px');
            $('.mip-carousel-figure-2-left').css({'top': (h - 50) / 2 + 'px'});
            $('.mip-carousel-figure-2-right').css({'top': (h - 50) / 2 + 'px'});
        });

        $('.mip-carousel-figure-2-right').on('click', function () {
            if (offs) {
                offs = false;
                var item = $('.mip-carousel-figure-2-item');
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
        $('.mip-carousel-figure-2-left').on('click', function () {
            if (offs) {
                offs = false;
                var item = $('.mip-carousel-figure-2-item');
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

        var delayTime = $(element).attr('delay-time') ? $(element).attr('delay-time') : 1500;
        setInterval(func, delayTime);

        function func() {
            var item = $('.mip-carousel-figure-2-item');
            for (var i = 0; i < item.length; i++) {
                var posLeft = parseInt(item[i].style.left.replace(/'%'/, ''), 10);
                item.eq(i).animate({'left': posLeft - 100 + '%'},
                function () {
                    offs = true;
                    for (var i = 0; i < item.length; i++) {
                        var posLeftNew = parseInt(item[i].style.left.replace(/'%'/, ''), 10);
                        if (posLeftNew < 0) {
                            item.eq(i).css({'left': posLeftNew + item.length * 100 + '%'});
                        }
                    }
                });
            }
        }
    }

    function init() {
        var element = this.element;
        open(element);
    }
    customElement.prototype.build = init;
    return customElement;
});
