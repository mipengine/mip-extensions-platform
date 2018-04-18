/**
 * @file mip-wecoffee-saveinfo 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var key = 'wecoffee_store';
    /**
     * 组件构建
     */
    customElement.prototype.build = function () {
        var me = this;
        me.db = {};
        me.addEventAction('update', function(info) {
            console.log('update', info);
            var info = info || {};
            var id = info.itemid;
            if (id) {
                me.db[id] = info;
            }
        });

        me.addEventAction('save', function(info) {
            var items = localStorage.getItem(key) || '{}';
            try {
                var tmp = JSON.parse(items);
                var s = Object.assign(tmp, me.db || {});
                me.totalinfo = s || {};
                localStorage.setItem(key, JSON.stringify(s));
            }
            catch (e) {
                console.warn(e);
            }
            console.log(localStorage.getItem(key));
            var i = me.getTotal();
            MIP.setData({
                price: i.total || 0,
                goodscount: i.count || 0
            });
            me.db = {};
        });
    };

    customElement.prototype.getTotal = function () {
        var me = this;
        var info = me.totalinfo;
        var count = Object.keys(info).length;
        var total = 0;
        for (var i in info) {
            total += Number(info[i].price);
        }
        return {
            count: count,
            total: total
        };
    };

    return customElement;
});
