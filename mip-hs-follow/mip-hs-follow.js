/**
 * @file mip-hs-follow 组件
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
        var $el = $(this.element);
        var square = document.querySelectorAll('.square');
        for (var i = 0; i < square.length; i++) {
            square[i].index = i;
            square[i].onclick = function () {
                if (!$(this).is('.selected')) {
                    $(this).addClass('selected');
                    $(this).css('background', '#ebebeb');
                    $(this).css('color', '#56585d');
                    $(this).css('border', 'none');
                    $(this).html('已关注');
                } else {
                    $(this).removeClass('selected');
                    $(this).css('background', '#ff9900');
                    $(this).css('color', '#ffffff');
                    $(this).css('border', 'none');
                    $(this).html('关注');
                }
            };
        }

    };

    return customElement;
});
