/**
 * @file mip-lxn-title 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;

        // 城市名称
        var cityName = ele.querySelector('#city-name');
        // 本地存储的城市
        var focusCity = localStorage.getItem('focuscity');
        if (focusCity !== null) {
            cityName.innerHTML = focusCity;
        }
        else {
            cityName.innerHTML = '北京';
        }
    };

    return customElement;
});
