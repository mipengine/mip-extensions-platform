/**
 * @file mip-linktion-fix-scroll-content 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // var $el = $(this.element);
        // 页面滚动固定
        // 整个滚动的框的高度
        // var fixedHeight = $el.find('.details-fix-top').height();
        // 滚动框的与浏览器顶部的距离
        // var fixedTop = $el.find('.details-fix-top').offset().top;
        // 浏览器高度
        // var screenHeight = document.documentElement.clientHeight;
        // 导航高度
        // var navHeight = 120;
        // 页脚高度
        // var footerHeight = 165;
        // 上滑的标志
        // var flag = false;
        // 下滑的标志
        // var downFlag = false;
        // 判断页面是否固定
        // var ifFix = false;
        // 上滑上次的高度
        // var lastScrollTop;
        // 下滑上次的高度
        // var uplastScrollTop;
        // 第一次滚动到固定距离
        // var scrollHeight = fixedHeight + fixedTop - screenHeight + footerHeight;
        // 开始下滑后需要再滚动多长的距离固定
        // var FixHeight =  -(fixedHeight  - screenHeight + footerHeight);
        // var beforeScroll = document.documentElement.scrollTop || document.body.scrollTop;
        // $el.find('.details-fix-top>.scroll-wrap').css({'width': $el.find('.details-fix-top').width()});
        var topSpace = $('.details-fix-top>.scroll-wrap').offset().top;
        var fixtop = topSpace - 120 - 58;
        var bigWidth = $('.details-fix-top').width();
        var smallWidth = $('.details-fix-top').width();
        $(window).on('scroll', function () {
            var bodyScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if ($(window).width() < 1200) {
                if (bodyScroll > topSpace) {
                    $('.details-fix-top>.scroll-wrap').css({'position': 'fixed', 'top': fixtop,
                    'width': smallWidth});
                }
                if (bodyScroll < topSpace) {
                    $('.details-fix-top>.scroll-wrap').css({'position': 'unset',
                    'width': smallWidth});
                }
            }
            if ($(window).width() > 1200) {
                if (bodyScroll > topSpace) {
                    $('.details-fix-top>.scroll-wrap').css({'position': 'fixed', 'top': fixtop,
                    'width': bigWidth});
                }
                if (bodyScroll < topSpace) {
                    $('.details-fix-top>.scroll-wrap').css({'position': 'unset',
                    'width': bigWidth});
                }
            }

        //     var bodyScroll = document.documentElement.scrollTop || document.body.scrollTop;
        //     // 判断页面滚动的方向
        //     var scrollDeration = beforeScroll - bodyScroll;
        //     // 固定盒子的marginTop
        //     var boxMtop = $el.find('.details-fix-top>.scroll-wrap').css('marginTop');
        //     var boxMtopNum = parseInt(boxMtop.substr(0, boxMtop.length - 2), 10);
        //     // 页面上滚
        //     if (scrollDeration > 0) {
        //         if (flag === false) {
        //             // 第一次滚动到固定开始上滑
        //             lastScrollTop = bodyScroll;
        //             $el.find('.details-fix-top>.scroll-wrap').css({'position': 'unset', 'marginTop':
        //                 + bodyScroll - scrollHeight});
        //             uplastScrollTop = bodyScroll;
        //             downFlag = true;
        //             flag = true;
        //             ifFix = false;
        //         }
        //         else {
        //             // 上滑到固定
        //             if (lastScrollTop - bodyScroll >  fixedHeight - screenHeight + footerHeight
        //                 + navHeight && bodyScroll > fixedTop - navHeight) {
        //                 $el.find('.details-fix-top>.scroll-wrap').css({'position': 'fixed', 'top':
        //                 + navHeight, 'width': $el.find('.details-fix-top').width(), 'marginTop': 0});
        //                 downFlag = true;
        //                 ifFix = true;
        //                 uplastScrollTop = bodyScroll;
        //             }
        //             else if (bodyScroll < fixedTop  - navHeight) {
        //                 // 上滑归为到顶部
        //                 $el.find('.details-fix-top>.scroll-wrap').css({'position': 'unset', 'width':
        //                     + $el.find('.details-fix-top').width(), 'marginTop': 0});
        //                 downFlag = false;
        //                 ifFix = false;
        //             }
        //         }
        //     }
        //     else {
        //         // 页面下滚
        //         // 页面下滑到第一次可以固定的地方
        //         if (bodyScroll > scrollHeight) {
        //           // 判断页面是否上滑过，没有上滑自动到位固定
        //             if (downFlag === false) {
        //                 $el.find('.details-fix-top>.scroll-wrap').css({'position': 'fixed', 'top':
        //                     + FixHeight, 'width': $el.find('.details-fix-top').width(), 'marginTop': 0});
        //                 flag = false;
        //             }
        //             else {
        //               // 从上滑转为下滑，判断是否滑到可固定位置
        //                 if (ifFix === false) {
        //                     if (bodyScroll >  boxMtopNum + fixedHeight + footerHeight - screenHeight + fixedTop) {
        //                         $el.find('.details-fix-top>.scroll-wrap').css({'position': 'fixed', 'top':
        //                         + FixHeight, 'width': $el.find('.details-fix-top').width(), 'marginTop': 0});
        //                         flag = false;
        //                     }
        //                 }
        //                 else {
        //                     // 上滑转下滑，需要判断上滑到固定位置处，还是未到顶部固定
        //                     $el.find('.details-fix-top>.scroll-wrap').css({'position': 'unset', 'marginTop':
        //                         + uplastScrollTop - fixedTop + navHeight});
        //                     ifFix = false;
        //                 }
        //             }
        //         }
        //         else {
        //             // 判断页面是够上滑过，未赏花保持不变，上滑需判断上滑到固定位置处，还是未到顶部固定
        //             if (downFlag === true) {
        //                 if (ifFix === false) {
        //                     // console.log(bodyScroll)
        //                     // console.log(fixedHeight + $el.find('.details-fix-top').css('marginTop') + fixedTop - scrollHeight)
        //                     if (bodyScroll > boxMtopNum + fixedHeight + footerHeight - screenHeight + fixedTop) {
        //                         $el.find('.details-fix-top>.scroll-wrap').css({'position': 'fixed', 'top':
        //                             + FixHeight, 'width': $el.find('.details-fix-top').width(), 'marginTop': 0});
        //                         flag = false;
        //                     }
        //                 }
        //                 else {
        //                 // 上滑转下滑，需要判断上滑到固定位置处，还是未到顶部固定
        //                     $el.find('.details-fix-top>.scroll-wrap').css({'position': 'unset', 'marginTop':
        //                         + uplastScrollTop - fixedTop + navHeight});
        //                     ifFix = false;
        //                 };
        //             };
        //         };
        //     }
        //     beforeScroll = bodyScroll;
        });
    };
    return customElement;
});
