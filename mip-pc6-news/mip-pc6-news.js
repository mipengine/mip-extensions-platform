/**
 * @file mip-pc6-news 组件
 * @author fl
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var browser = {
        versions: (function () {
            var u = navigator.userAgent;
            return {
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                android: u.indexOf('Android') > -1, // android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, // 是否iPad
                ios9: u.indexOf('iPhone OS 9') > -1,
                MQQBrowser: u.indexOf('MQQBrowser') > -1, // 是否MQQBrowser
                UCBrowser: u.indexOf('UCBrowser') > -1, // UCBrowser
                Safari: u.indexOf('Safari') > -1
            };
        })(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    var news = {
        nextPage: function () {
            var href = $('.xgwz li').eq(0).find('a').attr('href');
            if ($('body.xspage').length > 0) {
                if ($('.dbtns a').length > 0) {
                    var xslink = $('.dbtns a').attr('href');
                    var dpt;
                    if (browser.versions.ios) {
                        dpt = 'ios';
                    }
                    if (browser.versions.android) {
                        dpt = 'android';
                    }
                    if (dpt) {
                        $('.dbtns a').attr('href', xslink + '&device=' + dpt);
                    }
                }
                $('.wzlist').append('<div class="newsnext"><a href="' + href + '">下一页</a></div>');
            }
            else {
                $('.wzlist .con').append('<div class="newsnext"><a href="' + href + '">下一页</a></div>');
            }
        },
        rank: function () {
            if ($('.rank').length > 0) {
                var k = this;
                $('.rank .list').each(function () {
                    $(this).find('li').hide().slice(0, 4).show();
                });
                $('.tab-panel ul li').parents('section').children('.tab-content').hide().eq(1).show();
                $('.tab-panel ul li').click(function () {
                    $(this).parents('section').children('.tab-content').hide().eq($(this).index()).show();
                    $(this).addClass('active').siblings().removeClass('active');
                    k.loadmore();
                });
                k.loadmore();
            }
        },
        loadmore: function () {
            $('.rank .tab-content').eq($('.rank .tab-panel li.active').index()).find('.lookmore').click(function () {
                var hnum = 0;
                var vnum = 0;
                for (var i = 0; i < $(this).prev().find('li').length; i++) {
                    if ($(this).prev().find('li').eq(i).css('display') === 'none') {
                        hnum++;
                    }
                    else {
                        vnum++;
                    }
                }
                if (hnum === 0) {
                    $(this).remove();
                }
                else {
                    $(this).prev().find('li').slice(0, vnum + 4).show();
                }
            });
        },
        show: function () {
            if ($('#historyver p').length === 0) {
                $('#historyver').remove();
            }
            if ($('#tcsyy li').length === 0) {
                $('#tcsyy').remove();
            }
            if ($('.hot_game a').length === 0) {
                $('.tjyxph').remove();
            }
            if ($('body').attr('show')) {
                $('.rank').remove();
            }
        },
        historyver: function () {
            var i = $('#historyver');
            var btn = i.find('.lookmore');
            btn.parent().children('p').hide().slice(0, 3).show();
            if (btn.parent().children('p').length < 3) {
                btn.remove();
            }
            btn.click(function () {
                if (!$(this).hasClass('expand')) {
                    btn.find('span').text('收起内容');
                    btn.parent().children().show();
                }
                else {
                    btn.find('span').text('展开全部');
                    btn.parent().children().hide().slice(0, 3).show();
                    btn.show();
                }
                $(this).toggleClass('expand');
            });
        },
        init: function () {
            this.nextPage(), this.show(), this.rank(), this.historyver();
        }
    };
    customElement.prototype.build = function () {
        news.init();
    };

    return customElement;
});
