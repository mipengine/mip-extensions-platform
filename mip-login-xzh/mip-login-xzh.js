/**
 * @file MIP 网站中熊掌号登录
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* eslint-disable fecs-camelcase */
define(function (require) {
    'use strict';

    var util = require('./util');
    var platform = require('util').platform;
    var mustache = require('mip-mustache/mustache');
    var viewer = require('viewer');
    var hash = require('hash');
    var Login = require('customElement').create();

    /**
     * 初始化
     */
    Login.prototype.init = function () {
        /**
         * 用户信息
         *
         * @type {Object}
         */
        this.userinfo = null;

        /**
         * 默认为未登录
         *
         * @type {boolean}
         */
        this.isLogin = false;

        /**
         * 用户配置数据
         *
         * @type {Object}
         */
        this.config = this.element.dataset;

        // 检查配置数据
        this.checkConfig();

        // 绑定事件
        this.addEventAction('login', this.login.bind(this));
        this.addEventAction('logout', this.logout.bind(this));
    };

    /**
     * 开始处理页面数据
     */
    Login.prototype.build = function () {
        var self = this;
        if (self.config.autologin) {
            return this.getUserinfo().then(function () {
                if (!self.isLogin) {
                    self.login();
                }
            });
        }
        this.render();
        this.getUserinfo();
    };

    /**
     * 判断是否为 iframe 框架内打开
     *
     * @return {boolean}
     */
    Login.prototype.isIframe = function () {
        return viewer.isIframed;
    };

    /**
     * 用户退出
     */
    Login.prototype.logout = function () {
        var self = this;

        if (!self.isLogin) {
            return;
        }

        util.post(self.config.endpoint, {
            type: 'logout'
        }).then(function (res) {
            // 清空 sessionId
            util.store.remove(self.config.endpoint);

            if (res.data && res.data.url) {
                if (self.isIframe()) {
                    viewer.sendMessage('loadiframe', {
                        title: res.data.title || '',
                        click: '',
                        url: res.data.url
                    });
                }
                else {
                    location.assign(res.data.url);
                }
            }
            else {
                self.loginHandle('logout', false);
            }
        }).catch(function (data) {
            // 清空 sessionId
            util.store.remove(self.config.endpoint);

            self.loginHandle('logout', false);
        });
    };

    /**
     * 登录统一处理
     *
     * @param  {string}  name    事件名称
     * @param  {boolean} isLogin 是否登录
     * @param  {Object|undefined}  data    用户数据
     */
    Login.prototype.loginHandle = function (name, isLogin, data) {
        var self = this;

        self.isLogin = isLogin;
        self.userinfo = data || null;
        self.trigger(name);
        self.render();
    };

    /**
     * 用户登录
     *
     * @return {undefined}
     */
    Login.prototype.login = function () {
        var self = this;

        // 如果已经登录
        if (self.isLogin) {
            return;
        }

        // 如果是 iframe + 支持 ls + 非 QQ 浏览器时使用结果页接口
        // 目前大多设备的隐身模式不支持 ls
        var toSF = true;
        if (!self.isIframe()) {
            toSF = false;
        }
        else if (!util.store.support) {
            toSF = false;
        }
        else if (platform.isIos() && platform.isQQ()) {
            toSF = false;
        }
        if (toSF) {
            return viewer.sendMessage('login-xzh', {
                state: Date.now() + '',
                clientId: self.config.clientId
            });
        }

        // 否则跳转链接
        var sourceUrl = util.getSourceUrl();
        window.top.location.href = util.getOauthUrl({
            'client_id': self.config.clientId,
            'state': encodeURIComponent(JSON.stringify({
                url: sourceUrl
            })),
            'redirect_uri': encodeURIComponent(sourceUrl)
        });
    };

    /**
     * 触发事件
     *
     * @param  {string} name  事件名称
     * @param  {Object} event 事件对象
     */
    Login.prototype.trigger = function (name) {
        var event = {
            userinfo: this.userinfo
        };
        viewer.eventAction.execute(name, this.element, event);
    };

    /**
     * 输出错误信息到控制台
     *
     * @param {string} text 输出文本
     */
    Login.prototype.error = function (text) {
        console.error('[mip-login-xzh] ', text, this.element);
    };

    /**
     * 渲染组件内的模板内容
     */
    Login.prototype.render = function () {
        var self = this;
        var data = self.userinfo || {};
        var elements = self.element.querySelectorAll('template[type="mip-mustache"]');

        [].slice.call(elements).forEach(function (el) {
            var html = mustache.render(el.innerHTML, data).trim();
            self.getElementByTemplat(el).innerHTML = html;
        });
    };

    /**
     * 使用 template 元素获取对应缓存元素
     *
     * @param  {HTMLElement} el 模板元素
     * @return {HTMLElement}
     */
    Login.prototype.getElementByTemplat = function (el) {
        if (el.dataset.id && el.nextElementSibling && el.nextElementSibling.id === el.dataset.id) {
            return el.nextElementSibling;
        }

        var id = 'mustache-id-' + Date.now();
        var node = document.createElement('div');
        var parent = el.parentNode;

        // 设置变量
        node.id = id;
        el.setAttribute('data-id', id);

        if (parent.lastChild === el) {
            parent.appendChild(node);
        }
        else {
            parent.insertBefore(node, el.nextSibling);
        }

        return node;
    };

    /**
     * 获取用户信息
     */
    Login.prototype.getUserinfo = function () {
        var self = this;
        var data = {
            type: 'check'
        };
        var code;
        var callbackurl;

        // 处理登录回调
        if (self.isIframe()) {
            code = decodeURIComponent(hash.get('code') || '');
        }
        else {
            code = util.getQuery('code');
        }
        if (code) {
            if (self.isIframe()) {
                callbackurl = decodeURIComponent(hash.get('redirect_uri') || '');
            }
            else {
                try {
                    callbackurl = JSON.parse(util.getQuery('state')).url;
                }
                catch (e) {}
            }
        }
        if (code && callbackurl) {
            data.code = code;
            data.redirect_uri = callbackurl;
            data.type = 'login';
        }

        return util.post(self.config.endpoint, data).then(function (res) {
            // 记录 sessionId 到 ls 中，修复在 iOS 高版本下跨域 CORS 透传 cookie 失效问题
            if (res.sessionId) {
                util.store.set(self.config.endpoint, res.sessionId);
            }

            if (data.type === 'login') {
                if (res.status === 0 && res.data) {
                    self.loginHandle('login', true, res.data);
                }
                else {
                    throw new Error('登录失败', res);
                }
            }
            else if (res.status === 0 && res.data) {
                self.loginHandle('login', true, res.data);
            }
        }).catch(function (err) {
            if (data.type === 'login') {
                self.loginHandle('error', false);
                throw err;
            }
        });
    };

    /**
     * 检查配置
     */
    Login.prototype.checkConfig = function () {
        var config = this.config;
        var hasError = false;

        if (!config.clientId) {
            this.error('组件必选属性名 data-client-id 为空');
            hasError = true;
        }
        if (!config.endpoint) {
            this.error('组件必选属性名 data-endpoint 为空');
            hasError = true;
        }
        else if (!/^(https:)?\/\//.test(config.endpoint)) {
            this.error('组件必选属性名 data-endpoint 必须以 https:// 或者 // 开头');
            hasError = true;
        }

        if (hasError) {
            throw new TypeError('[mip-login-xzh] 组件必选属性检查失败');
        }
    };

    return Login;
});
/* eslint-enable fecs-camelcase */
