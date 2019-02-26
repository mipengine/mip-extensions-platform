/**
 * @file mip-258-product 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;

        ele.addEventListener('click', function () {
            var target = ele.getAttribute('target');
            var price = ele.getAttribute('change-price');
            var len = document.getElementsByTagName('mip-change-price').length;
            for (var i = 0; i < len; i++) {
                if (document.getElementsByTagName('mip-change-price')[i].className.indexOf('active') !== -1) {
                    document.getElementsByTagName('mip-change-price')[i].classList.remove('active');
                }
            }
            ele.classList.add('active');
            if (price.indexOf('￥') === -1) {
                price = '￥' + price;
            }
            if (price.indexOf('.') === -1) {
                price = price + '.00';
            }
            document.getElementById(target).innerHTML = price;
        });
    };

    return customElement;
});
