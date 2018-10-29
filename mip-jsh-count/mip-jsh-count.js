/**
 * @file mip-alert 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $this = this.element;
        var s = $this.getAttribute('data-time');
        function countDown(times) {
            var timer = null;
            timer = setInterval(function () {
                var day = 0;
                var hour = 0;
                var minute = 0;
                var second = 0;
                if (times > 0) {
                    day = Math.floor(times / (60 * 60 * 24));
                    hour = Math.floor(times / (60 * 60)) - (day * 24);
                    minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                }
                if (day <= 9) {
                    day = '0' + day;
                }
                if (hour <= 9) {
                    hour = '0' + hour;
                }
                if (minute <= 9) {
                    minute = '0' + minute;
                }
                if (second <= 9) {
                    second = '0' + second;
                }
                if (day === '00') {
                    $this.innerHTML = '截止时间：' + hour + '小时' + minute + '分' + second + '秒';
                } else if (hour === '00') {
                    $this.innerHTML = '截止时间：' + minute + '分' + second + '秒';
                } else {
                    var s = '截止时间：' + day + '天' + hour + '小时' + minute + '分' + second + '秒';
                    $this.innerHTML = s;
                }
                if (hour === '00' && day === '00' && minute === '00' && second === '00') {
                    $this.innerHTML = '截止时间：正在开奖...';
                }
                times --;
            }, 1000);
            if (times <= 0) {
                clearInterval(timer);
            }
        }
        countDown(s);
    };
    return customElement;
});
