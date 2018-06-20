/**
 * @file mip-anlian-search 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');

    // 第一次进入可视区回调，只会执行一次
    customElement.prototype.firstInviewCallback = function () {
        var $element = $(this.element);
        var tabTit = $element.find('.tab-tit');
        var close = $element.find('.close');
        var zhe = $element.find('.zhe');
        var item = $element.find('.item');
        var moreListSpan = $element.find('.more-list span');
        var reset = $element.find('.reset');
        var ok = $element.find('.ok');
        var moreListNr = $element.find('.more-list .nr');
        var moreListOn = $element.find('.more-list .on');
        var zheTabTit = $element.find('.zhe .tab-tit');
        tabTit.on('click', function () {
            var e = $(this);
            var a = '.' + e.data('type');
            return $('.zhe div[data-type=\'' + e.data('type') + '\']')
                .children('i').hasClass('act') ? (close.click(),
                zheTabTit.children('i').removeClass('act'),
                void zheTabTit.children('h2').removeClass('blu'))
                : (zhe.hasClass('hidden') && (zhe.removeClass('hidden'),
                $('body').addClass('noscro')), zheTabTit.children('i').removeClass('act'),
                $('.zhe div[data-type=\'' + e.data('type') + '\']').children('i').addClass('act'),
                zheTabTit.children('h2').removeClass('blu'),
                $('.zhe div[data-type=\'' + e.data('type') + '\']').children('h2').addClass('blu'),
                void setTimeout(function () {
                    item.removeClass('active').siblings(a).addClass('active');
                }, 20));
        });
        close.on('click', function () {
            zhe.addClass('hidden');
            item.removeClass('active');
            $('body').removeClass('noscro');
        });
        moreListSpan.on('click', function () {
            $(this).addClass('on').siblings('span').removeClass('on');
        });
        reset.on('click', function () {
            moreListSpan.removeClass('on');
            moreListNr.addClass('on');
        });
        ok.on('click', function () {
            var e = {};
            moreListOn.each(function (a, t) {
                var s = $(t).attr('data-va');
                switch ('不限' === s && (s = ''), a) {
                    case 0:
                        e.area = s;
                        break;
                    case 1:
                        e.rooms = s;
                        break;
                    case 2:
                        e.totalprice = s;
                        break;
                    case 3:
                        e.fitment = s;
                        break;
                    case 4:
                        e.property = s;
                        break;
                    case 5:
                        e.houseType = s;
                        break;
                    case 6:
                        e.size = s;
                        break;
                    case 7:
                        e.sort = s;
                }
            });
            var a = 'rooms=' + e.rooms + '&size=' + e.size + '&fitment='
            + e.fitment + '&house_type=' + e.houseType + '&property=' + e.property
            + '&area=' + e.area + '&totalprice=' + e.totalprice + '&sort=' + e.sort;
            var t = 'http://' + location.host + location.pathname + '?' + a;
            window.location.href = t;
        });
    };

    return customElement;
});
