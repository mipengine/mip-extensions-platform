/**
 * @file mip-component-fulltoscreen 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('jquery');

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var bodyHeight = $('body').outerHeight(true);
        var windowHeight = $(window).height();
        if (bodyHeight < windowHeight) {
            var lastDom = $('.fix-bottom').prev();
            var remainHeight = $(lastDom).position().top + $(lastDom).outerHeight(true);
            $(element).css('min-height', $(element).height() + remainHeight - 50);
        }
        $('body').css('visibility', 'visible');
    };
    return customElement;
});
