/**
 * @file 前端小武博客异步登录组件
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* global MIP */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    customElement.prototype.init = function () {
        var self = this;

        self.config = self.element.dataset;
        self.config.type = (self.config.type || 'jsonp').toLowerCase();

        // 如果没有配置必选参数，则重置回调让其不执行
        if (!self.config.url) {
            console.error('没有配置必选参数：`data-url`', self.element);
            self.firstInviewCallback = function () {};
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;

        element.querySelector('form').addEventListener('submit', function (event) {
            event.preventDefault();

            var post = {
                url: self.config.url,
                cache: false,
                data: {
                    username: element.querySelector('[name="username"]').value,
                    password: element.querySelector('[name="password"]').value
                },
                success: function (res) {
                    res.data = res.data || {};

                    if (res.status === 0) {
                        location.replace(decodeURIComponent(MIP.hash.get('form')));
                    }
                    else {
                        alert(res.msg || '登录失败');
                    }
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

    return customElement;
});
