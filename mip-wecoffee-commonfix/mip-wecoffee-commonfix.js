

/**
 * @file mip-wecoffee-commonfix 组件
 * @author zhuguoxi
 * @description 此组件只为showcase，请勿在正式产品使用。
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var SCROLL_CONTAIN = '.scrollable';

    // 常用修复功能，需要尽快展示
    customElement.prototype.build = function () {
        this.fixscrollBoundary($(this.element).attr('scrollable'), $(this.element).attr('container'));

        this.addEventAction('goOrderlist', function () {
            require('ralltiir').action.redirect('orderList.html?r=' + new Date().getTime(), null, {
                title: {
                    html: '订单列表'
                }
            });
        });

    };

    customElement.prototype.fixscrollBoundary = function (scrollable, container) {
        var touchStartEvent;
        $(scrollable || SCROLL_CONTAIN).on({
            touchstart: function (e) {
                touchStartEvent = e;
            },
            touchmove: function (e) {
                var touchRect = e.targetTouches[0];
                var startTouchReact = touchStartEvent.targetTouches[0];
                var isprevent = (
                    touchRect.pageY >= touchRect.pageY
                    && touchRect.clientY > startTouchReact.clientY
                    && this.scrollTop === 0)
                    || (
                    touchRect.pageY < startTouchReact.pageY
                    && this.scrollTop + this.offsetHeight >= this.scrollHeight
                );

                if (isprevent) {
                    e.preventDefault();
                }

                e.stopPropagation();

            }
        });

        $(container || 'body').bind('touchmove', function (e) {
            e.preventDefault();
        });
    };

    return customElement;
});
