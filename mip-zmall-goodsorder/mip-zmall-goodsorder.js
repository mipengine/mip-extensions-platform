/**
 * @file mip-zmall-goodsorder 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var viewer = require('viewer');
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');

    function orderHandle(options) {
        var self = this;
        var targetElement = options.element;
        var orderId = targetElement.dataset.id;
        var orderStatus = targetElement.dataset.type;
        var merchantId = targetElement.dataset.merchantid;
        var text = '';
        var toastTip = '';
        var url = self.ajaxUrl + '&orderId=' + orderId + '&orderStatus=' + orderStatus + '&merchantId=' + merchantId;
        var sessionId = self.element.sessionId;
        if (sessionId && sessionId !== '') {
            url += '&sessionId=' + sessionId;
        }
        if (options.type === 'cansel') {
            text = '确定取消订单？';
            toastTip = '订单取消成功';
        }
        if (options.type === 'delete') {
            text = '确定删除订单？';
            toastTip = '订单删除成功';
        }
        if (options.type === 'receive') {
            text = '卖家将收到您的货款，是否确认收货？';
            toastTip = '您已确认收货';
        }
        viewer.eventAction.execute('confirm', self.element, {
            msg: text,
            options: {
                okCallback: function () {
                    if (options.type === 'cansel') {
                        var reasons = self.params.canselOrderReason || [];
                        createCanselOrderReasonLayer(reasons, self.element, function (result) {
                            if (result[0] && result[0].value) {
                                url += '&reasonId=' + result[0].value;
                            }
                            if (result[0] && result[0].content && result[0].content.trim() !== '') {
                                url += '&content=' + decodeURIComponent(result[0].content);
                            }
                            fetchApi(url, orderId, self.element, targetElement, toastTip);
                        });
                    }
                    else {
                        fetchApi(url, orderId, self.element, targetElement, toastTip);
                    }
                }
            }
        });
    }

    function fetchApi(url, orderId, element, targetElement, toastTip) {
        fetchJsonp(url, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            if (!res.status) {
                viewer.eventAction.execute('success', element, {
                    itemRole: ['order_' + orderId, 'order_status_' + orderId, 'order_buttons_' + orderId],
                    targetElement: targetElement
                });
            }
            else {
                toastTip = res.msg;
            }
            setTimeout(function () {
                viewer.eventAction.execute('toast', element, {
                    msg: toastTip
                });
            }, 301);
            // 如果是删除 回到列表页
            var type = targetElement.dataset.type;
            var pageType = targetElement.dataset.page;
            if (type && type === '-1' && pageType === 'detail') {
                setTimeout(function () {
                    window.history.go(-1);
                }, 1500);
            }
        });
    }

    function refundOrder(options) {
        var text = '退换货请拨打客服电话<br>' + options.tel;
        viewer.eventAction.execute('confirm', this.element, {
            msg: text,
            options: {
                okCallback: function () {
                    window.top.location.href = 'tel:' + options.tel;
                }
            }
        });
    }

    function createCanselOrderReasonLayer(reasons, element, callback) {
        var reasonsArr = reasons;
        var length = reasonsArr.length;
        reasonsArr.forEach(function (item, index) {
            if (!index) {
                item.checked = 1;
            }
        });
        reasonsArr[length - 1] = {value: 0, name: '其他原因', custom: 1};
        setTimeout(function () {
            viewer.eventAction.execute('selector', element, {
                options: {
                    title: '取消订单原因',
                    buttonText: '确定',
                    type: 'radio',
                    list: reasonsArr,
                    callback: function (res) {
                        callback(res);
                    }
                }
            });
        }, 301);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var self = this;
        var element = this.element;

        var ajaxUrl = element.dataset.ajaxUrl;
        self.ajaxUrl = ajaxUrl;

        // 获取用户设置参数
        self.params = {};
        try {
            var script = element.querySelector('script[type="application/json"]');
            if (script) {
                var customParams = JSON.parse(script.textContent.toString());
                self.params = util.fn.extend(self.params, customParams);
            }

        }
        catch (e) {
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
        }

        var needLoginAttr = element.getAttribute('isNeedLogin');
        var isNeedLogin = needLoginAttr !== null && needLoginAttr !== '0' && needLoginAttr !== 'false';
        element.isNeedLogin = isNeedLogin;

        // 登录
        if (isNeedLogin) {
            self.addEventAction('setsessionid', function (event) {
                element.sessionId = event.sessionId ? event.sessionId : 0;
            });
        }
        // 订单支付
        self.addEventAction('pay', function (e) {
            e.preventDefault();
            var payUrl = e.target.getAttribute('href');
            if (payUrl && payUrl !== '') {
                payUrl = payUrl + '&sessionId=' + element.sessionId;
            }
            window.location.href = payUrl;
        });
        // 取消订单
        self.addEventAction('cansel', function (e) {
            orderHandle.call(self, {
                type: 'cansel',
                element: e.target
            });
        });
        // 删除订单
        self.addEventAction('delete', function (e) {
            orderHandle.call(self, {
                type: 'delete',
                element: e.target
            });
        });
        // 确认收货
        self.addEventAction('receive', function (e) {
            orderHandle.call(self, {
                type: 'receive',
                element: e.target
            });
        });
        // 退货
        self.addEventAction('refund', function (e) {
            var targetElm = e.target;
            var tel = targetElm.dataset.tel;
            refundOrder.call(self, {
                tel: tel
            });
        });

        // 改变状态
        self.addEventAction('changeStatus', function (e) {
            var clickElement = e.targetElement;
            var type = clickElement.dataset.type;
            var roleElement = e.roleElement;
            if (type === '6') {
                [].forEach.call(roleElement, function (item) {
                    var classList = item.classList;
                    if (classList.contains('order-status') || classList.contains('order-detail-status')) {
                        item.innerText = '交易关闭';
                    }
                    else if (classList.contains('order-buttons')) {
                        item.style.display = 'none';
                    }
                });
            }
            else if (type === '5') {
                [].forEach.call(roleElement, function (item) {
                    var classList = item.classList;
                    if (classList.contains('order-status') || classList.contains('order-detail-status')) {
                        item.innerText = '交易完成';
                    }
                });
                clickElement.style.display = 'none';
            }
            else if (type === '-1') {
                [].forEach.call(roleElement, function (item) {
                    var classList = item.classList;
                    if (classList.contains('order-item')) {
                        classList.add('removing');
                        setTimeout(function () {
                            item.parentNode.removeChild(item);
                        }, 301);
                    }
                });
                clickElement.innerText = '已删除';
                clickElement.disabled = 'disabled';
            }
        });
    };

    return customElement;
});
