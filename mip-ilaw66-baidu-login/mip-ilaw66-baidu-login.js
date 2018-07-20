/**
 * @file mip-ilaw66-baidu-login 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('jquery');

    /**
     * 因有些方法zepto不支持故使用jquery
     */

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var interval;
        var min;
        var sec;
        var timeout = 60;
        var loginTimes = parseInt($el.find('#error').val().slice(5, 6), 10);
        var csrfToken = $el.find('#_csrf').val();
        var channel = $el.find('#channel').val();
        var userId = $el.find('#userId').val(); // qyy add
        $(function () {
            // qyy add
            if (channel === 'baidusearch') {
                $el.find('.header_block').html('准备咨询');
                $el.find('.header_block').css('color', '#000');
                $el.find('.header_block').css('background', '#fff');
                $el.find('.glyphicon').css('color', '#000000');
                $el.find('#sms').css('color', '#4992FF');
                $el.find('#login').text('去匹配律师');
                $el.find('#login').css('background', '#3388FF');
                $el.find('#login').css('height', '45px');
                $el.find('.radio-rule').show();
                $el.find('.botText01').show();
                $el.find('#botText_div').hide();
            }

            function PopUp(option) {
                this.init(option);
                return this;
            }

            PopUp.prototype = {
                constructor: PopUp,
                init: function (option) {
                    var This = this;
                    This.option = {
                        title: '弹窗标题',
                        main: '弹窗内容',
                        yes: '确定',
                        no: '取消',
                        popYes: function () {},
                        popNo: function () {}
                    };
                    $.extend(true, this.option, option || {});
                    This.dom();
                    This.bindEvent();
                },
                dom: function () {
                    var This = this;
                    This.body = $el.find('body');
                    var btnN = '<div class="back-leave" id="js-back-leave">'
                        + This.option.yes + '</div>' + '<div class="back-continue" id="js-back-continue">'
                        + This.option.no + '</div>';
                    if (!This.option.yes) {
                        btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
                            + This.option.no + '</div>';
                    }

                    This.main = '<div class="back__pop popUP" style="display:none;" id="back__pop">'
                        + '<div class="layer__wrapper"></div>' + '<div class="back__popLayer">' + '<span>'
                        + This.option.title + '</span>' + '<span>' + This.option.main
                        + '</span>' + btnN + '</div>' + '</div>';
                    This.body.append(This.main);
                    This.PopUp = $('.popUP');
                    This.PopUp.show();
                },
                bindEvent: function () {
                    var This = this;
                    //  点击离开事件
                    This.PopUp.on('click', '#js-back-leave', function () {
                        This.PopUp.remove();
                        This.option.popYes();
                    });
                    //  点击确认事件
                    This.PopUp.on('click', '#js-back-continue', function () {
                        This.PopUp.remove();
                        This.option.popNo();

                    });
                    //  点击遮罩层事件 --- 点击不关闭，必须点按钮

                    /*This.PopUp.on('click', '.layer__wrapper', function () {
                        This.PopUp.remove();
                    })*/

                }
            };

            window.PopUp = PopUp;

            // 取消内容显示样式
            function ToastUp(option) {
                this.init(option);
                return this;
            }
            ToastUp.prototype = {
                constructor: ToastUp,
                init: function (option) {
                    var This = this;
                    This.option = {
                        main: '显示内容'
                    };
                    $.extend(true, this.option, option || {});
                    This.dom();
                    This.bindEvent();
                },
                dom: function () {
                    var This = this;
                    This.body = $el.find('body');
                    This.main = '<div class="back__pop ToastUp" style="display:none;" id="back__pop">'
                        + '<div class="layer__wrapper layer__wrapper__toast"></div>'
                        + '<div class="back__popLayer__toast">' + '<span>'
                        + This.option.main + '</span>' + '</div>' + '</div>';
                    This.body.append(This.main);
                    This.ToastUp = $('.ToastUp');
                    This.ToastUp.show();
                },
                bindEvent: function () {
                    var This = this;
                    //  显示内容2秒
                    setTimeout(function () {
                        This.ToastUp.remove();
                    },
                        2000);
                }
            };

            window.ToastUp = ToastUp;

            function backOr(f, a, e, d, c, b) {
                new PopUp({
                    title: f,
                    main: a,
                    yes: e,
                    no: d,
                    popYes: function (g) {
                        c.call(this, g);
                    },
                    popNo: function (g) {
                        b.call(this, g);
                    }
                });
            }

            function toastOr(a) {
                new ToastUp({
                    main: a
                });
            }
            // qyy end

            $.idcode.setCode(); // 加载生成验证码方法
            if (sessionStorage.getItem('activity_dayimaLogin') === 1) {
                toastOr('登录后方可领券');
                sessionStorage.setItem('activity_dayimaLogin', 0);
            }

            if (channel === 'jsbchina') {
                $el.find('.bottomText').show();
            }

            if (loginTimes === 3) {
                toastOr('错误次数过多，请输入图形验证码');
            }

            if (loginTimes >= 3) {
                $el.find('#code_div').show();
            }

            $el.find('#sms').click(function () {
                sendSms();
            });

            // qyy add
            if (channel === 'baidusearch') {
                $el.find('#precautions-back').click(function () {
                    if (channel === 'baidusearch') {
                        window.top.location.href = './';
                    }
                    else {
                        history.go(-1);
                    }
                });
                // 我已阅读并同意《分秒律师用户服务协议》
                var agreeImgSrc = $el.find('.radio-rule').find('img').attr('src');
                $el.find('.radio-rule').on('click', function () {
                    if ($(this).hasClass('rule-checked')) {
                        $(this).removeClass('rule-checked');
                    }
                    else {
                        $(this).addClass('rule-checked');
                    }
                    var type = $(this).data('type');
                    var radio = $el.find('#radio-rule-icon' + type);
                    if (radio.hasClass('isChecked')) {
                        radio.attr('src', 'images/button_ok_s.png').removeClass('isChecked');
                    }
                    else {
                        radio.attr('src', agreeImgSrc).addClass('isChecked');
                    }
                    isCheckedConsulting(type);
                });
                function isCheckedConsulting(type) {
                    // 判断开始咨询按钮状态
                    if ($el.find('#js-radio-rule' + type).hasClass('rule-checked')) {
                        $el.find('#login').css('background', '#3388FF');
                        $el.find('#login').removeClass('noChecked');
                    }
                    else {
                        $el.find('#login').css('background', '#BBBBBB');
                        $el.find('#login').addClass('noChecked');
                    }
                }
                // 《分秒律师用户服务协议》
                $el.find('.rulePA').on('click', function () {
                    window.top.location.href = 'rule';
                });
            }

            // qyy end

            $el.find('.link_btn_sysErrConfirm').click(function () {
                $el.find('.popUp_sysErr').hide();
            });

            $el.find('.footer_block').click(function () {
                var phone = $el.find('#username').val();

                if (!check(phone)) {
                    return;
                }

                console.log(loginTimes);

                if (loginTimes > 2) {
                    var IsBy = $.idcode.validateCode(); // 调用返回值，返回值结果为true或者false
                    if (IsBy) {
                        login();
                        $.idcode.setCode();
                    }
                    else {
                        toastOr('图形验证码错误');
                    }
                }
                else {
                    // qyy add
                    if (channel === 'baidusearch') {
                        var search = $el.find('#radio-rule-iconCT002').hasClass('isChecked');
                        if ($el.find('#login').hasClass('noChecked') && !search) {
                            alert('请阅读并同意《分秒律师用户服务协议》');
                            return false;
                        }
                        else {
                            if (userId) {
                                // 修改手机号
                                updateTel();
                            }
                            else {
                                // 用户首次登陆
                                sessionStorage.setItem('loginFlg', 0);
                            }
                            login();
                        }
                    }
                    else {
                        // qyy end
                        login();
                    }
                }
            });
        });

        function login() {
            var frmLogin = $el.find('#frmLogin');
            $el.find(frmLogin).attr('action', 'login');
            $el.find(frmLogin).attr('method', 'post');
            $el.find(frmLogin).attr('target', '_self');
            $el.find(frmLogin).submit();
        }

        function sendSms() {

            var phone = $el.find('#username').val();
            if (check(phone)) {
                $el.find('#sms').prop('disabled', true).off('click');
                var csrfToken = $el.find('#_csrf').val();
                var channel = $el.find('#channel').val();

                /** 倒计时*/
                $el.find('#sms').text(timeout + 's');
                var dateTime = new Date();
                min = dateTime.getMinutes();
                sec = dateTime.getSeconds();
                interval = setInterval('fnDate()', 1000);

                /** 发送短信*/
                $.ajax({
                    type: 'GET',
                    url: 'sendSms?phone=' + phone + '&channel=' + channel + '&_csrf=' + csrfToken,
                    success: function (data) {
                        if (data === 'ERROR') {
                            // alert("发送短信失败");
                            $el.find('#sendSMSError_msg').text('发送短信失败');
                            $el.find('.popUp_sysErr').fadeIn();
                        }
                        else if (data === 'ERROR1') {
                            // alert("链接异常");
                            $el.find('#sendSMSError_msg').text('链接异常');
                            $el.find('.popUp_sysErr').fadeIn();
                        }
                        else if (data === 'ERROR2') {
                            // alert("您已申请过，请稍后申请");
                            $el.find('#sendSMSError_msg').text('您已申请过，请稍后申请');
                            $el.find('.popUp_sysErr').fadeIn();
                        }

                    }
                });
            }
        }

        function fnDate() {

            var date = new Date();
            var t1 = (date.getMinutes() - min) * timeout + (date.getSeconds() - sec);
            if (t1 >= timeout) {
                clearInterval(interval);
                $el.find('#sms').prop('disabled', false).text('重试');
                $el.find('#sms').on('click', sendSms);
            }
            else {
                var time = timeout - t1;
                $el.find('#sms').text(time + 's');
            }
        }

        function check(phone) {
            if (!phone) {
                $el.find('#smsCheckError_msg').text('请输入手机号码');
                return false;
            }
            else {
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
                if (!reg.test(phone)) {
                    // alert("电话号码填写不正确");
                    $el.find('#smsCheckError_msg').text('电话号码填写不正确');
                    return false;
                }
                else {
                    return true;
                }
            }
        }

        // qyy add
        // pop.js
        function popFun() {
        }

        /*修改手机号*/
        function updateTel() { // 修改手机号
            var phone = $el.find('#username').val();
            var smsCode = $el.find('#password').val();
            var csrfToken = $el.find('#_csrf').val();
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
                            var phoneChangedFlagAndHasOrderUnpaid = true;
                            $el.find('#ok_msg').html(data.errMsg);
                            $el.find('.popUp_ok').fadeIn();
                        }
                        else if (data.code === 3) {
                            $el.find('#err_msg').html(data.errMsg);
                            $el.find('.popUp_error').fadeIn();
                            $el.find('#sms').val('重发验证码').text('refresh');
                            $el.find('#sms').prop('disabled', false).text('refresh');
                        }
                        else {
                            $el.find('#err_msg').html(data.errMsg);
                            $el.find('.popUp_error').fadeIn();
                        }
                    }

                    // $el.find(".link_btn_confirm").click(function(){
                    //     if(phoneChangedFlagAndHasOrderUnpaid){
                    //         $el.find(".popUp_unpaidErr").fadeIn();
                    //     }else{
                    //         //未产生费用,跳到重新下单页
                    //         window.top.location.href="./";
                    //     }
                    // });

                    // $el.find(".link_btn_unpaidErrConfirm").click(function(){
                    //     //跳到支付页order
                    //     window.top.location.href="order?requestId="+requestId;
                    // });
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        // window.location.reload();
                    }

                }
            });
        }

    };

    return customElement;
});
