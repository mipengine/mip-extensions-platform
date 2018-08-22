/**
 * @file mip-cyb-top 华彩控制导航返回|搜索
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var e = $(this.element);
        e.find('.back').on('click', function () {
            history.go(-1);
        });

        // 搜索表单显示
        e.find('.topright').on('click', function () {
            e.find('.topmid').hide();
            e.find('.topright').hide();
            e.find('.topsear').show();
        });

        // 搜索结果
        e.find('.sebtn').on('click', function () {
            var keyword = e.find('#keyword').val();
            var url = '';
            url += 'http://so.huacolor.com/cse/search?q=';
            location.href = url + keyword + '&s=10259208612751811821&entry=1';
        });

        // 顶部返回顶部
        e.find('.jq-gotop').on('click', function () {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
        });
        e.find('#viewPage').on('click', function () {
            var dqurl = window.location.pathname;
            window.location.href = 'http://www.huacolor.com' + dqurl + '#fromapp';
        });
    };
    return customElement;
});
