/**
 * @file mip-compassedu-djzx 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto ');/*使用zepto库控制元素*/
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        $('#case-eval').click(function () {/*按钮触发事件，因场景需要使用全局*/
            $('#contact').show();
            $('#case-eval').hide();
            $('#case-contact-hide').show();
            $('#mm-blocker').addClass('case-blocker');
        });

        $('.case-contact-hide').click(function () {
            $('#contact').hide();
            $('#case-contact-hide').hide();
            $('#case-eval').show();
            $('#mm-blocker').removeClass('case-blocker');
        });
    };

    return customElement;
});