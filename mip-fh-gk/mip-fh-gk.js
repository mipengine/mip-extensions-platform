/**
 * @file mip-fh-gk 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var threeId = ele.getAttribute('hundredId');
        var twoId = ele.getAttribute('tenId');
        var oneId = ele.getAttribute('bitId');
        var three = document.querySelector(threeId);
        var two = document.querySelector(twoId);
        var one = document.querySelector(oneId);
        count();
        // 高考倒计时
        function count(n) {
            n = n || 0;
            // 初始化当前时间
            var now = new Date();
            var newY = now.getFullYear() + n;
            // 初始化目标时间(这里的05实际上是六月)
            var newdatr = new Date(newY, '05', '07');
            // 当前时间转换毫秒
            var nowhms = now.getTime();
            // 目标时间转换毫秒
            var newhms = newdatr.getTime();
            // 时间差（毫秒数）
            var cha = newhms - nowhms;
            if (cha < 0)
            {
                count(1);
            }
            else
            {
                // 计算天数
                var day = parseInt(cha / (1000 * 60 * 60 * 24), 10);
                three.innerHTML = parseInt(day / 100, 10);
                two.innerHTML = parseInt(day % 100 / 10, 10);
                one.innerHTML = day % 100 % 10;
            }
        }
    };
    return customElement;
});

