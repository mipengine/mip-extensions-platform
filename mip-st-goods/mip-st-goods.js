/**
 * @file mip-st-goods 组件
 * @author
 */

/* global cambrian */
define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var templates = require('templates');
    // var viewer = require('viewer');

    function loadSDK(id, cb) {
        if (!window.cambrian) {
            var script = document.createElement('script');
            script.onload = cb;
            script.src = 'https://xiongzhang.baidu.com/sdk/c.js?appid=' + id + '&timestamp=' + (+new Date());
            document.body.appendChild(script);
        }
        else {
            cb();
        }
    }

    /**
     * 数据处理组件,需要尽快绑定message事件
     */
    customElement.prototype.build = function () {
        var element = this.element;
        window.addEventListener('message', function (e) {
            var loc = window.location;
            var domain = loc.protocol + '//' + loc.host;
            if (e.origin === domain
                && e.source === window && e.data
                && e.data.type === 'bind') {
                var data = e.data.m;
                if (data.code === 306014) {
                    // 未登录
                    loadSDK(data.data.xzh_id, function () {
                        cambrian.login({
                            success: function () {
                                location.reload();
                            },
                            fail: function () {
                            }
                        });
                    });
                }
                else if (data.code === 306009) {
                    // 非本人订单或者订单已评价，rd给的是同一个code
                    document.body.querySelector('.appraise-done').style.display = 'block';
                }
                else if (data.code === 0) {
                    // 正常返回
                    templates.render(element, data.data).then(function (html) {
                        document.body.querySelector('.appraise').style.display = 'block';
                        element.innerHTML = html;
                    });
                }
            }
        });
    };

    return customElement;
});
