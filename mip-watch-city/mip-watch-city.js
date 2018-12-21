/**
 * @file mip-watch-city 组件
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
        $(element).find('.city-cell-title').on('click', function () {
            $(this).addClass('city-active').siblings().removeClass('city-active');
            var index = $(this).index();
            if (index === 0) {
                $('.city-cell-item:eq(0)').show().siblings().hide();
            } else if (index === 1) {
                $('.city-cell-item:eq(1)').show().siblings().hide();
            } else {

            }
        });
    };

    return customElement;
});
