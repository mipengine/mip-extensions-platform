/**
 * @file mip-wecoffee-saveinfo 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var key = 'wecoffee_store';
    var MIP = window.MIP || {};
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    /**
     * 组件构建
     */
    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        me.totalinfo = [];
        setTimeout(function () {
            me.initData();
            var i = me.getTotal();
            MIP.setData({
                price: i.total || 0,
                goodscount: i.count || 0
            });
        }, 0);
        me.addEventAction('update', function (info) {
            if (info.itemid != null) {
                MIP.setData({
                    addingData: info
                });
            }

        });

        me.addEventAction('save', function (info) {
            var items = storage.get(key) || '[]';
            var tmp = JSON.parse(items);
            var goodsInfo = window.m.addingData;
            var count1 = me.getTotal();
            var allTotal1 = count1.count;
            tmp.forEach(function (item) {
                if (
                    item.itemid === goodsInfo.itemid
                    && item.id === goodsInfo.id
                    && item.options._heat === goodsInfo.options._heat
                    && item.options._sugar === goodsInfo.options._sugar
                ) {
                    ++item.amount;
                }

            });
            storage.set(key, JSON.stringify(tmp));
            var count2 = me.getTotal();
            var allTotal2 = count2.count;
            if (allTotal1 === allTotal2) {
                tmp.push(goodsInfo);
            }

            tmp.forEach(function (item) {
                var option = {};
                for (var key in item.options) {
                    if (key !== '__ob__') {
                        option[key] = item.options[key];
                    }

                }
                item.options = option;
            });
            storage.set(key, JSON.stringify(tmp));
            var i = me.getTotal();
            MIP.setData({
                price: i.total || 0,
                goodscount: i.count || 0
            });
            var cartbottom = $('.cartbottom-change');
            var carticon = $('.carticon');
            var circle = $('.cartbottom-change-circle');
            if (carticon.hasClass('shake')) {
                carticon.removeClass('shake');
                circle.removeClass('circle');
                setTimeout(function () {
                    circle.addClass('circle');
                    carticon.addClass('shake');
                }, 0);
            }
            else {
                circle.addClass('circle');
                carticon.addClass('shake');
            }
            if (+i.count === 1 && !cartbottom.hasClass('rotate')) {
                cartbottom.removeClass('rotate-out');
                cartbottom.addClass('rotate');
            }

            var wecoffeeCart = $('.wecoffee-cart');
            if (wecoffeeCart.hasClass('wecoffee-cart-clear')) {
                wecoffeeCart.removeClass('wecoffee-cart-clear');
            }

            wecoffeeCart.addClass('wecoffee-cart-active');
        });
    };

    customElement.prototype.initData = function () {
        var me = this;
        var items = storage.get(key) || '[]';
        try {
            var tmp = JSON.parse(items);
            me.totalinfo = tmp || [];
        }
        catch (e) {
            console.warn(e);
        }
    };

    customElement.prototype.getTotal = function () {
        var info = storage.get(key) || '[]';
        var tmp = JSON.parse(info);
        var count = 0;
        var total = 0;
        tmp.forEach(function (item) {
            if (item.amount !== 1) {
                total += Number(item.price) * item.amount;
            }
            else {
                total += Number(item.price);
            }
            count += Number(item.amount);
        });
        return {
            count: count,
            total: total
        };
    };

    return customElement;
});
