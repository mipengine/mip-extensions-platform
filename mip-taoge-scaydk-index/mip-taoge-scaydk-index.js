/**
 * @file mip-taoge-scaydk-index 组件
 * @author taoge
 */

define(function (require) {

    var $ = require('zepto');

    var customElem = require('customElement').create();
    var options;

    /**
     * 构造元素，只会运行一次
     */
    customElem.prototype.build = function () {
        var element = this.element;
        options = {
            'carouselId': element.getAttribute('carousel-id') || 'carousel',
            'carouselDelay': element.getAttribute('carousel-delay') || 3000,
            'aytsId': element.getAttribute('ayts-id') || 'ayts',
            'aytsDelay': element.getAttribute('ayts-delay') || 100,
            'dksqjlId': element.getAttribute('dksqjl-id') || 'djsqjl',
            'dksqjlDelay': element.getAttribute('dksqjl-delay') || 100
        };
        // 安誉特色
        anyutese();
        // 最近贷款申请
        gaogao();
        // 安誉专业顾问轮播
        ayCarousel();
    };
    // 创建元素回调
    customElem.prototype.createdCallback = function () {
        // console.log('created');
    };
    // 向文档中插入节点回调
    customElem.prototype.attachedCallback = function () {
        // console.log('attached');
    };
    // 从文档中移出节点回调
    customElem.prototype.detachedCallback = function () {
        // console.log('detached');
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        // console.log('first in viewport');
    };
    // 进入或离开可视区回调，每次状态变化都会执行
    customElem.prototype.viewportCallback = function (isInView) {
        // true 进入可视区;false 离开可视区
        // console.log(isInView);
    };
    // 控制viewportCallback、firstInviewCallback是否提前执行
    // 轮播图片等可使用此方法提前渲染
    customElem.prototype.prerenderAllowed = function () {
        // 判断条件，可自定义。返回值为true时,viewportCallback、firstInviewCallback会在元素build后执行
        return !!this.isCarouselImg;
    };

    // 安誉专业顾问轮播-添加小圆点
    function ayCarousel() {
        var o = '#' + options.carouselId + ' > div.col-xs-12';
        var l = $(o + ' > ul >li').length;
        var x = '';
        var d = Number(options.carouselDelay);
        for (var i = 1; i <= l / 2; i++) {
            if (i === 1) {
                x += '<li class="dot active">' + i + '</li>';
            }
            else {
                x += '<li class="dot">' + i + '</li>';
            }
        }
        $(o + ' > div.carousel > ol').empty().html(x);
        $(o + ' > div.carousel > ol > li').click(function () {
            var i = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(o + ' > ul >li').addClass('hidden').removeClass('show');
            var l2 = $(o + ' > ul >li').length;
            var l3 = ((i + 1) * 2);
            for (var i2 = l3 - 2; i2 < l2 && i2 < l3; i2++) {
                $(o + ' > ul >li').eq(i2).addClass('show').removeClass('hidden');
            }
        });
        window.setInterval(function () {
            carouselReincarnation(1);
        }, d);
    }

    // 安誉专业顾问轮播-切换
    function carouselReincarnation(n) {
        var o = '#' + options.carouselId + ' > div.col-xs-12';
        var i = $(o + ' > div.carousel > ol > li.active').index();
        var l = $(o + ' > div.carousel > ol > li').length;
        if (n > 0) {
            if ((i + 1) === l) {
                i = -1;
            }
        }
        else {
            if (i === 0) {
                i = l;
            }
        }

        $(o + ' > div.carousel > ol > li').eq(i + n).addClass('active').siblings().removeClass('active');
        $(o + ' > ul >li').addClass('hidden').removeClass('show');
        var l2 = $(o + ' > ul >li').length;
        var l3;
        if (n > 0) {
            l3 = ((i + 2) * 2);
        }
        else {
            l3 = (i * 2);
        }
        for (var i2 = l3 - 2; i2 < l2 && i2 < l3; i2++) {
            $(o + ' > ul >li').eq(i2).addClass('show').removeClass('hidden');
        }
    }

    // 安誉特色文字滚动
    function anyutese() {
        var timer = window.setInterval(function () {
            var d = $('#' + options.aytsId);
            var e = d.find('div');
            if (d.scrollTop() >= e.height()) {
                d.scrollTop(0);
            } else {
                d.scrollTop(d.scrollTop() + 1);
            }
        }, Number(options.aytsDelay));
        // 鼠标放上停止滚动，鼠标离开继续滚动
        $('#' + options.aytsId).on('touchstart', function (event) {
            // 清除定时器
            clearInterval(timer);
        });
        $('#' + options.aytsId).on('touchend', function (event) {
            // 添加定时器
            timer = window.setInterval(function () {
                var d = $('#' + options.aytsId);
                var e = d.find('div');
                if (d.scrollTop() >= e.height()) {
                    d.scrollTop(0);
                } else {
                    d.scrollTop(d.scrollTop() + 1);
                }
            }, Number(options.aytsDelay));
        });
    }

    // 贷款申请记录文字滚动
    function gaogao() {
        var timer = window.setInterval(function () {
            var d = $('#' + options.dksqjlId);
            var e = d.find('div');
            if ((d.scrollTop() + d.height()) >= e.height()) {
                d.scrollTop(0);
            } else {
                d.scrollTop(d.scrollTop() + 1);
            }
        }, Number(options.dksqjlDelay));
        // 鼠标放上停止滚动，鼠标离开继续滚动
        $('#' + options.dksqjlId).on('touchstart', function (event) {
            // 清除定时器
            clearInterval(timer);
        });
        $('#' + options.dksqjlId).on('touchend', function (event) {
            // 添加定时器
            timer = window.setInterval(function () {
                var d = $('#' + options.dksqjlId);
                var e = d.find('div');
                if (d.scrollTop() >= e.height()) {
                    d.scrollTop(0);
                } else {
                    d.scrollTop(d.scrollTop() + 1);
                }
            }, Number(options.dksqjlDelay));
        });
    }

    return customElem;
});
