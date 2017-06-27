/**
 * @file 加载更多插件
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        // 点击弹出登录框
        $('.link-login').click(function () {
            $(element).find('.body_mask').removeClass('hide').show();
            $(element).find('.login_panel').removeClass('hide').show();
        });
        // 点击背景关闭登录框
        $('.body_mask').click(function () {
            $(element).find('.body_mask').hide();
            $(element).find('.login_panel').hide();
        });
        // 点击清除
        $('.clear-btn').click(function () {
            var parent = $(this).parents('.inputbox');
            parent.find('input').val('');
        });
        // 点击登陆
        $('#loginSubmit').click(function () {
            var userId = $('#userId').val();
            var userPassword = $('#userPassword').val();
            if (userId.length <= 0) {
                $('.m-nerror').html('<span class="error-icon"></span>帐号不能为空');
                return false;
            }
            if (userPassword.length <= 0) {
                $('.m-nerror').html('<span class="error-icon"></span>密码不能为空');
                return false;
            }
            var param = {
                account: userId,
                password: userPassword,
                remember: false,
                client: 1
            };
            $.ajax({
                url: 'http://passport.233.com/m/login/api/singin',
                data: param,
                type: 'post',
                dataType: 'json',
                beforeSend: function () {
                    $('.m-nerror').removeClass('cRed').html('登录中');
                },
                success: function (data) {
                    if (data.s === 10006) {
                        window.location.reload();
                    } else {
                        $('.m-nerror').addClass('cRed').html('<span class="error-icon"></span>' + data.msg);
                    }
                }
            });
        });
    };
    return customElem;
});
