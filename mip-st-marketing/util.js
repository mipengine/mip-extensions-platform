/**
 * @file 服务营销组件工具类
 * @author maomingyang@baidu.com
 * @date 2018-10-08
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    /**
     * 封装了localStorage的存储类
     *
     * @param {string} prefix 存储的前缀
     */
    function Store(prefix) {
        this.prefix = prefix || 'mip-st-marketing:';
    }

    /**
     * 获取存储键名为key的值
     *
     * @param  {sting} key 存储的键名
     * @return {string}  key存储的键值
     */
    Store.prototype.get = function (key) {
        return localStorage.getItem(this.prefix + key);
    };

    /**
     * 存储kv
     *
     * @param {string} key 键名
     * @param {[type]} value 值
     */
    Store.prototype.set = function (key, value) {
        localStorage.setItem(this.prefix + key, value);
    };

    /**
     * 删除kv数据
     *
     * @param  {string} key 键名
     */
    Store.prototype.remove = function (key) {
        localStorage.removeItem(this.prefix + key);
    };

    /**
     * 简易toast组件
     *
     * @param {number} duration toast的显示时间
     */
    function Toast(duration) {
        this.duration = duration || 2 * 1000;
        this.container = $('<div class="marketing-toast marketing-toast-hide"></div>');

        $('body').eq(0).append(this.container);
    }

    /**
     * 显示toast组件
     *
     * @param {string}   text     文字
     * @param {Function} callback 回调函数
     */
    Toast.prototype.show = function (text, callback) {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.container.text(text).removeClass('marketing-toast-hide');

        var self = this;
        this.timer = setTimeout(function () {
            self.container.addClass('marketing-toast-hide');
            callback && callback();
        }, this.duration);
    };

    return {
        Store: Store,
        Toast: Toast
    };
});
