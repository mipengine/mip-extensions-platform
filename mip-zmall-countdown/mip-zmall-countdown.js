/**
 * @file mip-zol-countdown 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    function setCountDown() {
        var element = this.element;
        // 当前生命周期m-bind可能还没渲染完属性
        var endTimeStr = element.getAttribute('data-endtime');
        if (!endTimeStr) {
            return;
        }
        var endTime = parseInt(endTimeStr, 10) * 1000;
        var nowTime = null;
        var countTime = null;
        var day = null;
        var hour = null;
        var minute = null;
        var second = null;

        var count = setInterval(function () {

            nowTime = +new Date();

            countTime = parseInt((endTime - nowTime) / 1000, 10);

            if (countTime < 0) {
                var emptyHtml = [
                    '0天',
                    '<span class="num">0</span>',
                    ':<span class="num">0</span>',
                    ':<span class="num">0</span>'
                ].join('');
                element.innerHTML = emptyHtml;
                clearInterval(count);
            }
            else {
                day = parseInt(countTime / 86400, 10);
                countTime %= 86400;

                hour = checkTime(parseInt(countTime / 3600, 10));
                countTime %= 3600;

                minute = checkTime(parseInt(countTime / 60, 10));
                second = checkTime(parseInt(countTime % 60, 10));

                var html = [
                    day + '天',
                    ' <span class="num">' + hour + '</span>',
                    ':<span class="num">' + minute + '</span>',
                    ':<span class="num">' + second + '</span>'
                ].join('');
                element.innerHTML = html;
            }
        }, 1000);
    }

    // 将0-9的数字前面加上0，例1变为01
    function checkTime(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        setCountDown.call(this);
    };

    customElement.prototype.attributeChangedCallback = function (attributeName, oldValue, newValue) {
        if (attributeName === 'data-endtime' && oldValue !== newValue && newValue > 0) {
            var self = this;
            setTimeout(function () {
                setCountDown.call(self);
            }, 1);
        }
    };

    return customElement;
});
