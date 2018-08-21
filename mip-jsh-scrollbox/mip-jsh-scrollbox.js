/**
 * @file mip-jsh-scrollbox 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        element.style.width = element.dataset.width;

        var eleBegin = element.querySelectorAll('._begin')[0];
        var eleEnd = element.querySelectorAll('._end')[0];
        var speed = element.dataset.speed || 50;

        eleEnd.innerHTML = eleBegin.innerHTML;

        function marquee() {
            if (element.scrollLeft - eleEnd.offsetWidth >= 0) {
                element.scrollLeft = 0;
            }
            else {
                element.scrollLeft++;
            }
        }

        window.setInterval(marquee, speed / 1);
    };

    return customElement;
});
