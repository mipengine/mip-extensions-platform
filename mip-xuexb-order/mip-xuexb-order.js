/**
 * @file 订单组件示例
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var Order = require('customElement').create();
    var fn = require('util').fn;
    var viewer = require('viewer');
    var util = require('./util');

    Order.prototype.init = function () {
        var self = this;

        /**
         * 会话标识
         *
         * @type {string}
         */
        self.sessionId = null;

        /**
         * 订单提交数据
         *
         * @type {Object}
         */
        self.data = {};

        /**
         * 用户配置数据
         *
         * @type {Object}
         */
        self.config = self.element.dataset;

        // 检查配置数据
        self.checkConfig();

        // 初始化组件内 <script type="application/json"> 配置合并到 this.data 中
        self.initJSON();

        // 注入设置会话标识接口
        self.addEventAction('setSessionId', function (event) {
            self.sessionId = event.sessionId;
        });

        // 注入追加数据接口
        self.addEventAction('addEventData', function (event) {
            fn.extend(true, self.data, event.data || {});
        });

        // 注入支付接口
        self.addEventAction('submit', self.submit.bind(this));
    };

    /**
     * 提交订单
     */
    Order.prototype.submit = function () {
        var self = this;
        var data = fn.extend({}, self.data, self.getFormData(), {
            sessionId: self.sessionId
        });

        self.trigger('ajaxBefore');

        util.post(self.config.endpoint, data).then(function (res) {
            self.trigger('ajaxComplete');

            if (res.status === 0 && res.data && res.data.orderId) {
                self.trigger('success', {
                    orderId: res.data.orderId
                });
            }
            else {
                self.trigger('error');
            }
        }).catch(function () {
            self.trigger('ajaxComplete');
            self.trigger('error');
        });
    };

    /**
     * 获取页面表单数据
     *
     * @return {Object}
     */
    Order.prototype.getFormData = function () {
        var self = this;
        var elements = self.element.querySelectorAll('input[name], textarea[name]');
        var data = {};

        [].slice.call(elements).forEach(function (el) {
            fn.extend(true, data, util.stringToObject(el.name, el.value));
        });

        return data;
    };

    /**
     * 触发事件
     *
     * @param  {string} name  事件名称
     * @param  {Object} data 数据，默认为订单数据
     */
    Order.prototype.trigger = function (name, data) {
        var event = {
            sessionId: this.sessionId,
            data: data || this.data
        };
        viewer.eventAction.execute(name, this.element, event);
    };

    /**
     * 输出错误信息到控制台
     *
     * @param {string} text 输出文本
     */
    Order.prototype.error = function (text) {
        console.error('[mip-xuexb-order] ', text, this.element);
    };

    /**
     * 注入组件中的 JSON 配置到数据
     */
    Order.prototype.initJSON = function () {
        var self = this;
        var scripts = self.element.querySelectorAll('script[type="application/json"]');

        [].slice.call(scripts).forEach(function (script) {
            fn.extend(true, self.data, util.parseJSON(script.innerText));
        });
    };

    /**
     * 检查配置
     */
    Order.prototype.checkConfig = function () {
        var config = this.config;
        var hasError = false;

        if (!config.endpoint) {
            this.error('组件必选属性名 data-endpoint 为空');
            hasError = true;
        }
        else if (!/^(https:)?\/\//.test(config.endpoint)) {
            this.error('组件必选属性名 data-endpoint 必须以 https:// 或者 // 开头');
            hasError = true;
        }

        if (hasError) {
            throw new TypeError('[mip-xuexb-order] 组件必选属性检查失败');
        }

    };

    return Order;
});
