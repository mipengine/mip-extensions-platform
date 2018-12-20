/**
 * @file mip-mipcmb-select 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        function lists(Cindex, tabbox) {
            var listem = Cindex;
            var listpm = tabbox;
            $(listem).click(function () {
                var index = $(listem).index(this);
                $(listpm).eq(index).show().siblings().hide();
            });
        }
        lists('#nav li', '.select_cot');
    };

    return customElement;
});
