/**
 * @file mip-qqtn-txtab 组件.对页面中图片排版进行修改，
 * 针对头像进行大小图、圆形图切换，增加头像的用户体验,
 * @author gom3250@qq.com.
 * @version 1.0.3 修复由于MIP v2 的图片会增加<mip-i-space style='display: block;'>space</mip-i-space>引起的文本变多的问题
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var imgurl = '';
        var addcount = '<div class="m-touxiang"><div class="clearfix m-imgul"></div></div>';
        var imgtt = '<div class="m-tabimg clearfix" id="m-tabs"><div class="f-fl img_menu">';
        imgtt += '<a href="javascript:;" class="m-hover" id="b_pic">大图</a><a href="javascript:;" id="s_pic">';
        imgtt += '小图</a></div><div class="f-fr img_menu"><a href="javascript:;" class="m-hover" id="f_pic">方图</a>';
        imgtt += '<a href="javascript:;" id="r_pic">圆图</a></div></div>';
        var ele = this.element;
        var contenp = $(ele).find('#content');
        var toutext = contenp.find('p').text();
        var toutext = toutext.replace(/space/g, '');
        contenp.wrapAll(addcount);
        $(ele).find('.m-touxiang').prepend(imgtt);
        contenp.find('.m-imgul p').each(function (i) {
            // 将原始文字部分隐藏
            imgurl = $(this).find('mip-img').length;
            if (imgurl < 1) {
                $(this).hide();
            }
        });
        $(ele).find('.img_menu').each(function () {
            // 切换效果
            $(this).find('a').click(function () {
                $(this).siblings().removeClass('m-hover');
                $(this).addClass('m-hover');
            });
        });
        $(ele).find('#b_pic').click(function () {
            // 大图操作
            contenp.find('.m-imgul p').css({'width': '50%', 'padding': '1%'});
        });
        $(ele).find('#s_pic').click(function () {
            // 小图操作
            contenp.find('.m-imgul p').css({'width': '25%', 'padding': '2.5%'});
        });
        $(ele).find('#f_pic').click(function () {
            // 方图操作
            contenp.find('.m-imgul p img').css('border-radius', '6px');
        });
        $(ele).find('#r_pic').click(function () {
            // 圆图操作
            contenp.find('.m-imgul p img').css('border-radius', '50%');
        });
        // 处理内容的文字
        $(ele).find('.g-cont p').last().after('<p class="m-imgtxt">' + toutext + '</p>');
    };
    return customElement;
});