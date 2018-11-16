/**
 * @file mip-hs-alert 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('jquery');
    // 因为有些方法zepto不支持，比如is等
    var customElement = require('customElement').create();

    /**
	 * 第一次进入可视区回调，只会执行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        $el.find('.topbtn').on('click', function (event) {
            event.stopPropagation();
            $el.find('.showself').toggle();
            var tag = $el.find('.showself');
            var flag = true;
            $(document).bind('click', function (e) {
                var target = $(e.target);
                if (target.closest(tag).length === 0 && flag === true) {
                    $(tag).hide();
                    flag = false;
                }

            });
        });
    };

    return customElement;
});
