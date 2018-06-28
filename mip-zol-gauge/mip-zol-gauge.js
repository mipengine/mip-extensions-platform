/**
 * @file mip-zol-gauge 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    function refresh(element) {
        var val = element.getAttribute('data-val');
        var pointer = element.querySelectorAll('.pointer')[0];
        var deg = ((parseInt(val, 10) - 4000) * 244) / 6000;

        // console.log(deg);
        pointer.style.transform = 'rotate(-1deg)';
        setTimeout(function () {
            pointer.style.transform = 'rotate(' + deg + 'deg)';
        }, 30);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        refresh(element);

        // 点击重新刷新
        this.addEventAction('gauge_refresh', function () {
            refresh(element);
        });
    };

    return customElement;
});
