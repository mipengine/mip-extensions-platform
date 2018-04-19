/**
 * @file 订单组件示例常用方法
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var util = {};

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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data || {}),
            credentials: 'include'
        }).then(function (res) {
            return res.json();
        });
    };

    /**
     * 字符串转对象并添加value
     *
     * @param  {string} content 字符
     * @param {any} value 值
     * @return {Object}
     * @example
     *     util.stringToObject('a', 1) => {a: 1}
     *     util.stringToObject('a.b', 1) => {a: {b: 1}}
     */
    util.stringToObject = function (content, value) {
        var result = {};
        var clone = result;
        var match = content.split('.');

        while (match.length > 1) {
            var key = match.shift();
            clone = clone[key] = clone[key] || {};
        }

        // 赋值
        clone[match.shift()] = value;

        return result;
    };

    return util;
});
