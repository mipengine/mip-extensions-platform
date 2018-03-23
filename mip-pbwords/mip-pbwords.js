/**
 * @file mip-pbwords 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var href = location.href;
        var title = ele.getAttribute('titl');
        var url = 'https://m.391k.com/api/op.ashx/getpb404word?title=' + title;
        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp(url).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data) {
                window.location = '/404?pb=' + title + '&href=' + href;
            }
        });
    };
    return customElement;
});
