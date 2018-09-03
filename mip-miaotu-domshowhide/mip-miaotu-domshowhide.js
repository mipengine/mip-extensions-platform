/**
 * @file mip-miaotu-domshowhide 组件
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
        var btn = ele.querySelector('.clickme-hide-show');
        var displaynone = ele.querySelectorAll('.displaynone');
        var displayblock = ele.querySelectorAll('.displayblock');
        btn.addEventListener('click', function () {
            for (var i = 0; i < displaynone.length; i++) {
                displaynone[i].style.display = 'none';
            }
            for (var i = 0; i < displayblock.length; i++) {
                displayblock[i].style.display = 'block';
            }
        }, false);
    };

    return customElement;
});
