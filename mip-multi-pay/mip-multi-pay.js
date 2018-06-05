/**
 * @file MIP 支付组件
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var platform = require('util').platform;
    var Pay = require('customElement').create();
    var fn = require('util').fn;
    var viewer = require('viewer');
    var util = require('./util');
    var mustache = require('mip-mustache/mustache');
    var weixinReg = /\bmicromessenger\/([\d.]+)/i;
    var redirectPay = 'redirectPay';
    var cachePrefix = new RegExp(
        '^(https?\\:)?//'
        + '(mipcache\\.bdstatic\\.com|'
        + '[^.]+\\.mipcdn.com)'
    );

    var MIP = window.MIP || {};

    function decodeCacheUrl(url) {
        if (!url) {
            return '';
        }

        if (!cachePrefix.exec(url)) {
            return url;
        }
        return url
            .replace(cachePrefix, '')
            .replace(/^\/c\/s\//, 'https://')
            .replace(/^\/c\//, 'http://');
    }

    function getWechatVer() {
        var result = 0;
        var weiMatch = navigator.userAgent.match(weixinReg);
        if (weiMatch && weiMatch[1]) {
            result = +weiMatch[1].replace(/([\d+]\.[\d+])(\.)([\d+])/, '$1$3');
        }

        return result;
    }

    // 微信环境、safari下进行跳出sf
    if ((platform.isWechatApp() || platform.isSafari()) && util.isIframe()) {
        console.log(decodeCacheUrl(window.location.href));
        var reflushUrl = window.location.origin
        + window.location.pathname + '?'
        + window.location.search.replace('?', '')
        + '&_r=' + new Date().getTime() + window.location.hash;
        window.top.location.replace(decodeCacheUrl(reflushUrl));
    }

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
         * @type {Object} { payInfos:[{ endpoint: string, id:string type?: nomal|weixin|alipay,  }] }
         */
        self.data = {
            payInfos: [],
            sendData: {},
            isWechat: false,
            error: '',
            errorTime: 2000
        };

        /**
         * 用户配置数据
         *
         * @type {Object}
         */
        // self.config = self.element.dataset;

        // 检查配置数据
        // self.checkConfig();

        // 初始化组件内 <script type="application/json"> 配置合并到 this.data 中
        self.initJSON();

        this.checkPayInfos();

        // 注入设置会话标识接口
        self.addEventAction('setSessionId', function (event) {
            self.sessionId = event.sessionId;
        });

        // 注入追加数据接口
        self.addEventAction('addPostData', function (event) {
            self.addPostData(event.data);
        });

        // 注入支付接口
        self.addEventAction('pay', self.pay.bind(this));
        // 绑定事件
        self.addEventAction('setPayId', this.setPayId.bind(this));
        // self.addEventAction('logout', this.logout.bind(this));

        // 添加MPay global action
        viewer.eventAction.addGlobalTarget('MPay', function (action) {
            if (!action) {
                return;
            }
            switch (action.handler) {
                case 'addPostData':
                    if (typeof action.arg === 'string') {
                        action.arg = (new Function('DOM', 'return ' + action.arg))({});
                    }

                    self.addPostData(action.arg);
                    break;
                case 'setPayId':
                    self.setPayId(action.arg);
                    break;
            }
        });

    };

    Pay.prototype.addPostData = function (data) {
        fn.extend(true, this.data.sendData, data || {});
    };

    Pay.prototype.firstInviewCallback = function () {
        this.render();
        var self = this;
        if (MIP.hash.get('redirectPay')) {
            setTimeout(function () {
                self.trigger('payConfirm', {
                    payType: MIP.hash.get(redirectPay)
                });
            }, 0);
        }

    };

    /**
     * 渲染组件内的模板内容
     */
    Pay.prototype.render = function () {
        var self = this;
        var data = this.data;
        data.isWechat = getWechatVer() > 5.0;

        var elements = self.element.querySelectorAll('template[type="mip-mustache"]');

        [].slice.call(elements).forEach(function (el) {
            var html = mustache.render(el.innerHTML, data).trim();
            self.getElementByTemplate(el).innerHTML = html;
        });
    };

    /**
     * 使用 template 元素获取对应缓存元素
     *
     * @param  {HTMLElement} el 模板元素
     * @return {HTMLElement}
     */
    Pay.prototype.getElementByTemplate = function (el) {
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
        } else {
            parent.insertBefore(node, el.nextSibling);
        }

        return node;
    };

    Pay.prototype.setPayId = function (payId) {
        if (!payId || typeof payId !== 'string') {
            return;
        }

        this.data.payInfos.forEach(function (payInfo, idx) {
            if (payInfo.id === payId) {
                payInfo.selected = true;
            }
            else {
                payInfo.selected = false;
            }
        });
        this.render();
    };

    Pay.prototype.setError = function (error, clear) {
        var self = this;
        if (this.data.error === error) {
            return;
        }

        this.data.error = error;
        this.render();
        clearTimeout(this.timer);
        this.timer = !clear && setTimeout(function () {
            self.setError('');
        }, this.errorTime);
    };

    /**
     * 支付
     */
    Pay.prototype.pay = function () {
        var self = this;

        self.trigger('ajaxBefore');
        var payInfo;
        this.data.payInfos.some(function (pay) {
            return payInfo = pay.selected && pay;
        });
        util.post(payInfo.endpoint, fn.extend({}, self.data.sendData, {
            sessionId: self.sessionId,
            state: JSON.stringify({
                r: Date.now(),
                url: location.href
            })
        })).then(function (res) {
            self.trigger('ajaxComplete');
            if (res.status === 0 && res.data) {
                if (payInfo.type === 'weixin') {
                    self.wexinPay(res.data);
                }
                else {
                    self.redirect(res.data);
                }
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
     * @param  {Object} data 付款信息
     *
     * @return {Object}
     */
    Pay.prototype.redirect = function (data) {
        var toSF = true;
        var url = data.url;
        // 非 SF
        if (!util.isIframe()) {
            toSF = false;
        }
        // iOS 的手百降级
        else if (platform.isIos() && platform.isBaiduApp()) {
            toSF = false;
        }

        if (toSF) {
            return viewer.sendMessage('simple-pay', {
                url: url
            });
        }

        window.top.location.href = url;
    };

    /**
     * 微信跳转支付逻辑
     *
     * @param  {string} data 付款信息
     *
     * @return {Object}
     */
    Pay.prototype.wexinPay = function (data) {
        // weixin
        var prepayInfo = data;
        var self = this;

        if (getWechatVer() < 5.0) {
            data.url = data.url + '&redirect_url=' + encodeURIComponent(this.getWeiXinRedirectUrl());
            return this.redirect(data);
        }

        var invokeConfig = {
            'appId': prepayInfo.appId, // 公众号名称，由商户传入
            'timeStamp': prepayInfo.timeStamp, // 时间戳，自1970年以来的秒数;
            'nonceStr': prepayInfo.nonceStr, // 随机串
            'package': prepayInfo.package,
            'signType': prepayInfo.signType, // 微信签名方式
            'paySign': prepayInfo.paySign // 微信签名
        };

        function onBridgeReady() {
            // self.trigger('payConfirm', {payType: 'weixin' });
            window.WeixinJSBridge.invoke(
                'getBrandWCPayRequest', invokeConfig, function (res) {
                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                        self.trigger('paySuccess');
                    }
                    else {
                        self.trigger('payFail');
                    }
                }
            );
        }
        if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }
            else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }
        else {
            onBridgeReady();
        }
    };

    Pay.prototype.getWeiXinRedirectUrl = function () {
        if (this.data.redirectUrl) {
            return this.data.redirectUrl;
        }

        return this.locationAddHash(redirectPay, 'weixin');
    };

    Pay.prototype.locationAddHash = function (key, value) {
        var result = [''];
        var location = window.location;
        var hashTree = MIP.hash.hashTree;
        Object.keys(hashTree).forEach(function (haskey) {
            // if( MIP.hashTree[haskey] )
            key !== haskey && hashTree[haskey] && result.push(haskey + '=' + hashTree[haskey].value);
        });
        result.push('&' + key + '=' + value);
        return location.protocol + '//' + location.host + location.pathname + location.search + '#' + result.join('&');
    };

    /**
     * 触发事件
     *
     * @param  {string} name  事件名称
     * @param  {Object} eventdata 事件对象
     */
    Pay.prototype.trigger = function (name, eventdata) {
        var event = {
            sessionId: this.sessionId,
            data: this.data.sendData
        };
        viewer.eventAction.execute(name, this.element, eventdata || event);
    };

    /**
     * 输出错误信息到控制台
     *
     * @param {string} text 输出文本
     */
    Pay.prototype.error = function (text) {
        console.error('[mip-multi-pay] ', text, this.element);
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
    Pay.prototype.checkPayInfos = function () {
        var payInfos = this.data.payInfos;
        var verifyFiled = ['endpoint', 'id'];
        if (!payInfos || !payInfos.length) {
            this.error('请在 application/json 中 填写 支付信息 payInfos');
        }
        var selected = false;
        var verResult = payInfos.every(function (payInfo) {
            selected = selected || payInfo.selected;
            return verifyFiled.every(function (verf) {
                if (!payInfo[verf]) {
                    this.error('payInfos 中缺少 ' + verf + ' 信息');
                    return false;
                }
                return true;
            });
        });
        if (!verResult) {
            return;
        }

        if (!selected) {
            payInfos[0].selected = true;
        }

        // 微信环境下屏蔽支付宝
        if (getWechatVer() > 5.0) {
            this.data.payInfos = payInfos.filter(function (payinfo) {
                return payinfo.type !== 'alipay';
            });
        } else {
            this.data.payInfos = payInfos;
        }

    };

    return Pay;
});
