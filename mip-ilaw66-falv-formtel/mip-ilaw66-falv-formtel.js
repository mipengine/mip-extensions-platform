/**
 * @file mip-ilaw66-falv-formtel 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        function mdFtel() {
            var interval;
            var min;
            var sec;
            var timeout = 60;
            var questionType;
            var requestId;

            function getQueryString(name) {
                var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(r[2]);
                }
                else {
                    return null;
                }
            }
            $el.find('#questionType').val(getQueryString('questionType'));
            $el.find('#requestId').val(getQueryString('requestId'));
            questionType = $el.find('#questionType').val();
            requestId = $el.find('#requestId').val();

            // 发送短信验证码
            $el.find('#sms').click(function () {
                var phone = $el.find('#username').val();
                if (!phone) {
                    $el.find('#err_msg').html('请输入手机号码');
                    $el.find('.popUp_error').fadeIn();
                    return;
                }

                sendSms(phone);
            });

            $el.find('.link_btn_sysErrConfirm').click(function () {
                $el.find('.popUp_error').hide();
            });

            // 确认修改手机号
            $el.find('#confirmCorrectTel').click(function () {
                var phone = $el.find('#username').val();
                var smsCode = $el.find('#password').val();
                var csrfToken = $el.find('#_csrf').val();

                if (!phone) {
                    $el.find('#err_msg').html('请输入手机号码');
                    $el.find('.popUp_error').fadeIn();
                    return;
                }

                if (!check(phone)) {
                    $el.find('#err_msg').html('电话号码格式不正确');
                    $el.find('.popUp_error').fadeIn();
                    return;
                }

                if (!smsCode) {
                    $el.find('#err_msg').html('请输入验证码');
                    $el.find('.popUp_error').fadeIn();
                    return;
                }

                var phoneChangedFlagAndHasOrderUnpaid = false;

                $.ajax({
                    async: true,
                    type: 'POST',
                    url: 'updateUserPhoneNumber?phoneNumber=' + phone + '&smsCode=' + smsCode + '&_csrf=' + csrfToken,
                    dataType: 'json',
                    success: function (data) {
                        if (data.code === 1) {
                            $el.find('#ok_msg').html(data.errMsg);
                            $el.find('.popUp_ok').fadeIn();
                        }
                        else {
                            if (data.code === 4) {
                                phoneChangedFlagAndHasOrderUnpaid = true;
                                $el.find('#ok_msg').html(data.errMsg);
                                $el.find('.popUp_ok').fadeIn();
                            }
                            else if (data.code === 3) {
                                $el.find('#err_msg').html(data.errMsg);
                                $el.find('.popUp_error').fadeIn();
                                $el.find('#sms').val('重发验证码').text('refresh');
                                $('#sms').prop('disabled', false).text('refresh');
                            }
                            else {
                                $el.find('#err_msg').html(data.errMsg);
                                $el.find('.popUp_error').fadeIn();
                            }
                        }

                        $el.find('.link_btn_confirm').click(function () {
                            if (phoneChangedFlagAndHasOrderUnpaid) {
                                $el.find('.popUp_unpaidErr').fadeIn();
                            }
                            else {
                                // 未产生费用,跳到重新下单页
                                window.top.location.href = 'mip_precautions?questionType=' + questionType;
                            }
                        });

                        $el.find('.link_btn_unpaidErrConfirm').click(function () {
                            // 跳到支付页order
                            window.top.location.href = 'mip_order?requestId=' + requestId;
                        });
                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }

                    }
                });
            });

            function sendSms(phone) {
                if (check(phone)) {
                    $el.find('#sms').prop('disabled', true).removeAttr('onclick');
                    var csrfToken = $el.find('#_csrf').val();
                    var channel = $el.find('#channel').val();

                    /** 倒计时 */
                    $el.find('#sms').val('(' + timeout + ')').text('refresh');
                    var dateTime = new Date();
                    min = dateTime.getMinutes();
                    sec = dateTime.getSeconds();
                    interval = setInterval(fnDate, 1000);

                    /** 发送短信 */
                    $.ajax({
                        type: 'GET',
                        url: 'sms?phone=' + phone + '&channel=' + channel + '&_csrf=' + csrfToken,
                        success: function (data) {
                            if (data === 'OK') {
                            }
                            else {
                                if (data === 'ERROR') {
                                    $el.find('#err_msg').html('发送短信失败');
                                }
                                else if (data === 'ERROR1') {
                                    $el.find('#err_msg').html('系统异常，请稍后再试');
                                }
                                else if (data === 'ERROR2') {
                                    $el.find('#err_msg').html('10分钟内不能二次重发');
                                }

                                clearInterval(interval);
                                $el.find('#sms').val('重发验证码').text('refresh');
                                $el.find('#sms').prop('disabled', false).text('refresh');
                                $el.find('.popUp_error').fadeIn();
                            }
                        }
                    });
                }
                else {
                    $el.find('#err_msg').html('电话号码格式不正确');
                    $el.find('.popUp_error').fadeIn();
                }
            }

            function check(phone) {
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                if (!reg.test(phone)) {
                    return false;
                }
                else {
                    return true;
                }
            }

            function fnDate() {
                var date = new Date();
                var t1 = null;
                t1 = (date.getMinutes() - min) * timeout + (date.getSeconds() - sec);
                if (t1 >= timeout) {
                    clearInterval(interval);
                    $el.find('#sms').val('重发验证码');
                    $el.find('#sms').prop('disabled', false).text('refresh');
                    $el.find('#sms').attr('onclick', 'sendSms();');
                }
                else {
                    var time = timeout - t1;
                    $el.find('#sms').val('(' + time + ')').text('refresh');
                }
            }
        }
        mdFtel();
        $el.find('.glyphicon').on('click', function () {
            window.history.back(-1);
        });
    };

    return customElement;
});
