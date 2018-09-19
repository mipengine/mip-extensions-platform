/**
 * @file mip-boolaw-click 组件
 * @author yuzongde
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var sessionId = 0;
        var qid = getUrlQid();
        var config = this.element.dataset;
        var hosturl = config.htmlurl;
        var autolaw = config.autolaw;

         /**
         * Bind Class
         *
         * @class
         */
        var Loadorder = function () {
            this.init();
        };
        // 初始化请求
        Loadorder.prototype.init = function () {
            this.post({qid: qid, type: 'gdata', sessionId: sessionId});
        };
        // 发送 POST 请求
        Loadorder.prototype.post = function (data) {
            var that = this;
            $.ajax({
                type: 'POST',
                data: data,
                url: hosturl,
                success: function (data) {
                    if (data.result === 1) {
                        $('#orderHtml').html(data.html);
                        $('.orderqr').click(function () {
                            that.orderqr(this);
                        });
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        };
        // 订单确认
        Loadorder.prototype.orderqr = function (obj) {
            // 选择律师
            if (autolaw) {
                var lawuid = $(obj).attr('data-lawuid');
                this.post({qid: qid, lawuid: lawuid, type: 'orderlaw', sessionId: sessionId});
            }
            else {
                this.post({qid: qid, type: 'orderqr', sessionId: sessionId});
            }
        };
        this.addEventAction('login', function (event) {
            var sessid = event.sessionId;
            // console.log(sessid);
            // console.log('登录成功');
            sessionId = sessid;

            new Loadorder();
        });
        // 获取url中的qid
        function getUrlQid() {
            let url = location.href;
            let reg = new RegExp('/order/([0-9]*)', 'i');
            let matched = url.match(reg);
            return matched ? decodeURIComponent(matched[1]) : '';
        }
    };

    return customElement;
});
