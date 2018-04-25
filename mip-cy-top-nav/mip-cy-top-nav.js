/**
 * @file mip-cy-top-nav 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $ele = $(this.element);
        $ele.find('.top-nav-icon').on('click', function () {
            $ele.find('.top-nav-list').toggle();
        });
    };

    return customElement;
});
