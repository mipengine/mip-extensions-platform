/**
 * @file mip-goup-page 组件
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
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }, false);

	// 当网页向下滑动 20px 出现"返回顶部" 按钮
        window.onscroll = function () {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
                ele.style.display = 'block';
            }
            else {
                ele.style.display = 'none';
            }
        }
    // TODO
    };

    return customElement;
});
