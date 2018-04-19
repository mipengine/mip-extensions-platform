/**
 * @file MIP 支付组件
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var Pay = require('customElement').create();
    var fn = require('util').fn;
    var viewer = require('viewer');
    var util = require('./util');

    /**
     * 初始化
     */
    Pay.prototype.init = function () {
        var self = this;

        /**
         * 会话标识
         *
         * @type {string}
         */
        self.sessionId = null;

        /**
         * 支付提交数据
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
        self.addEventAction('pay', self.pay.bind(this));
    };

    /**
     * 支付
     */
    Pay.prototype.pay = function () {
        var self = this;

        self.trigger('ajaxBefore');

        util.post(this.config.endpoint, fn.extend({}, self.data, {
            sessionId: self.sessionId,
            state: JSON.stringify({
                r: Date.now(),
                url: location.href
            })
        })).then(function (res) {
            self.trigger('ajaxComplete');

            if (res.status === 0 && res.data && res.data.url) {
                self.redirect(res.data.url);
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
     * 重定向到支持收银台
     *
     * @param  {string} url 付款链接
     *
     * @return {Object}
     */
    Pay.prototype.redirect = function (url) {
        if (util.isIframe()) {
            return viewer.sendMessage('simple-pay', {
                url: url
            });
        }

        window.top.location.href = url;
    };

    /**
     * 触发事件
     *
     * @param  {string} name  事件名称
     * @param  {Object} event 事件对象
     */
    Pay.prototype.trigger = function (name) {
        var event = {
            sessionId: this.sessionId,
            data: this.data
        };
        viewer.eventAction.execute(name, this.element, event);
    };

    /**
     * 输出错误信息到控制台
     *
     * @param {string} text 输出文本
     */
    Pay.prototype.error = function (text) {
        console.error('[mip-simple-pay] ', text, this.element);
    };

    /**
     * 注入组件中的 JSON 配置到数据
     */
    Pay.prototype.initJSON = function () {
        var self = this;
        var scripts = self.element.querySelectorAll('script[type="application/json"]');

        [].slice.call(scripts).forEach(function (script) {
            fn.extend(true, self.data, util.parseJSON(script.innerText));
        });
    };

    /**
     * 检查配置
     */
    Pay.prototype.checkConfig = function () {
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
            throw new TypeError('[mip-simple-pay] 组件必选属性检查失败');
        }

    };

    return Pay;
});
