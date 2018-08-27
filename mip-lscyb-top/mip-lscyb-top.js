/**
 * @file mip-lscyb-top 绿色下载顶部菜单导航组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var e = $(this.element);
        e.find('#topcat').on('click', function () {
            e.find('#topcat-box').toggle();
        });
        e.find('#topcat-box p span').on('click', function () {
            $(this).addClass('cur').siblings().removeClass('cur');
            var a = e.find('#topcat-box p span').index(this);
            e.find('#topcat-box ul').eq(a).addClass('on').siblings().removeClass('on');
        });
        // 底部转pc
        e.find('#viewPage').on('click', function () {
            var dqurl = window.location.pathname;
            window.location.href = '//www.greenxiazai.com' + dqurl + '#fromapp';
        });
        // 搜索结果
        e.find('.bdcs-search-form-submit').on('click', function () {
            var keyword = e.find('#bdcs-search-form-input').val();
            if (keyword) {
                var url = '';
                url += '//m.greenxiazai.com/e/search/?';
                url += 'searchget=1&tbname=download&show=title,smalltext&tempid=tempid&keyboard=';
                location.href = url + keyword;
            }
            else {
                alert('请输入关键词');
            }
        });
    };
    return customElement;
});
