/**
 * @file mip-otto-ad 网校轮播图组件
 * @author xinbao
 * @date: 7-26
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var templates = require('templates');

    customElement.prototype.build = function () {
        var element = this.element;
        var typid = element.getAttribute('typid') || '20180713115313558';
        var sign = element.getAttribute('sign') || 'jz1';
        var url = 'https://api2.wangxiao.cn/app/ad.ashx?AdTypeId=' + typid + '&sign=' + sign;
        fetchJsonp(url, {
            jsonpCallbackFunction: 'cb'
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                // 渲染html
                templates.render(element, data).then(function (html) {
                    element.innerHTML = html;
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return customElement;
});
