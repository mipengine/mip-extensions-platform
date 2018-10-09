/**
 * @file mip-trade 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        function extend(firstChange, changeNum, changeObj) {
            // 代表第一次换的是第二组
            var listitem = firstChange;
            // 这是要换的批数
            var listitemmax = changeNum;
            $(changeObj).click(function () {
                $('.menuchange' + listitem).siblings('ul').css('display', 'none');
                $('.menuchange' + listitem).css('display', 'block');
                if (listitem < listitemmax) {
                    listitem++;
                }
                else {
                    listitem = 1;
                }
            });
        }
        extend(2, 3, '.mexClick');
    };

    return customElement;
});
