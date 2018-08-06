/**
 * @file mip-otto-togglenavgation 首页切换组件
 * @author xinbao
 * @date 2018年8月2日
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var Gesture = util.Gesture;
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var gesture = new Gesture(element, {
            preventY: true
        });
        var btn = element.querySelector('.nav_listItem_btn');
        var toggleDiv = element.querySelector('.curseShade');
        btn.addEventListener('click', function () {
            toggleDiv.classList.toggle('active');
            var target = this.querySelector('span');
            var str = target.innerText === '更多' ? '收回' : '更多';
            target.innerText = str;
        }, false);
    };

    return customElement;
});
