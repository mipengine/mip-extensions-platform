/**
 * @file mip-linktion-tabmask 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var util = require('util');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var undelegate = util.event.delegate(this.element, '.phone-section', 'click', function () {
            var expanded = $(this).attr('expanded');
            if (expanded) {
                $('html').addClass('mip-no-scroll');
                $el.find('.tab-mask').show();
            } else {
                $('html').removeClass('mip-no-scroll');
                $el.find('.tab-mask').hide();
            }
        });
    };
    return customElement;
});
