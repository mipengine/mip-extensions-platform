/**
 * @file mip-hs-searchword 组件
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
        var $el = $(this.element);
        $el.find('.ser_btn').on('click', function () {
            var serword = $('.serch_go').val();
            if (serword !== '') {
                window.top.location.href = '/search?keyword=' + serword;
            }
            else {
                return alert('搜索内容不能为空！');
            }
        });
    };

    return customElement;
});
