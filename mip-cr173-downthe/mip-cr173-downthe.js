/**
 * @file  根据下载大小判断是否有下载，如果没有下载地址去掉下载按钮效果，并且无法点击。
 * 1.0.2 升级，优化改变形式，避免影响页面原有样式。
 * @author gom
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var downurla = $(ele).find('.m-down-ul li a').attr('href');
        var downsize = $(ele).find('.f-game-size').text();
        var weburl = ele.getAttribute('data-downurl');
        if (downurla !== undefined && downsize !== undefined) {
            if (downurla === weburl || downsize === '0KB' || downsize === '1KB') {
                $(ele).find('.m-down-ul li').addClass('nodown');
                $(ele).find('.m-down-ul li a').text('暂无下载').attr('href', 'javascript:;');
            };
        };
        var themeSize = $(ele).find('.g-keyword-cont').length;
        if (themeSize > 0) {
        // 有数据则执行
            var keyName = '';
            var i;
            for (i = 0; i < themeSize; i++) {
                keyName += '<li><b>' + $(ele).find('.g-keyword-cont').eq(i).find('dl dt').html() + '</b><i></i></li>';
            };
            $(ele).find('.g-keyword-btn').append(keyName);
        }
        $(ele).find('#tab-div .m-tab-cont').hide().eq(0).show();
        // 隐藏并且显示前边的
        $(ele).find('#tab-nav li').eq(0).addClass('m-hover');
        // 将第一个按钮加上css
        $(ele).find('#tab-nav li').click(function () {
            $(ele).find('#tab-nav li').removeClass('m-hover');
            $(this).addClass('m-hover');
            var btnin =  $(this).index();
            $(ele).find('#tab-div .m-tab-cont').hide();
            $(ele).find('#tab-div .m-tab-cont').eq(btnin).show();
        });
        var keyurl = ele.getAttribute('data-sourl');
        if (keyurl !== undefined) {
        // 获取到才执行
            $(ele).find('.search-button').click(function () {
                sousuo();
            });
            $(ele).find('.search-input').keyup(function () {
                if (event.keyCode === 13) {
                    sousuo();
                };
            });
        }
        function sousuo() {
            var keyFont = $(ele).find('.search-input').val();
            var openUrl = '';
            if (keyFont !== '') {
                if (keyFont.indexOf('_') === -1 && keyFont.indexOf('http:') === -1) {
                    if (/android/i.test(navigator.userAgent)) {
                        openUrl = keyurl + '/search/md/' + keyFont + '_android_rank.html';
                    } else {
                        openUrl = keyurl + '/search/md/' + keyFont + '_ios_rank.html';
                    }
                    window.location.href = openUrl;
                    // 点击搜索按钮，跳转到自己的搜索结果页
                } else {
                    alert('包含非法字符"_"或者"http"');
                }
            } else {
                window.location.href = keyurl + '/mindex.html';
                // 空值的时候跳转到自己的搜索结果首页
            };
        }
    };
    return customElement;
});
