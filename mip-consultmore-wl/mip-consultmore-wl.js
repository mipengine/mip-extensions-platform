/**
 * @file mip-consultmore-wl 组件
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
        var ele = $(this.element);
        var clickele = ele.find('#j-show-more');
        var sibele = ele.find('#j-analogy-box');
        var botbtn = ele.find('#j-more-bot');
        var moreBox = ele.find('#j-more-par');
        clickele.on('click', function () {
            moreBox.hide();
            sibele.show();
        });
        botbtn.on('click', function () {
            sibele.hide();
            moreBox.show();
        });
    };
    return customElement;
});