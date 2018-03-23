/**
 * @file mip-downaddress 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var iurl = ele.getAttribute('iurl');
        var tag = ele.getAttribute('tag');
        var url = iurl + '?type=url&id=' + tag;
        ele.onclick = function () {
            var fetchJsonp = require('fetch-jsonp');
            fetchJsonp(url).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data === null || data === 'null') {
                    window.location.href = 'https://m.391k.com/downbyname';
                } else {
                    window.location.href = data;
                }
            });
        };
    };
    return customElement;
});
