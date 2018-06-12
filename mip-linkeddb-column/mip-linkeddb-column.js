/**
 * @file mip-linkeddb-column 组件
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
        var ele = this.element;
        $(ele).find('.all-type-item').each(function () {
            var itemRule = $(this).find('.type-item-rule');
            var itemRuleHeight = +itemRule.find('i').text();
            setTypeItemRuleHeight(itemRule, itemRuleHeight);
        });
        function setTypeItemRuleHeight($this, height) {
            height *= 6;
            $($this).css('height', height);
        }
    };

    return customElement;
});
