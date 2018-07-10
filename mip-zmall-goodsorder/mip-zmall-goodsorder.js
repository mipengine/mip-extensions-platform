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
        self.mipDialogComponent.customElement.confirm(text, {
            okCallback: function () {
                if (options.type === 'cansel') {
                    var reasons = self.params.canselOrderReason || [];
                    createCanselOrderReasonLayer(self.mipDialogComponent, reasons, function (result) {
                        if (result[0] && result[0].value) {
                            url += '&reasonId=' + result[0].value;
                        }
                        if (result[0] && result[0].content && result[0].content.trim() !== '') {
                            url += '&content=' + decodeURIComponent(result[0].content);
                        }
                        fetch(url, orderId, self.mipDialogComponent, self.element, targetElement, toastTip);
                    });
                }
                else {
                    fetch(url, orderId, self.mipDialogComponent, self.element, targetElement, toastTip);
                }
            }
        });
    }

    function fetch(url, orderId, dialogElement, element, targetElement, toastTip) {
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
                dialogElement.customElement.toast(toastTip);
            }, 301);
        });
    }

    function refundOrder(options) {
        var self = this;
        var text = '退换货请拨打客服电话<br>' + options.tel;
        self.mipDialogComponent.customElement.confirm(text, {
            okCallback: function () {
                window.top.location.href = 'tel:' + options.tel;
            }
        });
    }

    function createCanselOrderReasonLayer(dialogElement, reasons, callback) {
        var reasonsArr = reasons;
        var length = reasonsArr.length;
        reasonsArr.forEach(function (item, index) {
            if (!index) {
                item.checked = 1;
            }
        });
        reasonsArr[length - 1] = {value: 0, name: '其他原因', custom: 1};
        setTimeout(function () {
            dialogElement.customElement.selector({
                title: '取消订单原因',
                buttonText: '确定',
                type: 'radio',
                list: reasonsArr,
                callback: function (res) {
                    callback(res);
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
        // 因为该组件内部有一个DOM绑定了点击事件，而且需要传个回调函数
        // 在需要某条件下触发 mip-zol-dialog 对外暴露的方法
        // 所以暂时不能用 on="组件ID.方法" 的方式来做
        // 故而在这里用 document.querySelector 来获取 mip-zol-dialog 这个组件
        // 通过它的 .customElement 来获取方法
        var mipDialogComponent = document.querySelector('mip-zol-dialog');
        self.mipDialogComponent = mipDialogComponent;

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
