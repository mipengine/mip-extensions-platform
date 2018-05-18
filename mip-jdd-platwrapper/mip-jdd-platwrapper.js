/**
 * @author:JDDFE
 * @date: 2018-05-17
 * @file mip-jdd-platwrapper.js
 *
 */

define(function (require) {
    var util = require('util');
    var customElement = require('customElement').create();
    var viewer = require('viewer');


    // createdCallback说明：在创建元素，及时隐藏头部避免页面抖动(判断是否百度mip环境，是隐藏、否显示)
    customElement.prototype.createdCallback = function () {
        var el = this.element;
        var wrapper = el.querySelector('.wrapper-app');
        var header = el.querySelector('.app-header');
        var elseClassName = el.getAttribute('elseClassName');
        var className = el.getAttribute('className');

        if (viewer.isIframed) {
            if (className) {
                header.className += (' ' + className);
            } else {
                header.style.display = 'none';
            }
        } else {
            if (elseClassName) {
                wrapper.className += (' ' + elseClassName);
            }
        }
    };


    return customElement;
});
