/**
 * @file mip-cxx 组件
 * @author 星辰
 */
define(function (require) {
    var $ = require('zepto');
    $('.middle,.bottom').hide();
    $('.comment mip-img').attr('src', '/getcode.asp?time=' + Math.random());
    $('.comment .text').click(function () {
        $('.middle,.bottom').show();
    });
    $('.cancel').click(function () {
        $('.middle,.bottom').hide();
    });

    $('.tjbutton').click(function () {
        var msg = $.trim($('.comment .text').val());
        var csoftid = $('#SOHUCS').attr('sid');
        if (msg.length < 3 || msg.lenght > 200) {
            alert('评论的内容不能小于3或大于200个字符！');
            $('.comment .text').focus();
            return false;
        }
        var imgcode = $.trim($('.yzm').val());
        if (imgcode === '') {
            alert('请输入验证码！');
            $('.yzm').focus();
            return false;
        }
        $.post('/postfrm_ajax.asp', {
            comment: (msg),
            softid: csoftid,
            pImgCode: escape(imgcode),
            ctype: 1
        },
        function (data) {
            if (data === 'code') {
                alert('验证码错误，请重新输入！');
                $('.yzm').focus();
                $('.comment mip-img').attr('src', '/getcode.asp?time=' + Math.random());
            } else if (data === 'OK') {
                $('.comment .text').focus();
                $('.comment .text').val('');
                $('.yzm').val('');
                alert('你的评论发表成功，需要审核才能显示！');
            } else {
                alert('数据提交出错！');
            }
        });
    });
});