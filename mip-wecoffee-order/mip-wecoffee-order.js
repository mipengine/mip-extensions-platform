/**
 * @file mip-wecoffee-order 组件
 * @author
 */

/* globals MIP, m */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var viewer = require('viewer');
    var key = 'wecoffee_store';
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    customElement.prototype.build = function () {
        const self = this;
        self.$element = $(self.element);
        self.addEventAction('login', function (event) {
            self.sessionId = event.sessionId;
            MIP.setData({
                sessionId: event.sessionId
            });
            self.onLoggedIn();
        });
        // self.onLoggedIn();
        self.addEventAction('triggerSubmit', function (event) {
            self.onFormSubmit();
        });
        self.addEventAction('error', self.onError.bind(self), {});
        self.addressUrl = self.$element.data('address-endpoint');
        self.orderUrl = self.$element.data('order-endpoint');
        self.$form = $('<form>');
        self.$form.on('submit', function (e) {
            e.preventDefault();
            self.onFormSubmit();
        });
        self.$form.on('change', '.com-switch', function (e) {
            self.$form.find('.citem-address').toggle(!e.target.checked);
        });
    };
    customElement.prototype.firstInviewCallback = function () {
        var items = storage.get(key) || '[]';
        var localStorageData = JSON.parse(items);
        var orderItems = [];
        localStorageData.forEach(function (item) {
            if (+item.amount) {
                var data = {};
                data.skuId = item.id;
                data.count = item.amount;
                data.spec = item.options;
                orderItems.push(data);
            }

        });
        this.orderItems = JSON.parse(JSON.stringify(orderItems));
        MIP.setData({
            orderItems: orderItems
        });
        $(this.element).find('mip-form').wrap(this.$form);
    };

    customElement.prototype.onFormSubmit = function () {
        var array = this.$form.serializeArray();
        var obj = {};
        for (var i = 0; i < array.length; i++) {
            var entry = array[i];
            obj[entry.name] = entry.value;
        }
        MIP.setData(obj);
        this.makeOrder();
    };

    customElement.prototype.makeOrder = function () {
        var self = this;
        viewer.eventAction.execute('loading', self.element, {});
        // console.log(m.orderItems);
        var defalutV = (+m.type === 2 ? '现场点单' : '');
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'post',
                url: self.orderUrl,
                data: JSON.stringify({
                    sessionId: m.sessionId,
                    address: {
                        address: m.address || defalutV,
                        phoneNumber: m.phoneNumber || defalutV,
                        name: m.name || defalutV
                    },
                    type: +m.type === 2 ? 2 : 1,
                    comment: m.comment,
                    items: self.orderItems
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: resolve,
                error: reject
            });
        })
            .then(function (data) {
                var orderId = data.data && data.data.orderId;
                if (!orderId) {
                    throw new Error('backend error');
                }

                viewer.eventAction.execute('setOrderId', self.element, {
                    data: {
                        orderId: orderId
                    }
                });
                viewer.eventAction.execute('submitOrder', self.element);

            })
            .catch(function (e) {
                self.onError(e);
                console.error(e);
                throw e;
            });
    };

    customElement.prototype.onLoggedIn = function () {
        var self = this;
        self.$element.show();
        self.updateAddress();
    };

    customElement.prototype.updateAddress = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'get',
                url: self.addressUrl,
                data: {
                    sessionId: self.sessionId
                },
                dataType: 'json',
                success: resolve,
                error: reject
            });
        }).then(function (data) {
            if (data.status !== 0) {
                throw new Error(data);
            }

            var address = data.data.addresses[0];
            if (!address) {
                return;
            }

            self.setInputData('address', address.lineOne);
            self.setInputData('phoneNumber', address.phoneNumber);
            self.setInputData('name', address.name);
            self.setInputData('type', address.type);
        })
            .catch(function (err) {
                self.onError(err);
                console.error(err);
            });
    };

    customElement.prototype.setInputData = function (name, value) {
        var el = this.$form.find('[name="' + name + '"]');
        if (!el.val()) {
            el.val(value);
        }

    };

    customElement.prototype.onError = function (err) {
        viewer.eventAction.execute('error', this.element, err);
        console.log(err);
    };

    return customElement;
});
