/**
 * @file mip-hunliji-tabSwitch tab切换组件可嵌套mip-fixed
 * @author niuniu
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $ele = $(this.element);

        $($ele).on('click', '.tab_box div', function () {
            var tag = $(this).attr('data-type');
            $ele.find('.text_box div').hide();
            $ele.find('.text_box div.' + tag).show();
        });
    };

    return customElement;
});
