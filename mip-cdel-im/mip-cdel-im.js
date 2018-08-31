/**
 * @file mip-cdel-im 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    function getDomainUrl() {
        var url = window.location.href;
        return url.split('?')[0];
    }

    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = this.element;
        var defineUrl = getDomainUrl();
        fetchJsonp('//m.chinaacc.com/m_member/baidu/getXZJs.shtm?redirectUrl=' + defineUrl.replace('lan.', ''),
        {
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

            self.element.addEventListener('click', function () {
                window.cambrian && window.cambrian.invokeBcpIM({
                    data: {
                        onlyWiseIM: true
                    },
                    success: function (res) {
                    },
                    fail: function (res) {
                        alert(res.msg);
                    }
                });
            });
        });
    };

    return customElement;
});
