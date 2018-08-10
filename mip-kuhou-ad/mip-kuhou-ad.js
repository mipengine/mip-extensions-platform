/**
 * @file mip-kuhou-ad 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('url');
        kuhou();
        function kuhou() {
            fetch(url)
            .then(function (response) {
                var str = response.text();
                str.then(function (result) {
                    $('.adkuhou').prepend(result);
                });
            });
        }
    };
    return customElement;
});
