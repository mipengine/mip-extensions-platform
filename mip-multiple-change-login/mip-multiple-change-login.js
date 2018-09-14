/**
 * @file mip-multiple-change-login 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO

        var html = '<div class="mip-multiple-change-login">\n'
            + '    <div class="change-box multiple-change-view" id="forgetPwd">\n'
            + '        <div class="change-login-top">\n'
            + '            <span class="change-login-title">忘记密码</span><span class="icon-close-x">×</span>\n'
            + '        </div>\n'
            + '        <mip-form class="change-login-form" url="">\n'
            + '            <input name="mobile" type="text" placeholder="请输入手机号">\n'
            + '            <p class="mobileNumber">请填写正确的手机号</p>'
            + '            <div class="change-login-code">\n'
            + '                <input name="code" type="text" placeholder="请输入短信码">\n'
            + '                <span class="phone-code getfindpwdCode">获取验证</span>\n'
            + '            </div>\n'
            + '            <input name="password" type="password" placeholder="请设置6-12位密码">\n'
            + '            <p class="passwordPrompt">请设置6-12位密码</p>'
            + '            <input class="change-login-btn mip-findPassword-button" type="submit" value="确定">\n'
            + '        </mip-form>\n'
            + '        <div class="change-login-back">\n'
            + '            <span class="multiple-change" data-show="login">返回登录</span>\n'
            + '        </div>\n'
            + '    </div>\n'
            + '    <div class="change-box multiple-change-view" id="login">\n'
            + '        <div class="change-login-top">\n'
            + '            <span class="change-login-title multiple-change login-title" data-show="login">登录</span>\n'
            + '            <span class="change-login-title multiple-change" data-show="register">注册</span>\n'
            + '            <span class="icon-close-x">×</span>\n'
            + '        </div>\n'
            + '        <mip-form class="change-login-form" url="">\n'
            + '            <input name="mobile" type="text" placeholder="请输入手机号">\n'
            + '            <p class="mobileNumber">请填写正确的手机号</p>'
            + '            <input name="password" type="password" placeholder="请输入密码">\n'
            + '            <p class="passwordPrompt">请设置6-12位密码</p>'
            + '            <input class="change-login-btn mip-login-button" type="submit" value="登录">\n'
            + '        </mip-form>\n'
            + '        <div class="change-login-back">\n'
            + '            <span class="multiple-change"  data-show="forgetPwd">忘记密码</span>\n'
            + '        </div>\n'
            + '    </div>\n'
            + '    <div class="change-box multiple-change-view" id="register">\n'
            + '        <div class="change-login-top">\n'
            + '            <span class="change-login-title multiple-change" data-show="login">登录</span>\n'
            + '            <span class="change-login-title multiple-change register-title" data-show="register">注册'
            + '            </span>\n'
            + '            <span class="icon-close-x">×</span>\n'
            + '        </div>\n'
            + '        <mip-form class="change-login-form" url="">\n'
            + '            <input name="mobile" type="text" placeholder="请输入手机号">\n'
            + '            <p class="mobileNumber">请填写正确的手机号</p>'
            + '            <div class="change-login-code">\n'
            + '                <input name="code" type="text" placeholder="请输入短信码">\n'
            + '                <span class="phone-code getregisterCode">获取验证</span>\n'
            + '            </div>\n'
            + '            <input name="password" type="password" placeholder="请设置6-12位密码">\n'
            + '            <p class="passwordPrompt">请设置6-12位密码</p>'
            + '            <input class="change-login-btn mip-register-button" type="submit" value="注册">\n'
            + '        </mip-form>\n'
            + '    </div>\n'
            + '</div>';

        var dataType = $('meta[name="_token"]').attr('content');
        var mobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        var passwordReg = /^[\w]{6,12}$/;

        $(function () {
            $('body').append(html);
            $('.mip-multiple-change-login').css({'display': 'none'});

            var tabs = $('.mip-multiple-change-login').find('.multiple-change');
            $(tabs).on('click', function () {
                var self = this;
                var showWhich = $(self).data('show');
                $('.mip-multiple-change-login').find('.multiple-change-view').css({'display': 'none'});
                $('.mip-multiple-change-login').find('#' + showWhich).css({'display': 'block'});
            });
            $('.open-mip-login').on('click', function () {
                $('.mip-multiple-change-login').css({'display': 'block'});
            });
            $('.mip-multiple-change-login').find('.icon-close-x').on('click', function () {
                $('.mip-multiple-change-login').css({'display': 'none'});
            });
            $('input[name="mobile"]').on('change', function () {
                var val = $(this).val();
                if (!mobileReg.test(val)) {
                    $(this).siblings('.mobileNumber').css({'display': 'block'});
                } else {
                    $(this).siblings('.mobileNumber').css({'display': 'none'});
                }
            });
            $('input[name="password"]').on('change', function () {
                var val = $(this).val();
                if (!passwordReg.test(val)) {
                    $(this).siblings('.passwordPrompt').css({'display': 'block'});
                } else {
                    $(this).siblings('.passwordPrompt').css({'display': 'none'});
                }
            });

            var loginurl = $('.open-mip-login').data('loginurl');
            var registerurl = $('.open-mip-login').data('registerurl');
            var findpwdurl = $('.open-mip-login').data('findpwdurl');
            var findpwdcodeurl = $('.open-mip-login').data('findpwdcodeurl');
            var registercodeurl = $('.open-mip-login').data('registercodeurl');
            var promptDom = '<div class="mip-login-promptInfo"><span></span></div>';

            $('body').append(promptDom);

            function showMipLoginPromptInfo(info) {
                $('.mip-login-promptInfo').find('span').html(info);
                $('.mip-login-promptInfo').show();
                setTimeout(function () {
                    $('.mip-login-promptInfo').hide();
                }, 2000);
            }

            $('.mip-login-button').click(function () {
                var mobileNumber = $(this).parent().find('input[name="mobile"]').val();
                var password = $(this).parent().find('input[name="password"]').val();

                if (!mobileReg.test(mobileNumber)) {
                    showMipLoginPromptInfo('请输入正确的手机号');
                } else if (!passwordReg.test(password)) {
                    showMipLoginPromptInfo('请设置6-12位密码');
                } else {
                    $.ajax({
                        type: 'POST',
                        url: loginurl,
                        data: {'mobile': mobileNumber, 'password': password},
                        headers: {'X-CSRF-TOKEN': dataType},
                        success: function (result) {
                            if (result.code === 10000) {
                                showMipLoginPromptInfo('登陆成功');
                                mipLoginSuccess();
                            } else {
                                showMipLoginPromptInfo(result.msg);
                            }
                        }
                    });
                }
                function mipLoginSuccess() {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500);
                }
            });


            $('.mip-register-button').click(function () {
                var mobileNumber = $(this).parent().find('input[name="mobile"]').val();
                var codeNumber = $(this).parent().find('input[name="code"]').val();
                var password = $(this).parent().find('input[name="password"]').val();

                if (!mobileReg.test(mobileNumber)) {
                    showMipLoginPromptInfo('请输入正确的手机号');
                } else if (typeof (codeNumber) === 'undefined' || codeNumber === '') {
                    showMipLoginPromptInfo('请填写验证码');
                } else if (!passwordReg.test(password)) {
                    showMipLoginPromptInfo('请设置6-12位密码');
                } else {
                    $.ajax({
                        type: 'POST',
                        url: registerurl,
                        data: {
                            'mobile': mobileNumber,
                            'code': codeNumber,
                            'password': password
                        },
                        headers: {'X-CSRF-TOKEN': dataType},
                        success: function (result) {
                            if (result.code === 10000) {
                                showMipLoginPromptInfo('注册成功');
                                setTimeout(function () {
                                    $('.mip-multiple-change-login')
                                    .find('.multiple-change-view').css({'display': 'none'});
                                    $('.mip-multiple-change-login').find('#login').css({'display': 'block'});
                                }, 1500);
                            } else {
                                showMipLoginPromptInfo(result.msg);
                            }
                        }
                    });
                }
            });

            $('.mip-findPassword-button').click(function () {
                var mobileNumber = $(this).parent().find('input[name="mobile"]').val();
                var codeNumber = $(this).parent().find('input[name="code"]').val();
                var password = $(this).parent().find('input[name="password"]').val();

                if (!mobileReg.test(mobileNumber)) {
                    showMipLoginPromptInfo('请输入正确的手机号');
                } else if (typeof (codeNumber) === 'undefined' || codeNumber === '') {
                    showMipLoginPromptInfo('请填写验证码');
                } else if (!passwordReg.test(password)) {
                    showMipLoginPromptInfo('请设置6-12位密码');
                } else {
                    $.ajax({
                        type: 'POST',
                        url: findpwdurl,
                        data: {
                            'mobile': mobileNumber,
                            'code': codeNumber,
                            'password': password
                        },
                        headers: {'X-CSRF-TOKEN': dataType},
                        success: function (result) {
                            showMipLoginPromptInfo(result.msg);
                            if (result.code === 10000) {
                                setTimeout(function () {
                                    $('.mip-multiple-change-login')
                                    .find('.multiple-change-view').css({'display': 'none'});
                                    $('.mip-multiple-change-login').find('#login').css({'display': 'block'});
                                }, 1500);
                            }
                        }
                    });
                }
            });

            var isGetFindCode = false;
            $('.getfindpwdCode').click(function () {
                var self = this;
                var seconds = 30;
                var mobileNumber = $(this).parent().parent().find('input[name="mobile"]').val();
                var url = findpwdcodeurl;
                if (!isGetFindCode) {
                    if (!mobileReg.test(mobileNumber)) {
                        showMipLoginPromptInfo('请输入正确的手机号');
                    } else {
                        $.post(url, {'mobile': mobileNumber}, function (result) {
                            if (result.code === 10000) {
                                showMipLoginPromptInfo(result.msg);
                                isGetFindCode = true;
                                countDown(seconds, self);
                            } else {
                                showMipLoginPromptInfo(result.msg);
                            }
                        });
                    }
                }
                function countDown(s, self) {
                    setTimeout(function () {
                        $(self).html(s).css({'color': '#999'});
                        seconds--;
                        if (seconds > 0) {
                            countDown(seconds, self);
                        } else {
                            $(self).html('获取验证码').css({'color': '#0070c9'});
                            isGetFindCode = false;
                        }
                    }, 1000);
                }
            });

            var isGetRegisterCode = false;
            $('.getregisterCode').click(function () {
                var self = this;
                var seconds = 30;
                var mobileNumber = $(this).parent().parent().find('input[name="mobile"]').val();
                var url = registercodeurl;
                if (!isGetRegisterCode) {
                    if (!mobileReg.test(mobileNumber)) {
                        showMipLoginPromptInfo('请输入正确的手机号');
                    } else {
                        $.post(url, {'mobile': mobileNumber}, function (result) {
                            if (result.code === 10000) {
                                showMipLoginPromptInfo(result.msg);
                                isGetRegisterCode = true;
                                countDown(seconds, self);
                            } else {
                                showMipLoginPromptInfo(result.msg);
                            }
                        });
                    }
                }
                function countDown(s, self) {
                    setTimeout(function () {
                        $(self).html(s).css({'color': '#999'});
                        seconds--;
                        if (seconds > 0) {
                            countDown(seconds, self);
                        } else {
                            $(self).html('获取验证码').css({'color': '#0070c9'});
                            isGetRegisterCode = false;
                        }
                    }, 1000);
                }
            });
        });
    };

    return customElement;
});
