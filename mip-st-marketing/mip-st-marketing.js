/**
 * @file mip-st-marketing 组件
 * @author maomingyang@baidu.com
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var viewer = require('viewer');
    var templates = require('templates');
    var customElement = require('customElement').create();
    var Gesture = util.Gesture;

    // 自定义工具类
    var cusUtil = require('./util');
    // 常量合集
    var cusConst = require('./const');
    // 组件模版
    var elementTemplate = require('./tpl');
    // 控制立即按钮点击，由于存在登录后的同步刷新，所以未做到UI层
    var getCouponLock = false;

    /**
     * 是否在SF中
     *
     * @return {boolean} 是否在SF中
     */
    function isInSF() {
        return viewer.isIframed;
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = this.element;

        // 组件参数
        this.xzhId = element.getAttribute('xzh-id');
        if (!this.xzhId) {
            throw new Error(cusConst.XZH_ID_PARAMS_ERR);
        }

        // 创建辅助组件
        this.toast = new cusUtil.Toast();
        this.store = new cusUtil.Store();

        // 初始化组件状态
        this.elementShowStatus = false;

        // 仅在SF下展示
        if (isInSF()) {
            this.getTickets().then(function (res) {
                if (res.data && res.data.length > 0) {
                    // 渲染组件
                    self.render(res).then(function () {
                        // 初始展示样式
                        element.style.top = -self.elementHeight + 'px';
                        // 点击事件
                        var gesture = new Gesture(element);
                        gesture.on('tap', self.handleElementTap.bind(self));
                        // 注册接收SF的显示&隐藏的通知
                        window.addEventListener('message', self.handleMsgFromSF.bind(self));
                        // ls中获取是否曾访问以及上次调起登录的时间戳
                        var loginTimestamp = self.store.get('loginTimestamp');
                        // 判断调起登录动作是否应该延续
                        self.isAfterLogin = loginTimestamp
                            && (new Date().getTime() - loginTimestamp < cusConst.TIME_INTERVAL);
                        // 通知SF展示营销入口
                        self.notifySFShow();
                    });

                    self.addEventAction('toggle', function () {
                        self.toggle();
                    });
                }
            });
        }
    };

    /**
     * 获取&校验&预处理券列表数据
     *
     * @return {Promise} 获取券数据的promise
     */
    customElement.prototype.getTickets = function () {
        var self = this;
        var reqUrl = cusConst.TICKET_LIST + '?xzhid=' + this.xzhId;

        return fetch(reqUrl, {credentials: 'include'}).then(function (resp) {
            return resp.text();
        }).then(function (res) {
            try {
                res = JSON.parse(res);
            }
            catch (e) {
                throw new Error(cusConst.TICKETS_PARSE_ERR);
            }

            if (!res.code) {
                if (res.data && res.data.length > 0) {
                    self.proccessData(res);
                }
                return res;
            }

            throw new Error(cusConst.TICKETS_GET_ERR + res.msg);
        }).catch(function (err) {
            throw err;
        });
    };

    /**
     * 领取优惠券
     *
     * @param  {string} activityId 活动id
     * @return {Promise}           领取券的promise
     */
    customElement.prototype.getCoupon = function (activityId) {
        if (getCouponLock) {
            return;
        }
        getCouponLock = true;

        var self = this;
        var reqUrl = cusConst.GET_COUPON + '?xzhid=' + this.xzhId + '&activity_id=' + activityId;

        return fetch(reqUrl, {credentials: 'include'}).then(function (resp) {
            return resp.text();
        }).then(function (res) {
            getCouponLock = false;

            try {
                res = JSON.parse(res);
            }
            catch (e) {
                throw new Error(cusConst.COUPON_PARSE_ERR);
            }

            if (!res.code && res.data) {
                return res.data;
            }

            if (res.code === cusConst.NO_LOGIN_CODE) {
                // 记录领取的券id
                self.store.set('activityId', activityId);
                self.notifySFLogin();
                return;
            }

            if (res.code === cusConst.TICKETS_DONE_CODE) {
                self.updateStatusByActivityId(activityId, cusConst.CAN_NOT_RECEIVE);
                self.toast.show(cusConst.TICKETS_DONE_MSG);
                return;
            }

            throw new Error(cusConst.COUPON_GET_ERR + res.msg);
        }).catch(function (err) {
            getCouponLock = false;
            throw err;
        });
    };

    /**
     * 打点方法
     *
     * @param  {string} action 动作
     * @param  {Object} ext    扩展参数
     */
    customElement.prototype.log = function (action, ext) {
        // 日志
        var params = {
            action: action,
            url: location.href,
            xzhid: this.xzhId,
            ext: JSON.stringify(ext)
        };

        var paramsString = Object.keys(params).reduce(function (res, value) {
            if (!params[value]) {
                return res;
            }
            return res + '&' + value + '=' + encodeURIComponent(params[value]);
        }, '');

        var img = new Image();
        img.src = cusConst.LOG_URL + paramsString;
    };

    /**
     * 预处理券列表数据
     *
     * @param  {Object} res 券列表数据
     */
    customElement.prototype.proccessData = function (res) {
        res.data.forEach(function (item) {
            // 格式化券面额
            item.activityValue /= 100;
            // 券状态
            if (item.isJoin === 1 && !item.receiveLimit) {
                item.showStatus = cusConst.CAN_RECEIVE;
            }
            else if (item.hasReceive) {
                item.showStatus = cusConst.CAN_CHECK;
            }
            else {
                item.showStatus = cusConst.CAN_NOT_RECEIVE;
            }
        });

        // 记录券列表数据，用于自动领券时获取券状态
        this.tickets = res.data;
    };

    /**
     * 渲染优惠券列表
     *
     * @param  {Object} res 券列表数据
     * @return {Promise}    渲染券列表的promise
     */
    customElement.prototype.render = function (res) {
        var self = this;
        var element = this.element;
        // 为组件填充模版
        element.innerHTML = elementTemplate;

        return templates.render(element, res).then(function (html) {
            element.innerHTML = html;
            self.elementHeight = element.offsetHeight;
        });
    };

    /**
     * 控制券列表的显示与隐藏
     *
     * @param {boolean} notNeedAnima  不需要过渡动画
     */
    customElement.prototype.toggle = function (notNeedAnima) {
        var element = this.element;

        if (this.elementShowStatus) {
            element.style.transition = notNeedAnima ? '' : 'top 0.3s cubic-bezier(.42,0,.52,1) 0s';
            element.style.top = -this.elementHeight + 'px';
            element.style.bottom = '';
        }
        else {
            element.style.transition = notNeedAnima ? '' : 'top 0.3s cubic-bezier(0,0,.3,1) 0s';
            element.style.top = '0px';
            element.style.clip = 'auto';

            if (this.elementHeight > window.innerHeight) {
                element.style.bottom = '0px';
            }
        }

        this.elementShowStatus = !this.elementShowStatus;
    };

    /**
     * 向SF bar发送信息
     *
     * @param  {Object} data 发送的数据
     */
    customElement.prototype.sendMsgToSF = function (data) {
        viewer.sendMessage('cambrian-marketing', data);
    };

    /**
     * 通知SF显示营销入口
     */
    customElement.prototype.notifySFShow = function () {
        // autoShow 是否自动通知mip营销组件展示 isNeedShark 是否需要摇一摇动画
        this.sendMsgToSF({
            type: 'show',
            data: {
                autoShow: this.isAfterLogin,
                isNeedShark: !this.isAfterLogin
            }
        });
    };

    /**
     * 通知SF登录
     */
    customElement.prototype.notifySFLogin = function () {
        // 记录时间戳
        this.store.set('loginTimestamp', new Date().getTime());
        this.sendMsgToSF({
            type: 'login'
        });
    };

    /**
     * 通知SF跳转至手百券中心
     */
    customElement.prototype.notifySFToCoupons = function () {
        this.sendMsgToSF({
            type: 'coupons'
        });
    };

    /**
     * 跳转至另一mip页
     *
     * @param  {string} title mip页的标题
     * @param  {string} url   mip页Url
     */
    customElement.prototype.redirectToMip = function (title, url) {
        viewer.sendMessage('loadiframe', {
            url: url,
            title: title
        });
    };

    /**
     * 依据activityId获取券的索引
     *
     * @param  {string} activityId 券的activityId
     * @param  {Object} status     券的状态
     */
    customElement.prototype.updateStatusByActivityId = function (activityId, status) {
        var index = -1;
        for (var i = 0, l = this.tickets.length; i < l; i++) {
            if (this.tickets[i].activityId === activityId) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            var ticketCon = this.element.querySelectorAll('.ticket-container')[index];
            var ticketBtn = ticketCon.querySelector('.ticket-btn');
            // 修改类名
            $(ticketBtn).attr('class', '');
            $(ticketBtn).addClass('ticket-btn').addClass(status.className);
            // 修改code
            $(ticketBtn).data('code', status.code);
            // 修改Text
            $(ticketBtn).text(status.text);
        }
    };

    /**
     * 登录后的处理
     *
     * @param {boolean} isSilent 是否以静默的方式进行登录后的处理
     */
    customElement.prototype.afterLogin = function (isSilent) {
        var self = this;
        // 清除登录标志位
        this.store.remove('loginTimestamp');
        this.isAfterLogin = false;

        if (this.isLogin) {
            // 自动触发领券流程
            var id = +this.store.get('activityId');
            // check登录后的券状态
            var coupon = this.tickets.filter(function (item) {
                if (item.activityId === id) {
                    return true;
                }
                return false;
            });
            var code = coupon[0].showStatus.code;
            // 可领取
            if (code === cusConst.CAN_RECEIVE_CODE) {
                this.getCoupon(id).then(function (res) {
                    self.log('marketing_receive_succ', {isAfterLogin: true});
                    self.updateStatusByActivityId(id, cusConst.CAN_CHECK);
                    self.toast.show(cusConst.RECEIVE_OK_MSG, function () {
                        var succUrl = cusConst.COUPON_SUCC_MIP + '?xzhid=' + self.xzhId + '&asset_id=' + res.assetId;
                        self.redirectToMip(cusConst.COUPON_SUCC_MIP_TITLE, succUrl);
                    });
                });
            }
            // 去查看
            else if (code === cusConst.CAN_CHECK_CODE) {
                this.toast.show(cusConst.ALREADY_RECEIVE_MSG);
            }
            // 已领完
            else if (code === cusConst.CAN_NOT_RECEIVE_CODE) {
                this.toast.show(cusConst.TICKETS_DONE_MSG);
            }
        }
        else if (!isSilent) {
            this.toast.show(cusConst.LOGIN_ERR);
        }
    };

    /**
     * 处理券列表的点击事件
     *
     * @param  {Event} event 点击事件
     */
    customElement.prototype.handleElementTap = function (event) {
        var self = this;
        var target = $(event.target);

        if (target.hasClass('ticket-btn')) {
            var id = target.data('id');
            var code = target.data('code');

            // 立即领取
            if (code === cusConst.CAN_RECEIVE_CODE) {
                // 点击打点
                this.log('marketing_receive_click');
                if (this.isLogin) {
                    this.getCoupon(id).then(function (res) {
                        self.log('marketing_receive_succ');
                        self.updateStatusByActivityId(id, cusConst.CAN_CHECK);
                        self.toast.show(cusConst.RECEIVE_OK_MSG, function () {
                            var succUrl = cusConst.COUPON_SUCC_MIP
                                + '?xzhid=' + self.xzhId
                                + '&asset_id=' + res.assetId;
                            self.redirectToMip(cusConst.COUPON_SUCC_MIP_TITLE, succUrl);
                        });
                    });
                }
                else {
                    // 记录领取的券activityId
                    this.store.set('activityId', id);
                    this.notifySFLogin();
                }
            }
            // 去查看
            else if (code === cusConst.CAN_CHECK_CODE) {
                // 点击打点
                this.log('marketing_check_click');
                this.notifySFToCoupons();
            }
        }
    };

    /**
     * 处理SF bar传入的message
     *
     * @param  {Event} event message事件对象
     */
    customElement.prototype.handleMsgFromSF = function (event) {
        var self = this;
        var eventData = event.data || {};
        var type = eventData.event;
        var data = eventData.data || {};

        if (type !== 'mip-cambrian-marketing') {
            return;
        }

        // SF通知mip组件显示&隐藏
        if (data.type === 'toggle') {
            this.isLogin = data.login;

            this.toggle(this.isAfterLogin);
            // 登录后
            if (this.isAfterLogin) {
                this.afterLogin();
            }
        }
        // SF通知显示错误
        else if (data.type === 'error') {
            this.toast.show(data.errMsg);

            if (data.errType === 'login') {
                this.afterLogin(true);
            }
        }
        // 手百下异步登录后刷新
        else if (data.type === 'asyncRelaod') {
            this.isLogin = true;

            this.getTickets().then(function (res) {
                if (res.data && res.data.length > 0) {
                    // 渲染组件
                    self.render(res).then(function () {
                        self.afterLogin();
                    });
                }
            });
        }
    };

    return customElement;
});
