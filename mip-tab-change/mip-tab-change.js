/**
 * @file mip-tab-change 组件
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
        var str1 = ele.getAttribute('lName');
        var str2 = ele.getAttribute('cName');
        ele.addEventListener('click', function (e) {
            var childArr = ele.children;
            for (var i = 0, j = childArr.length; i < j; i++) {
                childArr[i].className = str1;
            }
            var num = e.target.dataset.and;
            e.target.className = str1 + ' active';
            var content = document.getElementById(ele.getAttribute('target'));
            var contentArr = content.children;
            for (i = 0; i < j; i++) {
                if (i !== num - 0) {
                    contentArr[i].className = str2;
                } else {
                    contentArr[i].className = str2 + ' active';
                }
            }
        });
    };

    return customElement;
});
