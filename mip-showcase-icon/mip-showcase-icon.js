/**
 * @file mip-showcase-icon 组件
 * @author zhuguoxi
 * @description 此组件只为showcase，请勿在正式产品使用。
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();

    // 需要提前显示占位
    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        var ele = me.element;

        var type = ele.getAttribute('type');
        ele.innerHTML = '<svg class=\'rt-svg-icon\'> <use xlink:href=\'#' + type + '\' /></svg>';
    };

    return customElement;
});
