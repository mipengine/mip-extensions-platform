/**
 * @file mip-jqtab-change 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    var $ = require('jquery');
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        var str1 = ele.getAttribute('lname');
        var id = ele.getAttribute('target');
        var $p = $('#' + id);
        $(ele).on('click', str1, function () {
            $(this).addClass('active').siblings().removeClass('active');
            var num = $(this).data('and');
            $p.children('[data-and=' + num + ']').addClass('active').siblings().removeClass('active');
        });
    };

    return customElement;
});
