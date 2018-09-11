/**
 * @file mip-zmall-bmap 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var viewer = require('viewer');

    /**
     * 组件触发本身的事件
     *
     * @param {string} eventStr 事件串
     */
    customElement.prototype.eventExcute = function (eventStr) {
        var element = this.element;
        var lat = element.dataset.lat;
        var lng = element.dataset.lng;
        var isEmptyLatAndLng = !lat || lat === '' || !lng || lng === '';

        // 触发组件本身的事件
        if (eventStr.indexOf('loaded:') > -1) {
            viewer.eventAction.execute('loaded', element, {element: element});
        }
        if (eventStr.indexOf('distance:') > -1 && !isEmptyLatAndLng) {
            viewer.eventAction.execute('distance', element, {element: element});
        }
        if (eventStr.indexOf('link:') > -1) {
            viewer.eventAction.execute('link', element, {element: element});
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var onAttr = element.getAttribute('on');
        if (onAttr && onAttr !== '') {
            this.eventExcute(onAttr);
        }
    };

    /**
     * 属性发生变化时, 因为有的时候需要用 mip-bind 来绑定属性
     *
     * @param {string} attributeName 属性名
     * @param {string} oldValue 旧值
     * @param {string} newValue 新值
     */
    customElement.prototype.attributeChangedCallback = function (attributeName, oldValue, newValue) {
        var element = this.element;
        var onAttr = element.getAttribute('on');
        var lat = element.getAttribute('data-lat');
        var lng = element.getAttribute('data-lng');
        // 经纬度都发生变化的时候才执行
        if (attributeName === 'data-lng' && newValue && oldValue !== newValue) {
            element.changed = (lat && lat !== '');
        }
        if (attributeName === 'data-lat' && newValue && oldValue !== newValue) {
            element.changed = (lng && lng !== '');
        }

        if ((attributeName === 'data-lng' || attributeName === 'data-lat') && element.changed) {
            if (onAttr && onAttr !== '') {
                var self = this;
                setTimeout(function () {
                    self.eventExcute(onAttr);
                }, 0);
            }
        }
    };

    return customElement;
});
