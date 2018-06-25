/**
 * @file mip-365-verification 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var cookie = require('./customStorage');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var $ = require('zepto');
        var el = this.element;
        var loginuser = el.querySelector('loginuser');
        var btn = el.querySelector('.btn_mobile');
        $(btn).on('click',
            function () {
                var mobile = $(el.querySelector('.input_mobile')).val();
                var re = /^1\d{10}$/;
                if (mobile.length > 0 && re.test(mobile)) {
                    $.ajax({
                        type: 'post',
                        url: '/najax/Authentication/GetCellPhoneVerificationCode/',
                        data: {
                            mobilephone: mobile,
                            login: loginuser
                        },
                        dataType: 'jsonp',
                        success: function (e) {
                            if (e.Result) {
                                var dNow = new Date();
                                dNow.setTime(dNow.getTime() + 60 * 1000);
                                var option = [
                                    {
                                        'key': 'loginCodeTime',
                                        'expires': dNow,
                                        'domain': '64365.com'
                                    }
                                ];
                                cookie.call(cookie, 2)._set(option);
                                settime(60);
                            }
                        }
                    });
                } else {
                    alert('请正确输入电话号码');
                }
            });
        var countdown = 60;
        var generatecode = $(btn);

        function settime(e) {
            if (e === 0) {
                generatecode.removeAttr('disabled');
                generatecode.text('获取验证码');
                countdown = 60;
                return false;
            } else {
                generatecode.attr('disabled', true);
                generatecode.text('重新发送(' + e + ')');
                e--;
            }
            setTimeout(function () {
                    settime(e);
                },
                1000);
            return false;
        }

        var a = cookie.call(cookie, 2);
        var cookieexist = a._get('loginCodeTime') || '';
        if (cookieexist.length > 0) {
            var myDate = new Date();
            var loginCodeTime = countdown - parseInt((myDate.getTime() - cookieexist) / 1000, 10);
            if (loginCodeTime > 0) {
                settime(loginCodeTime);
            }
        } else {
        }
    };
    return customElement;
});
