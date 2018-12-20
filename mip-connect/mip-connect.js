/**
 * @file mip-connect 锚链接
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
        var element = this.element;
        var cd = element.parentNode;
        var de = cd.parentNode;
        function naver(cObj, lBox) {
            $('cObj').on('click', function () {
                var index = $(this).index();
                de.classList.add('active');
                de.scrollTop = $('lBox').eq(index).offset().top;

            });
        }
        naver('#link_mlj li', '.link_main .mlj');
    };

    return customElement;
});
