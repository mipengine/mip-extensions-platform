/**
 * @file mip-bdb-bstab 组件
 * @author
 */
define(function (require) {
    'use strict';

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        function nextAll(el) {
            var nextEls = [];
            while (el.nextElementSibling) {
                var next = el.nextElementSibling;
                nextEls.push(next);
                el = next;
            }
            return $(nextEls);
        }

        var element = this.element;

        $(element).find('.checkbox span').click(function () {
            $(this).addClass('selected').siblings('span').removeClass('selected');
            nextAll($(this).parents('.checkbox')[0]).removeClass('block').addClass('none');
            var sid = $(this).attr('data-id');
            if ($(element).find('.cond-' + sid).size() > 0) {
                $(element).find('.cond-' + sid).removeClass('none').addClass('block').find('.selected').click();
            }
            else {
                $(element).find('.banshi-box').removeClass('block').addClass('none');
                $(element).find('.banshi-' + sid).removeClass('none').addClass('block');
            }

        });

        $(element).find('.banshi-box .nav-content li').click(function () {
            $(this).addClass('cur').siblings('li').removeClass('cur');
            $(this).parents('.banshi-box').find('.channel_block').
            eq($(this).index()).removeClass('none').addClass('block')
            .siblings('.channel_block').removeClass('block').addClass('none');
        });


        $(element).find('.wenda>span').click(function () {
            var display = $(this).siblings('.wenda_da').attr('class');
            if (display.indexOf('none') > -1) {
                $(this).html('-收起').siblings('.wenda_da').removeClass('none').addClass('block');
            }
            else {
                $(this).html('+展开').siblings('.wenda_da').removeClass('block').addClass('none');
            }

        });

        $(element).find('.yuyue .yuyue_a').click(function () {
            var display = $(this).siblings('.yuyue_da').attr('class');
            if (display.indexOf('none') > -1) {
                $(this).html('-操作流程').siblings('.yuyue_da').removeClass('none').addClass('block');
            }
            else {
                $(this).html('+操作流程').siblings('.yuyue_da').removeClass('block').addClass('none');
            }

        });

        // TODO
    };

    return customElement;
});
