/**
 * @file mip-addact-btn 组件
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
        // TODO
        //	获取this
        var myThis = this.element;
        //	获取元素
        var maolinka = myThis.querySelectorAll('.mip-btn-maolink-a');
        //  click事件

        for (var i = 0; i < maolinka.length; i++) {
            maolinka[i].addEventListener('click', function (e) {
                $(this).addClass('active').siblings().removeClass('active');
            });
        }

    };

    return customElement;
});
