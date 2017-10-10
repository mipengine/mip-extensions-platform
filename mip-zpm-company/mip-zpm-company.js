/**
* @author: wangjx
* @date: 2017-04-19
* @file: mip-zpm-company.js
*/
define(function (require) {
    var $ = require('zepto');
    var render = function () {
        var $rightMore = $('.j_header .rightMore');
        var $btnmore = $('.prompt-menu .btn');
        var $cancel = $('.compaydetail-more .cancel');
        var $userinfo = $('#companydetail').attr('data-id');
        var $comNuber = $('#companydetail').attr('data-comnuber');
        var $compName = $('#companydetail').attr('data-compname');
        var $AttentionList = localStorage.getItem('AttentionList');
        var $BlockList = localStorage.getItem('BlockList');
        // 返回
        $('.r_returnbk').click(function () {
            window.history.back();
        });
        // logo
        $('.mip-replaced-content').css('border-radius', '50%');
        // 右上角更多操作,关闭
        if ($rightMore) {
            $rightMore.click(function () {
                event.preventDefault();
                event.stopPropagation();
                $('.moreactions').show();
                $('.prompt-menu').show();
            });
        }
        if ($btnmore) {
            $btnmore.click(function () {
                $('.moreactions').hide();
                $('.prompt-menu').hide();
            });
        }
        // 显示隐藏描述
        if ($('.company-box #btnmore')) {
            $('.company-box #btnmore').click(function () {
                event.preventDefault();
                event.stopPropagation();
                $('.compdet-more').show();
                $('.compaydetail-more').show();
            });
        }
        if ($cancel) {
            $cancel.click(function () {
                $('.compdet-more').hide();
                $('.compaydetail-more').hide();
            });
        }
        // 关注，拉黑
        if ($('#Attention')) {
            $('#Attention').click(function () {
                if ($userinfo !== '0') {
                    attention();
                } else {
                    userLogin(true);
                }
            });
        }
        if ($('#BlockCompany')) {
            $('#BlockCompany').click(function () {
                if ($userinfo !== '0') {
                    blockCompany();
                } else {
                    userLogin(true);
                }
            });
        }
        // 遮罩层关闭
        if ($('.jconfirm')) {
            $('.jconfirm').click(function () {
                $('.prompt-menu').hide();
                $('.compdet-more').hide();
                $('.jconfirm').hide();
            });
        }
        // 获取关注列表、关注公司、取消关注
        if ($AttentionList === null || $AttentionList === '') {
            myAttentionList();
        } else if ($userinfo !== null) {
            if ($AttentionList.indexOf($comNuber) !== -1) {
                $('#Attention').html('取消关注');
            }
        }
        // 获取列表、拉入黑名单、取消
        if ($BlockList === null || $BlockList === '') {
            myBlockList();
        } else if ($userinfo !== null) {
            if ($BlockList.indexOf($compName) !== -1) {
                $('#BlockCompany').html('移出黑名单');
            }
        }
        // 底部浮层
        $('.indexLayer_Close').on('click', function () {
            $('.indexLayer').hide();
        });
        $('#goreg').click(function () {
            window.location.href = 'https://mip.zhaopin.com/account/regist';
        });
    };
    window.onload = function () {
        render();
    };
    // 关注企业，取消关注
    function attention() {
        var Attstate = $('#Attention').attr('data-state');
        var $comNuber = $('#companydetail').attr('data-comnuber');
        if (Attstate === '1' && $('#Attention').html() === '关注公司') {
            $.ajax({
                url: 'https://mip.zhaopin.com/Company/AttentionCompany',
                type: 'post',
                data: {
                    number: $comNuber
                },
                success: function (data, textStatus, jqxhr) {
                    $('.moreactions').hide();
                    $('.prompt-menu').hide();
                    if (data.StatusCode === 200) {
                        myAttentionList();
                        $('#Attention').attr('data-state', '0');
                        $('#Attention').html('取消关注');
                        alert('关注成功');
                    }
                }
            });
        } else {
            $.ajax({
                url: 'https://mip.zhaopin.com/Company/CancelAttentionCompany',
                type: 'post',
                data: {
                    number: $comNuber
                },
                success: function (data, textStatus, jqxhr) {
                    $('.moreactions').hide();
                    $('.prompt-menu').hide();
                    if (data.StatusCode === 200) {
                        myAttentionList();
                        $('#Attention').attr('data-state', '1');
                        $('#Attention').html('关注公司');
                        alert('取消关注成功');
                    }
                }
            });
        }
    }

    // 获取关注公司列表
    function myAttentionList() {
        var newAttentionList;
        var $AttentionList = localStorage.getItem('AttentionList');
        $.ajax({
            url: 'https://mip.zhaopin.com/company/attentionlistcompany',
            type: 'post',
            data: {
                version: '6.3.0'
            },
            success: function (data) {
                if (data.StatusCode === 200 && data.List.length > 1) {
                    for (var a = 0; a < data.List.length; a++) {
                        newAttentionList += data.List[a].Number + ',';
                    }
                    localStorage.removeItem('AttentionList');
                    localStorage.setItem('AttentionList', newAttentionList);
                }
            }
        });
    }

    // 屏蔽企业，取消屏蔽
    function blockCompany() {
        var Blockstate = $('#BlockCompany').attr('data-state');
        var $compName = $('#companydetail').attr('data-compname');
        if (Blockstate === '0' && $('#BlockCompany').html() === '拉入黑名单') {
            $.ajax({
                url: 'https://mip.zhaopin.com/Company/SaveBlockCompany',
                type: 'post',
                data: {
                    companyName: $compName
                },
                success: function (data) {
                    $('.moreactions').hide();
                    $('.prompt-menu').hide();
                    if (data.StatusCode === 200) {
                        myBlockList();
                        $('#BlockCompany').attr('data-state', '1');
                        $('#BlockCompany').html('移出黑名单');
                        alert('已拉入黑名单');
                    }
                }
            });
        } else {
            $.ajax({
                url: 'https://mip.zhaopin.com/Company/DelBlockCompany',
                type: 'post',
                data: {
                    companyName: $compName
                },
                success: function (data) {
                    $('.moreactions').hide();
                    $('.prompt-menu').hide();
                    if (data.StatusCode === 200) {
                        myBlockList();
                        $('#BlockCompany').attr('data-state', '0');
                        $('#BlockCompany').html('拉入黑名单');
                        alert('已移出黑名单');
                    }
                }
            });
        }
    }
    // 获取黑名单企业列表
    function myBlockList() {
        var $BlockList = localStorage.getItem('BlockList');
        $.ajax({
            url: 'https://mip.zhaopin.com/Company/GetBlockCompany',
            type: 'post',
            data: {
                version: '6.3.0'
            },
            success: function (data, textStatus, jqxhr) {
                localStorage.removeItem('BlockList');
                localStorage.setItem('BlockList', data.Info);
            }
        });
    }
    // 检查客户端是否已包含登录的cookie 返回bool表示是否已经登录
    function checkCookie() {
        if (window.navigator.cookieEnabled) {
            return true;
        } else {
            return false;
        }
    }

    // 跳转登录
    function userLogin(noreturn) {
        if (checkCookie() === false) {
            alert('您的浏览器不支持cookie将无法登录,请使用其它浏览器');
            return;
        }
        if (noreturn) {
            window.location.href = 'https://mip.zhaopin.com/account/login?prevUrl=' + escape(window.location.href) + '';
        } else {
            window.location.replace('https://mip.zhaopin.com/account/login?prevUrl=' + escape(window.location.href) + '');
        }
    }
    // ====处理反馈完成后弹出提示====
    function handlePrompt(val) {
        $('.handlePrompt').html();
        $('.handlePrompt').show();
        $('.handlePrompt').html(val);
        setTimeout(function () {
            $('.handlePrompt').remove();
        }, 3000);
    }
    return {
        render: render
    };
});
