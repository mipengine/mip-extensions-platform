/**
 * @file mip-tab-ul 组件
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
        // TODO
        var element = this.element;
        $(element).find('.ctLeft').find('li').on('click', function () {
            $(this).addClass('on').siblings().removeClass('on');
            $(this).parent('.ctLeft').siblings('.ctRight')
            .eq($(this).index()).css('display', 'block').siblings('.ctRight').css('display', 'none');
        });
    };
    return customElement;
});
