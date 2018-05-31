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
        var $el = $(this.element);
        var fixedHeight = $el.find('.details-fix-top').height();
        var fixedTop = $el.find('.details-fix-top').offset().top;
        var screenHeight = document.documentElement.clientHeight;
        var navHeight = 120;
        var footerHeight = 115;
        var flag = false;
        var downFlag = false;
        var lastScrollTop;
        var uplastScrollTop;
        var scrollHeight = fixedHeight + fixedTop - screenHeight + footerHeight;
        var FixHeight =  -(fixedHeight  - screenHeight + footerHeight);
        var beforeScroll = document.documentElement.scrollTop || document.body.scrollTop;
        window.onscroll = function () {
            var bodyScroll = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollDeration = beforeScroll - bodyScroll;
            if (scrollDeration > 0) {
                if (flag === false) {
                    lastScrollTop = bodyScroll;
                    $el.find('.details-fix-top>.scroll-wrap').css({'position': 'unset', 'marginTop':
                        + bodyScroll - scrollHeight});
                    uplastScrollTop = bodyScroll;
                    downFlag = true;
                    flag = true;
                }
                else {
                    if (lastScrollTop - bodyScroll >  fixedHeight - screenHeight
                        + footerHeight + navHeight && bodyScroll > fixedTop - navHeight) {
                        $el.find('.details-fix-top>.scroll-wrap').css({'position': 'fixed', 'top':
                            + navHeight, 'width': $el.find('.details-fix-top').width(), 'marginTop': 0});
                        downFlag = true;
                        uplastScrollTop = bodyScroll;
                    }
                    else if (bodyScroll < fixedTop  - navHeight) {
                        $el.find('.details-fix-top>.scroll-wrap').css({'position': 'unset', 'width':
                            + $el.find('.details-fix-top').width(), 'marginTop': 0});
                        downFlag = false;
                    }
                };
            }
            else {
                if (bodyScroll > scrollHeight) {
                    if (downFlag === false) {
                        $el.find('.details-fix-top>.scroll-wrap').css({'position': 'fixed', 'top':
                            + FixHeight, 'width': $el.find('.details-fix-top').width(), 'marginTop': 0});
                        flag = false;
                    }
                    else {
                        if (bodyScroll - uplastScrollTop  > fixedHeight - screenHeight + footerHeight + navHeight) {
                            $el.find('.details-fix-top>.scroll-wrap').css({'position': 'fixed', 'top':
                                + FixHeight, 'width': $el.find('.details-fix-top').width(), 'marginTop': 0});
                            flag = false;
                        }
                        else {
                            $el.find('.details-fix-top>.scroll-wrap').css({'position': 'unset', 'marginTop':
                                + uplastScrollTop - fixedTop + navHeight});
                        }
                    }
                }
                else {
                    if (downFlag === true) {
                        if (bodyScroll - uplastScrollTop  > fixedHeight - screenHeight + footerHeight + navHeight) {
                            $el.find('.details-fix-top>.scroll-wrap').css({'position': 'fixed', 'top':
                                + FixHeight, 'width': $el.find('.details-fix-top').width(), 'marginTop': 0});
                            flag = false;
                        }
                        else {
                            $el.find('.details-fix-top>.scroll-wrap').css({'position': 'unset', 'marginTop':
                                + uplastScrollTop - fixedTop + navHeight});
                        }
                    }
                }
            }
            beforeScroll = bodyScroll;
        };
    };

    return customElement;
});
