/**
 * @file mip-st-scrollboundary 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var viewport = require('viewport');

    // 需要预渲染
    var element = document.getElementById('scrollboundary');
    window.MIP.prerenderElement(element);

    function stopProFun(e) {
        e.stopPropagation();
    }

    function scrollBoundary(element) {
        var touchStartEvent;
        // 收集body child元素 并进行包裹
        var scrollaBoundaryTouch = document.createElement('div');
        var offsetHeight;
        var bodyPaddingTop;
        var body = document.body;
        var touchTarget;

        scrollaBoundaryTouch.setAttribute('mip-shell-scrollboundary', true);
        [].slice.call(body.children).forEach(function (child) {
            if (/^(SCRIPT|IFRAME|MIP-SHELL|MIP-DATA|MIP-SCROLLBOUNDARY|MIP-FIXED)/.test(child.nodeName)) {
                return;
            }
            scrollaBoundaryTouch.appendChild(child);
        });
        [].slice.call(body.children).forEach(function (child) {
            if (/^(SCRIPT|IFRAME|MIP-SHELL|MIP-DATA|MIP-SCROLLBOUNDARY|MIP-FIXED)/.test(child.nodeName)) {
                return;
            }
            scrollaBoundaryTouch.appendChild(child);
        });
        body.appendChild(scrollaBoundaryTouch);

        // 添加事件处理
        scrollaBoundaryTouch.addEventListener('touchstart', function (e) {
            touchStartEvent = e;
            // 内滚 兼容处理
            touchTarget = getClosestScrollElement(e.target);
            if (touchTarget) {
                touchTarget.addEventListener('touchmove', stopProFun);
            }
        });

        scrollaBoundaryTouch.addEventListener('touchmove', function (e) {
            var touchRect = e.targetTouches[0];
            var startTouchReact = touchStartEvent.targetTouches[0];

            // 兼容模式处理
            offsetHeight = document.compatMode === 'BackCompat'
                ? document.body.clientHeight
                : document.documentElement.clientHeight;

            bodyPaddingTop = bodyPaddingTop || parseInt(util.css(body, 'paddingTop'), 10);
            var scrollTop = body.scrollTop || viewport.getScrollTop();
            var scrollHeight = viewport.getElementRect(scrollaBoundaryTouch).height + bodyPaddingTop;

            // 到达顶部时 && 是向下滚动操作
            // 到达底部时 && 并且 向上滚动操作
            var isprevent = (
                touchRect.pageY >= startTouchReact.pageY
                && touchRect.clientY > startTouchReact.clientY
                && scrollTop < 5) || (
                    touchRect.pageY < startTouchReact.pageY
                    && (scrollTop + offsetHeight >= scrollHeight)
                );
            if (isprevent) {
                e.preventDefault();
            }
            e.stopPropagation();
        });

        scrollaBoundaryTouch.addEventListener('touchend', function () {
            if (touchTarget) {
                touchTarget.removeEventListener('touchmove', stopProFun);
            }
        });
    }

    function getClosestScrollElement(element) {
        while (element && !element.getAttribute('mip-shell-scrollboundary')) {
            if (util.css(element, 'overflow-y') === 'auto' && element.clientHeight < element.scrollHeight) {
                return element;
            }
            if (util.css(element, 'overflow-x') === 'auto' && element.clientWidth < element.scrollWidth) {
                return element;
            }
            element = element.parentNode;
        }
        return null;
    }



    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        scrollBoundary();
    };

    return customElement;
});
