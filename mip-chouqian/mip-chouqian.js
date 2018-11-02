/**
 * @file mip-chouqian 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var btn = $('#CQ_BTN');
    btn.click(function () {
        var state = $(this).attr('href');
        if (state.length === 0) {
            $('#CQ_JG')
                .css('visibility', 'visible')
                .text('正在抽签...');
            setTimeout(function () {
                var QianHao = getRadom();
                var qianwen = 'show.html?id=' + QianHao;
                $('#CQ_JG').text('您抽到了第' + QianHao + '签');
                $('#CQ_BTN').removeClass('start').addClass('show').attr('href', qianwen);
            }, 5000);
            return false;
        };
    });

    $('#seeMore').click(function () {
        $('.chouqian_list').css('max-height', 'none');
        $('.chouqian_more').hide();
    });

    // 根据页面去返回随机数
    function getRadom() {
        var url = location.pathname;
        switch (url) {
            case '/chouqian/guanyinlingqian/':
                return Math.floor(Math.random() * 100 + 1);
                break;
            case '/chouqian/guandilingqian/':
                return Math.floor(Math.random() * 100 + 1);
                break;
            case '/chouqian/yuelaolingqian/':
                return Math.floor(Math.random() * 100 + 1);
                break;
            case '/chouqian/lvzulingqian/':
                return Math.floor(Math.random() * 100);
                break;
            case '/chouqian/huangdaxian/':
                return Math.floor(Math.random() * 100 + 1);
                break;
            case '/chouqian/mazulingqian/':
                return Math.floor(Math.random() * 60 + 1);
                break;
            case '/chouqian/chegonglingqian/':
                return Math.floor(Math.random() * 96 + 1);
                break;
            case '/chouqian/wanggonglingqian/':
                return Math.floor(Math.random() * 50 + 1);
                break;
            case '/chouqian/yuelaoyinyuan/':
                return Math.floor(Math.random() * 60);
                break;
            case '/chouqian/yuexialaoren/':
                return Math.floor(Math.random() * 60);
                break;
        }
    }
    return customElement;
});
