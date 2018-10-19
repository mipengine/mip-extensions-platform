/**
 * @file mip-select-addclass 组件
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
        var $ele = $(this.element);
        var selector = $ele.attr('selector');
        var toggleclass = $ele.attr('toggleclass');
        var $items = $ele.find(selector);
        $items.on('click', function (event) {
            if ($(this).hasClass(toggleclass)) {
                return;
            }
            $items.removeClass(toggleclass);
            $(this).addClass(toggleclass);
        });
    };
    return customElement;
});

