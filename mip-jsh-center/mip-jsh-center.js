/**
 * @file mip-jsh-center 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        function center() {
            var $allLi = $('.nav_listbox ._item');
            var $default = $('.nav_listbox ._on');
            var index = $default.index();
            var tops = 0;
            for (var i = 0; i < index; i++) {
                tops += $allLi.eq(i).width();
            }
            tops = $default.offset().left;
            var leftH = screen.width / 2;
            var thisw  = $default.width() / 2 + 10;
            $('.nav').scrollLeft(tops - leftH + thisw);
        }
        window.addEventListener('load', function () {
            center();
        }, false);
    };
    return customElement;
});
