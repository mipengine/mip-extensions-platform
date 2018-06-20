/**
 * @file mip-anlian-public 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');

    // 第一次进入可视区回调，只会执行一次
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var searchShow = $(element).find('.searchShow');
        var headerSearchbox = $(element).find('.header-searchbox');
        var searchCancelBtn = $(element).find('.search-cancel-btn');
        var searchclose = $(element).find('.searchclose');
        var searchKeyword = $(element).find('#searchKeyword');
        searchShow.on('click', function () {
            headerSearchbox.show();
            $('body').addClass('noscro');
        });
        searchCancelBtn.on('click', function () {
            headerSearchbox.hide();
            $('body').removeClass('noscro');
            searchKeyword.val('');
        });
        searchclose.on('click', function () {
            headerSearchbox.hide();
            $('body').removeClass('noscro');
            searchKeyword.val('');
        });
        searchKeyword.on('keydown', function () {
            if (13 === event.keyCode) {
                var e = $(searchKeyword).val();
                var o = 'key=' + e;
                var c = 'http://' + location.host + '/search.php?' + o;
                window.location.href = c;
            }
        });
    };
    return customElement;
});


