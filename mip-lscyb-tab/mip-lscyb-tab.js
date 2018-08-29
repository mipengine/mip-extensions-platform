/**
 * @file mip-lscyb-top 绿色下载tab切换组件
 * @author chinayubo 415204@qq.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var e = $(this.element);
        // 首页hot tab切换
        e.find('.hot-soft-tab i').click(function () {
            $(this).addClass('cur').siblings().removeClass('cur');
            $(this).parent().parent().siblings().hide();
            $(this).parent().parent().siblings().eq($(this).index()).show();
        });
        // ntab 切换
        var ntab = e.find('#nTab');
        var npanel = e.find('.nPanel');
        console.log(ntab);
        if (ntab.length && e.find('.nPanel').length) {
            npanel.hide().first().show();
        }
        ntab.find('span').each(function (a) {
            $(this).click(function () {
                ntab.find('span').removeClass('cur').eq(a).addClass('cur');
                npanel.hide().eq(a).show();
            });
        });
    };
    return customElement;
});
