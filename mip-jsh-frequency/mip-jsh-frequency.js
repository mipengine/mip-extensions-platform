/**
 * @file mip-jsh-center 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        function center() {
            var $allLi = $('._list ._item');
            var $default = $('._list ._on');
            var index = $default.index();
            var tops = 0;
            for (var i = 0; i < index; i++) {
                tops += $allLi.eq(i).offset().top;
            }
            tops = $default.offset().top;
            var leftH = screen.height / 2;
            var thisw  = $default.height() / 2 + 10;
            $('.fixedNav').scrollTop(tops - leftH + thisw);
        }
        window.addEventListener('load', function () {
            center();
        }, false);
    };
    return customElement;
});
