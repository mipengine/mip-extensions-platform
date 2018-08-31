/**
 * @file mip-xxd-slider 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * 获取dom元素宽度
     *
     * @param {domList} children cookie前缀
     *
     * @return {number} dom元素宽度
     */
    function getChildItemWidth(children) {
        var child = children.length > 0 ? children[0] : null;

        if (!child) {
            return 0;
        }

        return child.offsetWidth || 0;
    }

    /**
     * 滚动幻术
     *
     * @param {number} destPosition 目标位置
     * @param {number} interval 持续时间
     * @param {dom} dom 要滚动的元素
     * @param {Function} cancelFunc 用来判断是否应该取消滚动
     */
    function scrollTo(destPosition, interval, dom, cancelFunc) {
        var ease = function (t) {
            return 0.5 - Math.cos(t * Math.PI) / 2;
        };

        var duration = interval || 150;

        if (!dom) {
            return;
        }

        var time = 0;
        var currentPosition = dom.scrollLeft;
        var intervalObj = null;

        if (requestAnimationFrame) {
            var scrollCb = function () {
                if (time > duration) {
                    dom.scrollTo(destPosition, 0);
                    cancelAnimationFrame(intervalObj);
                    return;
                }

                if (cancelFunc()) {
                    cancelAnimationFrame(intervalObj);
                    return;
                }

                time += 10;
                dom.scrollTo(currentPosition + (destPosition - currentPosition) * ease(time / duration), 0);
                intervalObj = requestAnimationFrame(scrollCb);
            };
            intervalObj = requestAnimationFrame(scrollCb);
        }
        else {
            intervalObj = setInterval(function () {
                if (time > duration) {
                    dom.scrollTo(destPosition, 0);
                    clearInterval(intervalObj);
                    return;
                }

                if (cancelFunc()) {
                    clearInterval(intervalObj);
                    return;
                }

                time += 10;
                dom.scrollTo(currentPosition + (destPosition - currentPosition) * ease(time / duration), 0);
            }, 10);
        }
    }

     /**
     * 返回滚动监听回调
     *
     * @param {dom} dom 要计算的dom
     * @param {Function} cb 不滚动后的回调函数
     *
     * @return {Function} 滚动监听函数
     */
    function onListenScrollEnd(dom, cb) {
        var savedPosition = -1;
        var interval = null;

        return function scroll() {
            var currentPosition = dom.scrollLeft;
            clearInterval(interval);
            interval = setTimeout(function () {
                if (savedPosition === currentPosition && !dom.isTouched) {
                    cb(dom);
                }
            }, 200);
            savedPosition = currentPosition;
        };
    }

     /**
     * 设置当前索引
     *
     * @param {dom} ulElement 当前列表元素
     * @param {number} currentIndex 当前所以
     */
    function setCurrentIndex(ulElement, currentIndex) {
        var children = ulElement.children;
        Array.prototype.forEach.call(children, function (child, index) {
            if (index === currentIndex) {
                child.className = 'mip-xxd-slider-dot mip-xxd-slider-dot-active';
            }
            else {
                child.className = 'mip-xxd-slider-dot';
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;

        var children = element.children;

        var length = children.length || 0;

        var dotsList = document.createElement('ul');
        dotsList.className = 'mip-xxd-slider-dot-list';

        var hideBox = document.createElement('div');
        hideBox.className = 'mip-xxd-slider-scroll-box-outer';

        var scrollBox = document.createElement('div');
        scrollBox.className = 'mip-xxd-slider-scroll-box';

        var childWidth = getChildItemWidth(children);

        scrollBox.isTouched = false;
        var isScrolling = false;

        var scrollCallback = onListenScrollEnd(scrollBox, function (dom) {
            var element = dom;
            var currentPosition = element.scrollLeft || 0;

            var currentIndex = Math.round(currentPosition / childWidth);

            var targetPosition = currentIndex * childWidth;

            var cancelFunc = function () {
                return !isScrolling;
            };

            scrollTo(targetPosition, 150, element, cancelFunc);

            setCurrentIndex(dotsList, currentIndex);
        });

        scrollBox.addEventListener('touchstart', function () {
            scrollBox.isTouched = true;
        });

        scrollBox.addEventListener('touchend', function () {
            scrollBox.isTouched = false;
            scrollCallback();
        });

        scrollBox.addEventListener('scroll', function () {
            isScrolling = true;
            scrollCallback();
        });

        util.dom.insert(scrollBox, children);
        hideBox.appendChild(scrollBox);
        element.appendChild(hideBox);

        for (var i = 0; i < length; i++) {
            var dot = document.createElement('li');
            dot.className = 'mip-xxd-slider-dot';
            dotsList.appendChild(dot);
        }
        element.appendChild(dotsList);

        setCurrentIndex(dotsList, 0);

        hideBox.style.maxHeight = scrollBox.offsetHeight - 10 + 'px';
    };

    return customElement;
});
