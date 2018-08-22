/**
 * @file mip-liAHMclick 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        element.querySelector('#titA').onclick = function () {
            var classVal =  element.querySelector('#lia').getAttribute('class');
            classVal = classVal.replace('active', '');
            element.querySelector('#lia').setAttribute('class', classVal);
            element.querySelector('#lib').setAttribute('class', classVal);
            element.querySelector('#lic').setAttribute('class', classVal);
            var util = require('util');
            util.css(element.querySelector('#titA'), 'color', '#5a97c1');
            util.css(element.querySelector('#titH'), 'color', '#333');
            util.css(element.querySelector('#titM'), 'color', '#333');
            util.css(element.querySelector('#aHM'), 'display', 'block');
            util.css(element.querySelector('#AhM'), 'display', 'none');
            util.css(element.querySelector('#AHm'), 'display', 'none');
            element.querySelector('#lia').classList.add('active');
        };
        element.querySelector('#titH').onclick = function () {
            var classVal =  element.querySelector('#lia').getAttribute('class');
            classVal = classVal.replace('active', '');
            element.querySelector('#lia').setAttribute('class', classVal);
            element.querySelector('#lib').setAttribute('class', classVal);
            element.querySelector('#lic').setAttribute('class', classVal);
            var util = require('util');
            util.css(element.querySelector('#titH'), 'color', '#5a97c1');
            util.css(element.querySelector('#titA'), 'color', '#333');
            util.css(element.querySelector('#titM'), 'color', '#333');
            element.querySelector('#H_stocke').innerHTML = '';
            util.css(element.querySelector('#AhM'), 'display', 'block');
            util.css(element.querySelector('#aHM'), 'display', 'none');
            util.css(element.querySelector('#AHm'), 'display', 'none');
            element.querySelector('#lib').classList.add('active');
        };
        element.querySelector('#titM').onclick = function () {
            var classVal =  element.querySelector('#lia').getAttribute('class');
            classVal = classVal.replace('active', '');
            element.querySelector('#lia').setAttribute('class', classVal);
            element.querySelector('#lib').setAttribute('class', classVal);
            element.querySelector('#lic').setAttribute('class', classVal);
            var util = require('util');
            util.css(element.querySelector('#titM'), 'color', '#5a97c1');
            util.css(element.querySelector('#titH'), 'color', '#333');
            util.css(element.querySelector('#titA'), 'color', '#333');
            util.css(element.querySelector('#AHm'), 'display', 'block');
            util.css(element.querySelector('#AhM'), 'display', 'none');
            util.css(element.querySelector('#aHM'), 'display', 'none');
            element.querySelector('#lic').classList.add('active');
        };
    };

    return customElement;
});