/**
 * @file mip-xuexb-like 组件
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 初始化组件，验证配置数据
     */
    customElement.prototype.init = function () {
        var self = this;
        var errorText = null;

        self.config = self.element.dataset;
        self.config.type = (self.config.type || 'jsonp').toLowerCase();

        // 如果没有配置必选参数，则重置回调让其不执行
        if (!self.config.getUrl) {
            errorText = '没有配置必选参数：`data-get-url`';
        }

        if (errorText) {
            console.error(errorText, self.element);
            self.firstInviewCallback = function () {};
        }
    };

    /**
     * 第一次进入可视区时绑定数据
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;

        // 获取点赞数据
        self.getLike();

        // 如果没有设置接口链接，则不注册事件
        if (!self.config.setUrl) {
            return;
        }

        // 绑定点击事件
        self.element.addEventListener('click', function () {
            // 未登录跳登录页
            if (self.config.loginUrl && this.getAttribute('is-login') !== 'true') {
                location.href = self.config.loginUrl + '#form=' + encodeURIComponent(location.href);
                return;
            }

            // 已经赞过
            if (this.getAttribute('is-like') === 'true') {
                alert('已经赞过了');
                return;
            }

            var post = {
                url: self.config.setUrl,
                cache: false,
                success: function (res) {
                    res.data = res.data || {};

                    if (res.status === 0 && res.data.hasOwnProperty('like')) {
                        self.setCount(res.data.like);
                    }

                    self.element.setAttribute('is-like', true);
                }
            };

            if (self.config.type === 'jsonp') {
                post.dataType = 'jsonp';
            }
            else if (self.config.type === 'cors') {
                post.xhrFields = {
                    withCredentials: true
                };
            }

            $.ajax(post);
        });
    };

    /**
     * 获取点赞数据，会根据返回值设置当前是否登录、是否已点赞
     */
    customElement.prototype.getLike = function () {
        var self = this;
        var post = {
            url: self.config.getUrl,
            cache: false,
            success: function (res) {
                res.data = res.data || {};

                if (res.status === 0 && res.data.hasOwnProperty('like')) {
                    self.setCount(res.data.like);
                }

                self.element.setAttribute('is-login', !!res.data.isLogin);
                self.element.setAttribute('is-like', !!res.data.isLike);
            }
        };

        if (self.config.type === 'jsonp') {
            post.dataType = 'jsonp';
        }
        else if (self.config.type === 'cors') {
            post.xhrFields = {
                withCredentials: true
            };
        }

        $.ajax(post);
    };

    /**
     * 设置点赞数
     *
     * @param {string} count 点赞数
     */
    customElement.prototype.setCount = function (count) {
        [].slice.call(this.element.querySelectorAll('[show-count]')).forEach(function (el) {
            el.innerText = count;
        });
    };

    return customElement;
});
