/**
 * @file mip-imgUrl 组件
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
        var src = $('mip-imgUrl mip-img').attr('src');
        var defaultimgUrl = $('mip-imgUrl #defaultImg').attr('src');
        console.log(src);
        if (src === '') {
            $('mip-imgUrl mip-img').attr('src', defaultimgUrl);
        }

    };

    return customElement;
});
