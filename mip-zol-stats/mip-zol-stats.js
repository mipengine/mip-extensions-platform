/**
 * @file mip-zol-stats 组件
 * @author liu.xianggui
 */

define(function (require) {

    var customElement = require('customElement').create();
    var utils = require('util');

    // 统计组件，需要在创建的时候就做处理
    customElement.prototype.createdCallback = function () {
        var element = this.element;
        var cfg = getCustomConfig(element);
        var trackEventsArr = getCustomTrackEvents();

        if (trackEventsArr.length) {
            cfg.events = trackEventsArr;
        }
        window._zpv_cfg = cfg; // eslint-disable-line

        var zpv = document.createElement('script');
        zpv.src = '//js.zol.com.cn/pvn/pv.js';
        zpv.charset = 'utf-8';
        element.appendChild(zpv);
    };

    /**
     * 获取配置
     *
     * @param {Object} element 组件元素
     * @return {Object} 配置
     */
    function getCustomConfig(element) {
        // 默认配置
        var defaultCfg = {
            terminal: 'mip'
        };
        var site = element.getAttribute('site');
        if (site && site !== '') {
            defaultCfg.site = site;
        }

        // 用户配置
        var config = {};
        try {
            var script = element.querySelector('script[type="application/json"]');
            if (script) {
                var customData = JSON.parse(script.textContent);
                if (JSON.stringify(customData) !== '{}') {
                    config = utils.fn.extend({}, defaultCfg, customData);
                }
                return config;
            }
        }
        catch (e) {
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
        }
        return defaultCfg;
    }

    /**
     * 获取需要绑定事件统计的DOM
     *
     * @return {Object} 需要绑定事件DOM和参数集合
     */
    function getCustomTrackEvents() {
        // 获取所有需要触发的dom
        var trackEventsDom = document.querySelectorAll('*[zpv-events]');
        var eventsArr = [];

        var length = trackEventsDom.length;
        while (--length >= 0) {
            var current = trackEventsDom[length];
            var attrValue = current.getAttribute('zpv-events');
            // 检测statusData是否存在
            if (attrValue === '') {
                continue;
            }
            var data = attrValue.split('|');
            if (data.length > 3) {
                console.warn('事件追踪zpv-events数据不正确.');  // eslint-disable-line
                continue;
            }
            var tempEvent = {
                dom: current,
                type: data[0],
                name: data[1]
            };
            // 如果配置了自定义字段
            if (data.length === 3 && data[2] !== '') {
                var extra = convertQueryStringToJSON(data[2]);
                if (!isEmptyObject(extra)) {
                    tempEvent.extra = extra;
                }
            }
            eventsArr.push(tempEvent);
        }
        return eventsArr;
    }

    /**
     * 把query转换为对象
     *
     * @param {string} query 传入的字符串，如：a=3&b=4
     * @return {Object} 返回对象
     */
    function convertQueryStringToJSON(query) {
        var queryStringArr = query.split('&');
        var result = {};
        queryStringArr.forEach(function (item, index) {
            var match = item.split('=');
            if (match[0] && match[0] !== '' && match[1] && match[1] !== '') {
                result[match[0]] = window.decodeURIComponent(match[1]);
            }
        });
        return JSON.parse(JSON.stringify(result));
    }

    /**
     * 判断是否是空对象
     *
     * @param  {Object} object 需要判断的对象
     * @return {boolean}
     */
    function isEmptyObject(object) {
        for (var t in object) {
            if (object.hasOwnProperty(t)) {
                return !1;
            }
        }
        return !0;
    }

    return customElement;
});
