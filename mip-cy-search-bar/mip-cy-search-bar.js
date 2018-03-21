/**
 * @file mip-cy-search-bar 组件
 * @author 春雨前端开发组
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.build = function () {
        var $ele = $(this.element);
        var placeholder = $ele.attr('placeholder') || '';
        var inputVal = $ele.attr('input-val') || '';
        var replace = $ele.attr('replace');
        var html = [
            '<div class="mip-cy-search-wrap">',
            '<input type="search" id="mip-cy-query" ',
            'placeholder="' + placeholder + '"',
            'value="' + inputVal + '">',
            '<button id="mip-cy-search"></button>',
            '</div>'
        ].join('');

        $ele.html(html);
        $('#mip-cy-search').on('click', function () {
            var url = $.trim($ele.attr('url')) || '';
            var index = url.indexOf('?');
            var paramName = $ele.attr('param-name') || 'query';
            var query = $.trim($('#mip-cy-query').val());
            var param = paramName + '=' + query;
            if (index === -1) {
                url += '?';
            }
            else {
                url += '&';
            }
            if (replace) {
                window.location.replace(url + param);
            }
            else {
                window.location.href = url + param;
            }
        });
    };

    return customElement;
});
