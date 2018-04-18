/**
 * @file mip-linkeddb-showmore 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

	/**
	 * 第一次进入可视区回调，只会执行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        if ($(this.element).find('.msg-text .view-more-text').height() <= 95) {
            $(this.element).find('.msg-text .view-more').addClass('hide');
        } else {
            $(this.element).find('.msg-text .view-more-text').addClass('limit-height');
        }

        $(this.element).on('click', '.view-more', function () {
            if ($(this).find('.icon').hasClass('icon-down') || $(this).find('.text').hasClass('down')) {
                $(this).find('.icon').removeClass('icon-down').addClass('icon-up');
                $(this).find('.text').removeClass('down').html($(this).find('.text').attr('data-up'));
                $(this).parent().find('.view-more-text').addClass('show');
            } else {
                $(this).find('.icon').removeClass('icon-up').addClass('icon-down');
                $(this).find('.text').addClass('down').html($(this).find('.text').attr('data-down'));
                $(this).parent().find('.view-more-text').removeClass('show');
            }
        });
    };

    return customElement;
});
