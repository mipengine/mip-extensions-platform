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
        var url = location.href;

        // 修复 MIP-Cache 环境实实别，因为核心代码里只识别了 // https://
        // https://github.com/mipengine/mip/blob/master/src/util.js#L58
        if (url.indexOf('.com/c/s/') > -1 && url.indexOf('http://') === 0) {
            url = url.replace(/^http:/, '');
        }

        return parseCacheUrl(url)
            .replace(/#.*$/, '')
            .replace(/([&?])((code|state)=[^&$]+)/g, function (matched, prefix) {
                return prefix === '?' ? '?': '';
            });
    };

    /**
     * 小小的封装下 ls
     *
     * @type {Object}
     */
    util.store = {

        /**
         * 检查是否支持 ls
         *
         * @type {boolean}
         */
        support: function () {
            var support = true;
            try {
                window.localStorage.setItem('lsExisted', '1');
                window.localStorage.removeItem('lsExisted');
            } catch (e) {
                support = false;
            }
            return support;
        }(),

        /**
         * 获取缓存数据
         *
         * @param  {string} key 数据名称
         * @return {string}
         */
        get: function (key) {
            if (util.store.support) {
                return localStorage.getItem(key);
            }
        },

        /**
         * 设置缓存数据
         *
         * @param {string} key   数据名称
         * @param {string} value 数据值
         * @param {UTC} expires 过期时间
         * @return {string}
         */
        set: function (key, value, expires) {
            if (util.store.support) {
                localStorage.setItem(key, value);
            }
        },

        /**
         * 删除缓存数据
         *
         * @param  {string} key 数据名称
         * @return {string}
         */
        remove: function (key) {
            if (util.store.support) {
                return localStorage.removeItem(key);
            }
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
            body: util.querystring.stringify(extend({}, data || {}, {
                accessToken: util.store.get(url)
            })),
            credentials: 'include'
        }).then(function (res) {
            return res.json();
        });
    };

    return util;
});
