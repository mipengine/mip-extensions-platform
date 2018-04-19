/**
 * @file MIP 支付组件常用方法
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var extend = require('util').fn.extend;
    var viewer = require('viewer');

    var util = {};

    /**
     * 处理字符串query
     *
     * @type {Object}
     */
    util.querystring = {

        /**
         * 解析对象为 string
         *
         * @param  {Object} data 一级对象数据
         * @return {string}
         */
        stringify: function (data) {
            return Object.keys(data).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key] || '');
            }).join('&');
        }
    };

    /**
     * 容错解析 JSON
     *
     * @param  {string} content 内容
     * @return {Object}
     */
    util.parseJSON = function (content) {
        try {
            return JSON.parse(content);
        }
        catch (e) {
            return {};
        }
    };

    /**
     * 发送 POST 请求
     *
     * @param  {string} url  接口链接
     * @param  {Object} data  发送数据
     *
     * @return {Promise}
     */
    util.post = function (url, data) {
        return fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: util.querystring.stringify(data || {}),
            credentials: 'include'
        }).then(function (res) {
            return res.json();
        });
    };

    /**
     * 判断是否为 iframe 框架内打开
     *
     * @return {boolean}
     */
    util.isIframe = function () {
        return viewer.isIframed;
    };

    return util;
});
