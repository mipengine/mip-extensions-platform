/**
 * @file mip-scroll-locator 组件滑动处理
 * @author susc
 * @description 此组件只为showcase，请勿在正式产品使用。
 */

define(['require'], function(require) {
    'use strict';
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t + b
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    var requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    function scrollTo(ele, to, duration, callback) {
        ele = ele || document.documentElement || document.body.parentNode || document.body.scrollTop;

        function move(amount) {
            ele.scrollTop = amount;
        }

        function position() {
            return ele.scrollTop;
        }
        var start = position();
        var change = to - start;
        var currentTime = 0;
        var increment = 20;
        duration = (typeof (duration) === 'undefined') ? 500 : duration;
        var animateScroll = function () {
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            move(val);
            if (currentTime < duration) {
                requestAnimFrame(animateScroll);
            } else {
                if (callback && typeof (callback) === 'function') {
                    callback();
                }
            }
        };
        animateScroll();
    }

    function scrollBy(ele, range, duration, callback) {
        ele = ele || document.documentElement || document.body.parentNode || document.body.scrollTop;

        function move(amount) {
            ele.scrollTop = amount;
        }

        function position() {
            return ele.scrollTop;
        }
        var start = position();
        var change = - range;
        var currentTime = 0;
        var increment = 20;
        duration = (typeof (duration) === 'undefined') ? 500 : duration;
        var animateScroll = function () {
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            move(val);
            if (currentTime < duration) {
                requestAnimFrame(animateScroll);
            } else {
                if (callback && typeof (callback) === 'function') {
                    callback();
                }
            }
        };
        animateScroll();
    }

    return {
        scrollTo: scrollTo,
        scrollBy: scrollBy
    };
});