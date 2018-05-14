/**
 * @file mip-wecoffee-list 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var templates = require('templates');
    var viewer = require('viewer');
    var key = 'wecoffee_store';
    var coffeeListKey = 'wecoffee_list';
    var MIP = window.MIP || {};
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    /**
     * [renderTemplate 获取模板]
     *
     * @param  {Object} data 渲染数据
     */
    function renderTemplate(data) {
        var me = this;
        if (data) {
            data.orderList.forEach(function (olist) {
                olist._optionsStr = [];

                Object.keys(olist.options).forEach(function (key) {
                    typeof olist.options[key] === 'string' && olist._optionsStr.push(olist.options[key]);
                });
                olist._optionsStr = olist._optionsStr.join('/');
            });
            templates.render(
                me.element, data
            ).then(render.bind(me));
        }
        else {
            console.error('数据不符合规范');
        }
    }

    /**
     * [render dom渲染函数]
     *
     * @param  {Array} htmls [html对象数组]
     */
    function render(htmls) {
        var me = this;
        var fragment = document.createDocumentFragment();
        var node = document.createElement('div');
        node.innerHTML = htmls;
        node.setAttribute('class', 'coffee-contain');
        fragment.appendChild(node);
        me.container.appendChild(fragment);
        setTimeout(function () {
            viewer.eventAction.execute('rendered', me.element);
        }, 0);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */

    customElement.prototype.firstInviewCallback = function () {
        refreshContent.call(this);
    };
    function refreshContent() {
        var me = this;
        var coffee = me.formatData();
        setTimeout(function () {
            var i = me.getTotal();
            MIP.setData({
                total: i.total || 0
            });
        }, 0);
        me.container = document.createElement('div');
        me.applyFillContent(this.container);
        me.element.appendChild(this.container);
        renderTemplate.call(me, coffee);
    }
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
    customElement.prototype.formatData = function () {
        var list = storage.get(coffeeListKey) || '[]';
        var coffeeList = JSON.parse(list);
        var order = storage.get(key) || '[]';
        var orderList = JSON.parse(order);
        var newData = [];
        coffeeList.forEach(function (items) {
            items.list.map(function (item) {
                newData.push(item);
            });
        });
        orderList.forEach(function (item) {
            newData.forEach(function (coffeeItem) {
                if (item.itemid === coffeeItem.id) {
                    item.title = coffeeItem.title;
                    item.discribe = coffeeItem.discribe;
                    item.img = coffeeItem.img;
                    item.allPrice = item.price * item.amount;
                }

            });
        });
        return {
            orderList: orderList
        };
    };

    return customElement;
});
