/**
 * @file mip-wecoffee-fetchdata 组件
 * @author zhuguoxi
 * @description 此组件只为showcase，请勿在正式产品使用。
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var viewer = require('viewer');

    var FETCH_FETCHING = 'fetching';
    var FETCH_SUCCESS = 'success';
    var FETCH_FAIL = 'fail';
    var MIP = window.MIP || {};

    // 数据请求组件，需要提前加载
    customElement.prototype.build = function () {
        var me = this;
        me.url = this.element.getAttribute('url');
        me.storefiled = this.element.getAttribute('storefiled') || 'data';
        me.addEventAction('fetch', function (e, url) {
            if (url) {
                me.url = url;
            }

            me.getData();
        });
    };

    customElement.prototype.getData = function (url) {
        var me = this;
        var ele = me.element;

        MIP.setData({
            loading: true
        });
        if (me.url) {
            viewer.eventAction.execute(FETCH_FETCHING, ele, {
                msg: '请求中'
            });
            fetchJsonp(me.url, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (!data.status && data.data) {
                    var fetchData = {};
                    try {
                        fetchData = window.m.fetchData || {};
                    }
                    catch (e) {}
                    fetchData[me.storefiled] = data.data;
                    MIP.setData({
                        fetchData: fetchData
                    });
                    viewer.eventAction.execute(FETCH_SUCCESS, ele, {
                        msg: '成功'
                    });
                }
                else {
                    viewer.eventAction.execute(FETCH_FAIL, ele, {
                        msg: '失败'
                    });
                }
                MIP.setData({
                    loading: false
                });
            });
        }

    };

    return customElement;
});
