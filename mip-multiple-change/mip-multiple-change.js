/**
 * @file mip-multiple-change 组件
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
        var tabs = $(element).find('.multiple-change');
        $(tabs).on('click', function () {
            var self = this;
            var showWhich = $(self).data('show');
            $(element).find('.multiple-change-view').css({'display': 'none'});
            $(element).find('#' + showWhich).css({'display': 'block'});
        });
    };

    return customElement;
});
