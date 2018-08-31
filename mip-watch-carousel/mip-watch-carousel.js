/**
 * @file mip-watch-carousel 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('jquery');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        var n = 0;
        var width = $(ele).width();
        var len = $(ele).children().length;
        $(ele).parent().parent().children('.icon-right').click(function () {
            if (n === len - 1) {
                return;
            }
            n++;
            $(ele).css({left: (parseInt($(ele).css('left'), 10) - width - 4) + 'px'});
        });
        $(ele).parent().parent().children('.icon-left').click(function () {
            if (n === 0) {
                return;
            }
            n--;
            $(ele).css({left: (parseInt($(ele).css('left'), 10) + width + 4) + 'px'});
        });
    };

    return customElement;
});
