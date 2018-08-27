/**
 * @file mip-cdel-im 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    customElement.prototype.firstInviewCallback = function () {
        var cambrian;
        var BDDefault = {
            URL: {
                DOMAIN_URL: getDomainUrl(),
                GET_XZJS_URL: 'http://m.chinaacc.com/m_member/baidu/getXZJs.shtm'
            }
        };

        function showBDXZJS() {
            var $data = {
                redirectUrl: BDDefault.URL.DOMAIN_URL.replace('lan.', '')
            };
            fetchJsonp(BDDefault.URL.GET_XZJS_URL, {
                jsonpCallback: 'jsonpCallback'
            }).then(function (res) {
                return res.json();
            }).then(function (json) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://xiongzhang.baidu.com/sdk/c.js?'
                    + 'appid=' + json.appid
                    + '&timestamp=' + json.timestamp
                    + '&nonce_str=' + json.nonce_str
                    + '&signature=' + json.signature
                    + '&url=' + json.url;
                document.head.appendChild(script);
                cambrian = window.cambrian;
            });
        }

        function getDomainUrl() {
            var url = window.location.href;
            return url.split('?')[0];
        }

        function callIM() {
            if (cambrian) {
                cambrian.invokeBcpIM({
                    data: {
                        onlyWiseIM: true
                    },
                    success: function (res) {
                    },
                    fail: function (res) {
                        alert(res.msg);
                    }
                });
            }
            else {
                alert('唤起人工客服失败，请联系网校管理员！');
            }
        }

        showBDXZJS();
    };
    return customElement;
});
