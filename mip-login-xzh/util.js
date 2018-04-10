/**
 * @file 常用方法
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var parseCacheUrl = require('util').parseCacheUrl;
    var extend = require('util').fn.extend;

    /**
     * 熊掌号授权链接
     *
     * @type {string}
     */
    var OAUTH_URL = 'https://openapi.baidu.com/oauth/2.0/authorize?'
        + 'response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=snsapi_userinfo&state=${state}';

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
     * 获取链接中的 query
     *
     * @param  {string} name 参数名称
     * @return {string}
     */
    util.getQuery = function (name) {
        var url = location.search.substr(1);
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var matched = url.match(reg);

        return matched ? decodeURIComponent(matched[2]) : '';
    };

    /**
     * 获取授权登录链接
     *
     * @param  {Object} data 配置数据
     *
     * @return {string}
     */
    util.getOauthUrl = function (data) {
        return OAUTH_URL.replace(/\$\{([^\}]+)\}/g, function (matched, key) {
            return data.hasOwnProperty(key) ? data[key] : '';
        });
    };

    /**
     * 获取当前原始页面链接
     *
     * @description 会做如下处理：
     *              1. 删除 hash 后面的字符，因为透传有问题
     *              2. 删除 code state 参数，防止多次重定向链接越来越长
     * @return {string}
     */
    util.getSourceUrl = function () {
        return parseCacheUrl(location.href)
            .replace(/#.*$/, '')
            .replace(/([&?])((code|state)=[^&$]+)/g, function (matched, prefix) {
                return prefix === '?' ? '?': '';
            });
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
            body: util.querystring.stringify(extend({}, data || {}, {
                accessToken: localStorage.getItem(url)
            })),
            credentials: 'include'
        }).then(function (res) {
            return res.json();
        });
    };

    return util;
});
