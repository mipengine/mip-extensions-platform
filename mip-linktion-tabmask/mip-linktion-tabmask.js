/**
 * @file mip-linktion-tabmask 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        $el.find('.phone-section').on('touchend', function () {
            var expanded = $(this).attr('expanded');
            if (expanded === undefined) {
                $('body').css('overflow', 'hidden');
                $el.find('.tab-mask').show();
            } else {
                $('body').css('overflow', 'visible');
                $el.find('.tab-mask').hide();
            }
        });
    };
    return customElement;
});
