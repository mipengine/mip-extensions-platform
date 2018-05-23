/**
 * @file mip-showhide-dom 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto ');/*使用zepto库控制元素JS不会写*/
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        $(this.element).find('case-eval').click(function () {
            $(this.element).find('concat').show();
            $(this.element).find('case-eval').hide();
            $(this.element).find('case-contact-hide').show();
            $(this.element).find('mm-blocker').addClass('case-blocker');
        });

        $(this.element).find('case-contact-hide').click(function () {
            $(this.element).find('concat').hide();
            $(this.element).find('case-contact-hide').hide();
            $(this.element).find('case-eval').show();
            $(this.element).find('mm-blocker').removeClass('case-blocker');
        });
    };

    return customElement;
});
