/**
 * @file mip-taoge-scaydk-adviser 组件
 * @author Taoge <liangtao.gz@foamail.com>
 */

define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var options;
    var o;
    var t;
    customElem.prototype.build = function () {
        var element = this.element;
        options = {
            'id': element.getAttribute('element') || 'carousel',
            'delay': element.getAttribute('delay') || 3000,
            'switch': element.getAttribute('switch') || 'on'
        };
        o = '#' + options.id;
        // 一共多少个顾问
        var l = $(o + ' ul > li').length;
        var x = '';
        for (var i = 1; i <= l; i++) {
            if (i === 1) {
                x += '<li class="dot active">1</li>';
            }
            else {
                x += '<li class="dot">1</li>';
            }
        }
        // 初始化小圆点
        $(o + ' div.carousel > ol').empty().html(x);
        // 屏幕宽度
        var w = $(o).width();
        // ul宽度
        var uw = w * l;
        $(o + ' ul').css({'width': uw});
        // li宽度
        var lw = w * 0.76;
        $(o + ' ul > li').css({'width': lw, 'margin': '0 ' + (w * 0.03) + 'px'});
        // 窗口大小改变时
        $(window).resize(function () {
            // ul宽度
            $(o + ' ul').css({'width': $(o).width() * $(o + ' ul > li').length});
            // li宽度
            $(o + ' ul > li').css({'width': $(o).width() * 0.76, 'margin': '0 ' + ($(o).width() * 0.03) + 'px'});
        });
        // 小圆点点击事件
        $(o + ' div.carousel > ol > li').click(function () {
            // 停止自动切换
            if (options.switch === 'on') {
                window.clearInterval(t);
            }
            var i = $(this).index();
            checkMipImg(i);
            var l = $(o + ' div.carousel > ol > li').length;
            // 点亮小圆点
            $(this).addClass('active').siblings().removeClass('active');
            // 顾问个数
            var l2 = $(o + ' ul > li').length;
            var l3 = (i + 1);
            // ul切换后的左边距
            var nul;
            for (i; i < l2 && i < l3; i++) {
                if (i > 0) {
                    nul = -(w * i - ((w * 0.09) * ((i * 2) + 1)));
                }
                else {
                    nul = '9%';
                }
                $(o + ' ul').css({'left': nul});
            }
            // 自动切换
            if (options.switch === 'on') {
                t = window.setInterval(function () {
                    reincarnationloan(1);
                }, Number(options.delay));
            }
        });
        // 上一个与下一个点击事件
        $(o + ' div.carousel_arrow > div').click(function () {
            // 停止自动切换
            if (options.switch === 'on') {
                window.clearInterval(t);
            }
            var c = $(this).attr('class');
            if (c === 'arrow_r') {
                reincarnationloan(1);
            }
            else if (c === 'arrow_l') {
                reincarnationloan(-1);
            }
            // 自动切换
            if (options.switch === 'on') {
                t = window.setInterval(function () {
                    reincarnationloan(1);
                }, Number(options.delay));
            }
        });
        // 自动切换
        if (options.switch === 'on') {
            t = window.setInterval(function () {
                reincarnationloan(1);
            }, Number(options.delay));
        }
    };
    function reincarnationloan(c) {
        // 当前小圆点索引
        var i = $(o + ' div.carousel ol li.active').index();
        // 下一个索引
        i = i + c;
        // 一共多少个圆点
        var l = $(o + ' div.carousel ol li').length;
        // 达到第一个或者最后一个后归零
        if (i === l) {
            i = 0;
        }
        else if (i === -1) {
            i = l - 1;
        }
        checkMipImg(i);
        // 点亮下一个小圆点
        $(o + ' div.carousel > ol > li').eq(i).addClass('active').siblings().removeClass('active');
        // 顾问个数
        var l2 = $(o + ' ul >li').length;
        var l3 = i + 1;
        // 屏幕宽度
        var w = $(o).width();
        // ul左边距
        var ul = w * 0.09;
        // ul切换后的左边距
        var nul;
        for (var i2 = l3 - 1; i2 < l2 && i2 < l3; i2++) {
            if (i2 > 0) {
                nul = -(w * i2 - (ul * ((i2 * 2) + 1)));
            }
            else {
                nul = '9%';
            }
            $(o + ' ul').css({'left': nul});
        }
    }

    function checkMipImg(i) {
        var l = $(o + ' ul > li:nth-child(' + (i + 1) + ') > div:nth-child(1) > mip-img > img').length;
        if (l === 0) {
            var img = $(o + ' ul > li:nth-child(' + (i + 1) + ') > div:nth-child(1) > mip-img');
            var html = '<img class="mip-fill-content mip-replaced-content" src="' + img.attr('src') + '">';
            img.append(html);
        }
    }

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

    return customElem;
});
