/**
 * @file mip-hs-showmore 组件
 * @author
 */

define(function (require) {
    'use strict';
    var viewport = require('viewport');
    var customElement = require('customElement').create();

    /**
	 * 第一次进入可视区回调，只会执行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        var wW = viewport.getWidth();
        if ($(this.element).find('.text_warp .viewmore_co').height() <= 100) {
            $(this.element).find('.text_warp .btnmore').addClass('hide');
        }
        else {
            $(this.element).find('.text_warp .viewmore_co').addClass('limit-height');
        }
        $(this.element).find('.icon-down').parent().addClass('gradient');
        $(this.element).find('.icon-down').css('left', (wW - $(this.element).find('.icon-down').width()) / 2);

        $(this.element).on('click', '.btnmore', function () {
            if ($(this).find('.icon').hasClass('icon-down') || $(this).find('.text').hasClass('down')) {
                $(this).find('.icon').removeClass('icon-down').addClass('icon-up');
                $(this).find('.icon').html('收起');
                $(this).find('.text').removeClass('down').html($(this).find('.text').attr('data-up'));
                $(this).parent().find('.viewmore_co').addClass('show');
                $(this).find('.icon-up').parent().removeClass('gradient');
            }
            else {
                $(this).find('.icon').html('查看全部内容');
                $(this).find('.icon').removeClass('icon-up').addClass('icon-down');
                $(this).find('.text').addClass('down').html($(this).find('.text').attr('data-down'));
                $(this).parent().find('.viewmore_co').removeClass('show');
                $(this).find('.icon-down').parent().addClass('gradient');
            }
        });
    };

    return customElement;
});
