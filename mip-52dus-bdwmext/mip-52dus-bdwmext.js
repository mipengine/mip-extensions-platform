/**
 * @file mip-52dus-bdwmext 组件
 * @author admin@52dus.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {

        var ele = this.element;
        var domain = ele.getAttribute('domain');
        var pctoken = ele.getAttribute('pctoken');
        var waptoken = ele.getAttribute('waptoken');
        var script = document.createElement('script');
        if (domain && waptoken && pctoken) {
            if (isMobile()) {
                script.src = document.location.protocol + '//' + domain + '/' + waptoken + '.js';
            } else {
                script.src = document.location.protocol + '//' + domain + '/' + pctoken + '.js';
            }
            ele.appendChild(script);
        } else {
            console.error('请输入正确的 domain 或者 token');
        }
    };

    return customElement;

    function isMobile() {
        var RegexMatch = /(android|webos|iphone|ipad|blackberry|mobile|opera*mini|htc|nokia|huawei|samsung|wap|phone)/i;
        var u = navigator.userAgent;
        if (null == u) {
            return true;
        }
        var result = RegexMatch.exec(u);
        if (null == result) {
            return false;
        } else {
            return true;
        }
    }
});
