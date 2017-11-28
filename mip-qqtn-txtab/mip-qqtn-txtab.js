/**
 * @file mip-qqtn-txtab 组件.对页面中图片排版进行修改，针对头像进行大小图、圆形图切换，增加头像的用户体验,由于需要对图片进行操作，所以使用的build
 * @author gom3250@qq.com.
 * @version 1.0.0
 */

define(function (require) {
    var $ = require('zepto');
    var toutext = $('#content').text();
    var imgurl = '';
    var customElement = require('customElement').create();
    function txtab() {
        var addcount = '<div class="m-touxiang"><div class="clearfix m-imgul"></div><p class="m-imgtxt"></p></div>';
        var imgtt = '<div class="m-tabimg clearfix" id="m-tabs"><div class="f-fl img_menu">';
        imgtt += '<a href="javascript:;" class="m-hover" id="b_pic">大图</a><a href="javascript:;" id="s_pic">';
        imgtt += '小图</a></div><div class="f-fr img_menu"><a href="javascript:;" class="m-hover" id="f_pic">方图</a>';
        imgtt += '<a href="javascript:;" id="r_pic">圆图</a></div></div>';
        $('#content p').wrapAll(addcount);
        $('.m-touxiang').prepend(imgtt);
        $('.m-imgul p').each(function (i) {
            // 将原始文字部分隐藏
            imgurl = $(this).text();
            if (imgurl !== '') {
                $(this).hide();
            }
        });
        $('.img_menu').each(function () {
            // 切换效果
            $(this).find('a').click(function () {
                $(this).siblings().removeClass('m-hover');
                $(this).addClass('m-hover');
            });
        });
        $('#b_pic').click(function () {
            // 大图操作
            $('.m-imgul p').css({'width': '50%', 'padding': '1%'});
        });
        $('#s_pic').click(function () {
            // 小图操作
            $('.m-imgul p').css({'width': '25%', 'padding': '2.5%'});
        });
        $('#f_pic').click(function () {
            // 方图操作
            $('.m-imgul p img').css('border-radius', '6px');
        });
        $('#r_pic').click(function () {
            // 圆图操作
            $('.m-imgul p img').css('border-radius', '50%');
        });
        // 处理内容的文字
        $('.m-imgtxt').append(toutext);

    }
    customElement.prototype.build = function () {
        txtab();
    };
    return customElement;
});