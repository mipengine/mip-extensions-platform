/**
 * @file mip-zol-histogram 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    function render(element) {
        // 获取所有运动元素
        var elementItem = element.querySelectorAll('.global-gradient');
        elementItem.forEach(function (item) {

            // 获取当前元素分数

            // console.log(item);
            var elementpercentage = item.getAttribute('data-val');
            item.style.width = 0;
            setTimeout(function () {
                item.style.width = parseInt(elementpercentage, 10) + '%';
            }, 30);
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        render(element);

        // 点击重新刷新
        this.addEventAction('refresh', function () {
            render(element);
        });
    };
    return customElement;
});
