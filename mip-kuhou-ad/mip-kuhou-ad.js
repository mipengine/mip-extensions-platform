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
        var type = element.getAttribute('adtype');
        kuhou();
        function kuhou() {
            fetch('http://www.kuhou.com/index.php?m=api&c=table&a=mipad&type=' + type)
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
