/**
 * @file mip-hs-register 组件
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
        var $el = $(this.element);
        var ajaxurl = $el.attr('data-url');
        var smsurl = $el.attr('sms-url');
        $el.find('.register_go').click(function () {
            var phone = $.trim($el.find('.reg_mobile').val());
            var vcode = $.trim($el.find('.reg_vcode').val());
            var pass = $.trim($el.find('.reg_password').val());
            var verificationKey = $el.find('input[name=verification_key]').val();
            var regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            var regphone = /^1[345678][0-9]{9}$/;
            var regvcode = /^\d{4}$/;
            var regpass = /^[0-9a-zA-Z]{6,16}$/;
            var regPhone = function () {
                if (regphone.test(phone)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            var regEmail = function () {
                if (regemail.test(phone)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            if (!regPhone() && !regEmail()) {
                $el.find('.error').html('请输入正确的手机号或者邮箱');
            }
            else if (!regvcode.test(vcode)) {
                $el.find('.error').html('请输入正确的验证码');
            }
            else if (!regpass.test(pass)) {
                $el.find('.error').html('请输入6~16位数字或字母的密码');
            }
            else {
                $el.find('.error').html('');
                $.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    cache: false,
                    data: 'account=' + phone + '&code=' + vcode + '&password=' + pass
                    + '&verification_key=' + verificationKey + '&t=' + Math.random(),
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        console.log(data);
                        if (data.status !== 0) {
                            $el.find('.error').html(data.msg);
                        }
                        else {
                            alert('注册成功，请登录');
                            location.href = data.url;
                        }
                    },
                    error: function (e) {
                        $el.find('.error').html('注册出错');
                        return;
                    }
                });
            }
        });

        function settime(obj, countdown) {
            if (countdown === 0) {
                obj.attr('disabled', false);
                // obj.removeattr("disabled");
                obj.val('获取短信验证码');
                countdown = 60;
                return;
            }
            else {
                obj.attr('disabled', true);
                obj.val('重新发送(' + countdown + ')');
                countdown--;
            }
            setTimeout(function () {
                settime(obj, countdown);
            }, 1000);
        }

        $el.find('.get_code').click(function () {
            var phone = $.trim($el.find('.reg_mobile').val());
            var regphone = /^1[34578][0-9]{9}$/;
            var regemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if (!regphone.test(phone) && !regemail.test(phone)) {
                $el.find('.error').html('请输入正确的手机号或邮箱');
            }
            else {
                $el.find('.error').html('');
                var That = $(this);
                $.ajax({
                    type: 'POST',
                    url: smsurl,
                    cache: false,
                    data: 'account=' + phone + '&t=' + Math.random(),
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        if (data.status !== 0) {
                            $el.find('.error').html(data.msg);
                        }
                        else {
                            $el.find('input[name=verification_key]').val(data.verification_key);
                            var countdown = 60;
                            settime(That, countdown);
                            alert('发送验证码成功');
                        }
                    },
                    error: function (e) {
                        $el.find('.error').html('发送验证码出错');
                        return;
                    }
                });
            }
        });
    };

    return customElement;
});
