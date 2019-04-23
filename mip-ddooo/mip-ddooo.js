/**
 * @file mip-ddooo 组件
 * @author sun
 */
define(function (require) {
    var $ = require('zepto');
    var b = 0;
    var n = 0;
    var PageType = 'asp';
    if ($('#SOHUCS').length > 0) {
        if ($('#SOHUCS').attr('PageType') !== undefined) {
            PageType = $('#SOHUCS').attr('PageType');
        }
    }
    $('.SearchBox').click(function () {
        if (0 === b) {
            $('#mclassifyCont').css({display: 'none'});
            $('.searchDiv').css({display: 'block'});
            $('.searchDivinput').focus();
            b = 1;
            n = 0;
        }
        else {
            if (n === 1) {
                $('#mclassifyCont').css({display: 'none'});
                n = 0;
            }
            else {
                $('nav').animate({height: 40}, 100);
                $('.searchDiv').css({display: 'none'});
                b = 0;
            }
        }
    });
    $('#mclassify').click(function () {
        if (0 === n) {
            $('#mclassifyCont').css({display: 'block'});
            $('#nav .pullNav').removeClass('open');
            $('#nav .moreNav').css({display: 'none'});
            n = 1;
        }
        else {
            $('#mclassifyCont').css({display: 'none'});
            n = 0;
        }
    });
    $('#mclassifyCont p span').click(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        var e = $('#mclassifyCont p span').index(this);
        $('#mclassifyCont ul').eq(e).addClass('on').siblings().removeClass('on');
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $('.fixNav').css({display: 'block'});
        }
        else {
            $('.fixNav').css({display: 'none'});
        }
        if ($(window).scrollTop() > 300) {
            $('#Cbacktop').css({display: 'block'});
        }
        else {
            $('#Cbacktop').css({display: 'none'});
        }
        if ($('.ztheader').length > 0) {
            if ($(window).scrollTop() > 150) {
                $('.ztheader .hClass').css({top: 10, position: 'fixed'});
                $('.ztheader .hKeyList').css({top: 45, position: 'fixed'});
            }
            else {
                $('.ztheader .hClass').css({top: 120, position: 'absolute'});
                $('.ztheader .hKeyList').css({top: 195, position: 'absolute'});
            }
            if ($(window).scrollTop() > 180) {
                $('.hKeyList').css({position: 'fixed', height: 90, top: 0, 'border-bottom': '1px dashed #ccc'});
                $('.hKeyList p').css({position: 'relative', top: 48});
                $('.ztheader img,.ztheader .hContent').css({display: 'none'});
            }
            else {
                $('.hKeyList').css({position: 'relative', top: 195, height: 45, 'border-bottom': '0px dashed #ccc'});
                $('.hKeyList p').css({position: 'relative', top: 0});
                $('.ztheader img,.ztheader .hContent').css({display: 'block'});
            }
        }
    });
    $('#Cbacktop').click(function () {
        $('html').scrollTop(0);
    });
    $('.DContNavTab li').click(function () {
        $(this).addClass('m-hover').siblings('li').removeClass('m-hover');
        var n = $(this).index();
        if (n === 0) {
            $('#wrapper,.DSContent,#DSContent,#descript,.hqCTitle,.jptjApp,.oryverbox,#JPContent').show();
        }
        if (n === 1) {
            $('#wrapper,.DSContent,#DSContent').hide();
            $('#descript,.hqCTitle,.jptjApp,.oryverbox,#JPContent').show();
        }
        if (n === 2) {
            $('#wrapper,.DSContent,#DSContent,#descript,.hqCTitle,.jptjApp,.oryverbox,#JPContent').hide();
        }
    });
    var dbp = $('.oryverlist p').length;
    if (dbp > 3 && dbp !== 0) {
        $('.oryverlist').css({height: 152});
        $('#BBContent').show();
    }
    else {
        $('#BBContent').hide();
    }
    var xgtjheight = $('.xgtj .xgtjlist li').length;
    if (xgtjheight > 10) {
        $('.xgtj .xgtjlist').css({height: 810});
        $('#xgtjlist').css({display: 'block'});
    }
    else {
        $('.xgtj .xgtjlist').css({height: 'auto'});
    }
    var xgwzheight = $('.mation .xgwzlist li').length;
    if (xgwzheight > 10) {
        $('.mation .xgwzlist').css({height: 400});
        $('#xgwzlist').css({display: 'block'});
    } else {
        $('.mation .xgwzlist').css({height: 'auto'});
    }
    if ($('.DSContent').height() > 309) {
        $('#DSContent').css({display: 'block'});
    } else {
        $('#DSContent').css({display: 'none'});
    }
    function trim(s) {
        return s.replace(/(^\s*)|(\s*$)/g, '');
    }
    $('.lookmore').click(function () {
        var btnText = trim($(this).text());
        if (btnText === '更多其它版本') {
            $('.oryverlist').css({height: 'auto'});
            $(this).html('<span>收起其它版本</span><i class=\'cur\'></i>');
        }
        if (btnText === '收起其它版本') {
            $('.oryverlist').css({height: 152});
            $(this).html('<span>更多其它版本</span><i></i>');
        }
        if (btnText === '展开全部内容') {
            $('.DSContent').css({'max-height': '100%'});
            $(this).html('<span>收起内容</span><i class=\'cur\'></i>');
        }
        if (btnText === '收起内容') {
            $('.DSContent').css({'max-height': 315});
            $(this).html('<span>展开全部内容</span><i></i>');
        }
        if (btnText === '点击查看更多') {
            $('.xgtjlist').css({height: 'auto'});
            $(this).html('<span>收起相关软件</span><i class=\'cur\'></i>');
        }
        if (btnText === '收起相关软件') {
            $('.xgtjlist').css({height: 810});
            $(this).html('<span>点击查看更多</span><i></i>');
        }
        if (btnText === '查看更多资讯') {
            $('.xgwzlist').css({height: 'auto'});
            $(this).html('<span>收起相关资讯</span><i class=\'cur\'></i>');
        }
        if (btnText === '收起相关资讯') {
            $('.xgwzlist').css({height: 400});
            $(this).html('<span>查看更多资讯</span><i></i>');
        }
    });
    $('.CRCSTitleC li.tab-item').click(function () {
        var numm = $(this).attr('did');
        $('.CRCSTitleC li.tab-item').removeClass('cur');
        $(this).addClass('cur');
        $('.guessCont').hide();
        $('.guessCont').eq(numm).show();
    });
    $('.plbutton').hide();
    $('.plbutton mip-img').attr('src', '/getcode.' + PageType + '?time=' + Math.random());
    $('#pltext').click(function () {
        $('.plbutton').show();
    });
    $('.cancel').click(function () {
        $('.plbutton').hide();
    });
    $('.tjbutton').click(function () {
        var msg = $.trim($('#pltext').val());
        var temsoftid = $('#SOHUCS').attr('sid');
        if (msg.length < 3 || msg.lenght > 200) {
            $('#alertmes').html('评论的内容不能小于3或大于200个字符！');
            $('.hClassCont,.hClassContDiv').css({display: 'block'});
            $('#pltext').focus();
            return false;
        }
        var imgcode = $.trim($('.yzm').val());
        if (imgcode === '') {
            $('#alertmes').html('请输入验证码！');
            $('.hClassCont,.hClassContDiv').css({display: 'block'});
            $('.yzm').focus();
            return false;
        }
        $.post('/postfrm_ajax.' + PageType, {
            comment: (msg),
            softid: temsoftid,
            pImgCode: escape(imgcode)
        },
        function (data) {
            if (data === 'code') {
                $('#alertmes').html('验证码错误，请重新输入！');
                $('.hClassCont,.hClassContDiv').css({display: 'block'});
                $('.yzm').focus();
                $('.plbutton mip-img').attr('src', '/getcode.' + PageType + '?time=' + Math.random());
            }
            else if (data === 'OK') {
                $('#pltext').focus();
                $('#pltext').val('');
                $('.yzm').val('');
                $('#alertmes').html('你的评论发表成功，需要审核才能显示！');
                $('.hClassCont,.hClassContDiv').css({display: 'block'});
            }
            else {
                $('#alertmes').html('数据提交出错！');
                $('.hClassCont,.hClassContDiv').css({display: 'block'});
            }
        });
    });
    $('.ztheader .hContent,.ztheader .hClass').click(function () {
        $('.hClassCont,.hClassContDiv').css({display: 'block'});
    });
    $('.hClassContDiv,.hClassContDiv span').click(function () {
        $('.hClassCont,.hClassContDiv').css({display: 'none'});
    });
    $('.SBBtn').click(function () {
        var sV = $('.SBInp input').val();
        if (sV.length < 2) {
            $('#alertmes').html('请输入搜索词！');
            $('.hClassCont,.hClassContDiv').css({display: 'block'});
            return false;
        }
        var forpath = '/search.' + PageType + '?wd=' + encodeURI(sV);
        window.location.href = forpath;
    });
});
