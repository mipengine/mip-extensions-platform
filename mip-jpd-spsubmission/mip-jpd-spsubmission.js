/**
 * @file mip-jpd-spsubmission 组件
 * @author zc
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    'use strict';
    customElement.prototype.build = function () {
        var oA = '/vshop/Order/CreateOrder.html?buyFrom=1';
        var ele = this.element;
        var oAs = ele.querySelectorAll('#goodFA input');
        var oBj = ele.querySelector('#links');
        // 绑定事件，其它元素可通过 on="xxx" 触发
        this.addEventAction('JPD_event', function (event, str) {
            var eventOne = function () {
                location.href = oA
                                + '&productId='
                                + oAs[1].value
                                + '&goods_no='
                                + oAs[2].value
                                + '&count='
                                + oAs[0].value;
                oBj.href = oA + '&productId=' + oAs[1].value + '&goods_no=' + oAs[2].value + '&count=' + oAs[0].value;
                oBj.click();
            };
            eventOne();
        });
    };
    return customElement;
});