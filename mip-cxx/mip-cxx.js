/**
 * @file mip-cxx 组件
 * @author 星辰
 */
define(function (require) {
    var $ = require('zepto');
    $('.middle,.bottom').hide();
    $('.comment .text').click(function () {
        $('.middle,.bottom').show();
    });
    $('.cancel').click(function () {
        $('.middle,.bottom').hide();
    });
    $.fn.nextAll = function (selector) {
        var nextEls = [];
        var el = this[0];
        if (!el) {
            return $([]);
        };
        while (el.nextElementSibling) {
            var next = el.nextElementSibling;
            if (selector) {
                if ($(next).is(selector)) {
                    nextEls.push(next);
                }
            } else {
                nextEls.push(next);
            }
            el = next;
        }
        return $(nextEls);
    };
    function downTab() {
        $('.tab li').click(function () {
            $(this).addClass('m-hover').siblings('li').removeClass('m-hover');
            var n = $(this).index();
            if (n === 0) {
                $('.tab').show();
                $('.tab').nextAll().show();
            }
            if (n === 1) {
                $('.tab').nextAll().hide();
                $('#interfix').show();
                $('#interfix').nextAll().show();
            }
            if (n === 2) {
                $('.tab').nextAll().hide();
                $('#interfix').nextAll().show();
            }
        });
    }
    downTab();
    function getCookie(objName) {
        var arrStr = document.cookie.split('; ');
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split('=');
            if (temp[0] === objName) {
                return unescape(temp[1]);
            }
        }
        return '';
    }
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toGMTString();
        document.cookie = cname + '=' + escape(cvalue) + '; ' + expires;
    }
    function tongji() {
        var softid = $('#SOHUCS').attr('sid');
        var flag = getCookie(softid);
        if (flag) {} else {
            $.post('/ajax_tongji.asp', {
                id: softid,
                type: 'tj'
            });
            setCookie(softid, 1, 1);
        }
    }
    if ($('.tongji').index() !== -1) {
        tongji();
    }
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