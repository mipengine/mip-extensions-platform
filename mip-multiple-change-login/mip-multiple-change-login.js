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
            + '                <p class="phone-code">获取验证</p>\n'
            + '            </div>\n'
            + '            <input name="password" type="password" placeholder="请设置6-12位密码">\n'
            + '            <p class="passwordPrompt">请设置6-12位密码</p>'
            + '            <input class="change-login-btn" type="submit" value="确定">\n'
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
            + '            <input class="change-login-btn" type="submit" value="登录">\n'
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
            + '                <p class="phone-code">获取验证</p>\n'
            + '            </div>\n'
            + '            <input name="password" type="password" placeholder="请设置6-12位密码">\n'
            + '            <p class="passwordPrompt">请设置6-12位密码</p>'
            + '            <input class="change-login-btn" type="submit" value="注册">\n'
            + '        </mip-form>\n'
            + '    </div>\n'
            + '</div>';

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
            $('#open-mip-login').on('click', function () {
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
        });
    };

    return customElement;
});
