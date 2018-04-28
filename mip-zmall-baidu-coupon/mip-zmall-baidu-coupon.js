/**
 * @file mip-zmall-baidu-coupon 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var mustache = require('mip-mustache/mustache');

    function preventTouch(e) {
        e.preventDefault();
    }

    // 设置遮罩层
    function setCover(element) {
        var elementParentNode = element.parentNode;
        if (elementParentNode.tagName === 'MIP-FIXED') {
            util.css(elementParentNode, {
                height: '100%'
            });
        }
        util.css(element, {
            height: '100%'
        });
        element.addEventListener('touchmove', preventTouch);
    }

    // 移除遮罩层
    function removeCover(element) {
        var elementParentNode = element.parentNode;
        setTimeout(function () {
            if (elementParentNode.tagName === 'MIP-FIXED') {
                util.css(elementParentNode, {
                    height: 'auto'
                });
            }
            util.css(element, {
                height: 'auto'
            });
        }, 300);
        element.removeEventListener('touchmove', preventTouch);
    }

    // 关闭
    function closeWindow(element) {
        var layerElement = element.querySelector('#js_coupon_success_layer');
        layerElement.classList.remove('visible');
        removeCover(element);
    }

    function bindEvent(element) {
        var closeElement = element.querySelector('#js_coupon_success_close');
        closeElement.addEventListener('click', function () {
            closeWindow(element);
        });
    }

    // 处理弹层上面的滚动
    function smartScroll(container, selectorScrollable) {
        // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
        if (!selectorScrollable || container.isBindScroll) {
            return;
        }

        var data = {
            posY: 0,
            maxscroll: 0
        };

        // 事件处理
        container.addEventListener('touchstart', function (e) {
            var events = e.touches[0] || e;
            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = container.scrollTop;
            // 是否可以滚动
            data.maxscroll = container.scrollHeight - container.clientHeight;
        });

        container.addEventListener('touchmove', function (e) {
            e.stopPropagation();
            var events = e.touches[0] || e;
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0) {
                // 禁止滚动
                e.preventDefault();
            }
            // 当前的滚动高度
            var scrollTop = container.scrollTop;
            // 移动距离
            var distanceY = events.pageY - data.posY;

            // 上下边缘检测
            if (distanceY > 0 && scrollTop === 0) {
                // 往上滑，并且到头
                // 禁止滚动的默认行为
                e.preventDefault();
                return;
            }

            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
                // 往下滑，并且到头
                // 禁止滚动的默认行为
                e.preventDefault();
                return;
            }
        });

        container.addEventListener('touchend', function (e) {
            data.maxscroll = 0;
        });

        // 防止多次重复绑定
        container.isBindScroll = true;
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var self = this;
        var element = self.element;

        var script = element.querySelector('script[type="application/json"]');
        var settings = {};
        if (script) {
            var customSettings = JSON.parse(script.textContent.toString());
            settings = util.fn.extend(settings, customSettings);
        }

        var mipDialogComponent = document.querySelector('mip-zol-dialog');
        element.mipDialogComponent = mipDialogComponent;

        var templateElement = element.querySelector('template');
        if (templateElement) {
            var template = templateElement.innerHTML;
            element.template = template;
        }

        self.addEventAction('receive', function () {
            var url = settings.url + '&merchantId=' + settings.merchantId + '&storeId=' + settings.storeId;
            fetchJsonp(url, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                setCover(element);
                var html = mustache.render(element.template, res).trim();
                element.innerHTML = html;
                var successLayer = element.querySelector('#js_coupon_success_layer');
                successLayer.classList.add('visible');
                bindEvent(element);
                // 滚动
                var scroller = element.querySelector('#js_coupon_scroller');
                smartScroll(scroller, true);
            });
        });
    };

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;
});
