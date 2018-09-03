/**
 * @file mip-miaotu-countdown 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var btn = ele.querySelector('.clickme-get-countdown');
        function time(btn, wait) {
            if (wait === 0) {
                btn.removeAttribute('disabled');
                btn.value = '免费获取验证码';
            }
            else {
                btn.setAttribute('disabled', true);
                btn.value = wait + 's';
                wait--;
                setTimeout(function () {
                    time(btn, wait);
                }, 1000);
            };
        }
        btn.onclick = function () {
            time(this, 60);
        };
    };

    return customElement;
});
