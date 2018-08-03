/**
 * @file mip-st-auth 组件
 * @author maomingyang@baidu.com
 */

define(function (require) {
    'use strict';

    var viewer = require('viewer');

    var customElement = require('customElement').create();

    /**
     * 触发自身的err事件来通知使用方调用过程中的错误
     *
     * @param  {string} errMsg 错误提示
     */
    customElement.prototype.err = function (errMsg) {
        var element = this.element;

        viewer.eventAction.execute('fail', element, {
            status: 1,
            msg: errMsg
        });
    };

    /**
     * 构建
     */
    customElement.prototype.build = function () {

        var self = this;
        var element = this.element;

        var data = element.dataset;

        if (!data.appid) {
            this.err('appid值为空');
        }

        if (data.needAuth === 'false') {
            viewer.eventAction.execute('authed', element, {
                appid: data.appid
            });
        }
        else if (data.needAuth === 'true') {
            if (data.url) {
                fetch(data.url).then(function (resp) {
                    return resp.json();
                }).then(function (res) {
                    viewer.eventAction.execute('authed', element, {
                        appid: data.appid,
                        timestamp: res.timestamp,
                        /* eslint-disable fecs-camelcase */
                        nonce_str: res.nonce_str,
                        /* eslint-enable fecs-camelcase */
                        signature: res.signature,
                        url: res.url
                    });
                }).catch(function (err) {
                    self.err('获取鉴权数据失败' + JSON.stringify(err));
                });
            }
            else {
                this.err('url值为空');
            }
        }
        else {
            this.err('needAuth参数值非法');
        }
    };

    return customElement;
});
