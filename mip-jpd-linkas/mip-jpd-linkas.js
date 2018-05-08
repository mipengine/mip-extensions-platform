/**
 * @file mip-jpd-linkas 组件
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
        var oSl = ele.querySelector('#input-num');
        // 绑定事件，其它元素可通过 on="xxx" 触发
        this.addEventAction('JPD_events', function (event, str) {
            if (oAs[2].value === '') {
                window.location.href = oA + '&productId=' + oAs[0].value
                    + '&goods_no=' + oAs[1].value
                    + '&count=' + oSl.value;
                oBj.href = oA + '&productId=' + oAs[0].value
                    + '&goods_no=' + oAs[1].value
                    + '&count=' + oSl.value;
                oBj.click();
            }
            else {
                /**
                 * 规格参数
                 */
                var oClas = ele.querySelector('.current');
                if (oClas && oClas.length !== 0) {
                    // console.log(oClas);
                    // var oSpecifications = oClas.innerHTML;
                    // console.log(oSpecifications);
                }
                else {
                    alert('请选择商品规格');
                    return;
                }
                window.location.href = oA + '&productId=' + oAs[0].value
                    + '&goods_no=' + oAs[1].value
                    + '&count=' + oSl.value;
                oBj.href = oA + '&productId=' + oAs[0].value
                    + '&goods_no=' + oAs[1].value
                    + '&count=' + oSl.value;
                oBj.click();
            }
        });
    };
    return customElement;
});
