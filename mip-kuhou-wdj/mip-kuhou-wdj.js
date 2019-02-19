/**
 * @file mip-kuhou-wdj 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('url');
        var typeid = element.getAttribute('typeid');
        var cpid = element.getAttribute('cpid');
        kuhou();
        function kuhou() {
            var fetchJsonp = require('fetch-jsonp');
            if ($('#' + cpid).length > 0) {
                fetchJsonp(url)
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                    if (json === 1) {
                        $('.' + typeid).replaceWith('<a class="downw" ><span></span>暂无下载</a>');
                    }
                });
            }
        }
    };
    return customElement;
});
