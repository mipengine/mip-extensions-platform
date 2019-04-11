/**
 * @file mip-qqtn-ku
 * 一行有存在6个栏目的情况，并且名称都是调用读取出来的，想要一行显示不重叠只能隐藏文字做区分
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        $(ele).find('.g-game-nav li').each(function () {
            var navName = $(this).find('a').text();
            if (navName === '新闻公告') {
                $(this).find('a').text('新闻');
            } else if (navName === '攻略秘籍') {
                $(this).find('a').text('攻略');
            } else if (navName === '游戏问答') {
                $(this).find('a').text('问答');
            } else if (navName === '游戏下载') {
                $(this).find('a').text('下载');
            } else if (navName === '辅助工具') {
                $(this).find('a').text('辅助');
            } else if (navName === '使用教程') {
                $(this).find('a').text('教程');
            } else if (navName === '常见问题') {
                $(this).find('a').text('问题');
            } else if (navName === '软件下载') {
                $(this).find('a').text('下载');
            }
        });
        // 并且栏目为4个的时候添加class名称附加其他样式标签
        var kunav = $(ele).find('.g-game-nav li').length;
        if (kunav === 4) {
            $(ele).find('.g-game-nav').addClass('kuico');
        }
    };
    return customElement;
});



