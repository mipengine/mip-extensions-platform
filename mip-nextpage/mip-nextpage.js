/**
 * @file mip-nextpage 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        $(ele).find('.pagenum').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            $(ele).find('.changeimg').attr('src', './images/pinglun' + $(this).text() + '.png');
        });
    };
    return customElement;
});
