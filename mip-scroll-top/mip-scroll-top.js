/**
 * @file mip-scroll-top 组件
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
        var ele = this.element;
        window.addEventListener('scroll', function () {
            // console.log(document.documentElement.scrollTop)
            // console.log(ele.offsetHeight)
            if (document.documentElement.scrollTop >= ele.offsetHeight) {
                ele.classList.add('active');
            }
            else {
                ele.classList.remove('active');
            }
        });
    };
    return customElement;
});
