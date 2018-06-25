/**
 * @file mip-anlian-change 组件
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
        // TODO
        var $element = $(this.element);
        var divTopUlLi = $element.find('.div_top ul li');
        divTopUlLi.on('click', function () {
            $(this).siblings().removeClass('on');
            $(this).addClass('on');
            var dataId = $(this).attr('data-id');
            var dataIdNode = $element.find('.' + dataId);
            dataIdNode.removeClass('on');
            dataIdNode.addClass('on');
            $(this).siblings().each(function (i, k) {
                var attr = $(k).attr('data-id');
                var attrNode = $element.find('.' + attr);
                attrNode.removeClass('on');
            });
        });
    };

    return customElement;
});
