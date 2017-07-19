/**
 * @file mip-taoge-scaydk-qe 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    // timer变量，控制时间
    var InterValObj;
    // 间隔函数，1秒执行
    var count = 5;
    // 当前剩余秒数
    var curCount = 120;

    customElement.prototype.build = function () {
        // 刷新页面或关闭倒计时是否继续？
        if (localStorage.curCount !== 0) {
            var shicha = (Date.parse(new Date()) / 1000) - Number(localStorage.curAddtime);
            if (shicha < Number(localStorage.curCount)) {
                localStorage.curCount = Number(localStorage.curCount) - shicha;
                localStorage.curAddtime = Date.parse(new Date()) / 1000;
                curCount = localStorage.curCount;
                $('#send_sms').attr('disabled', 'true');
                $('#send_sms').text('请在' + curCount + '秒内输入验证码');
                $('#send_sms').css({
                    'background-color': '#eee',
                    'color': '#555',
                    'border': '1px solid #ccc',
                    'border-left': 'none'
                });
                $('#mobile').val(localStorage.curMobile);
                // 启动计时器，1秒执行一次
                InterValObj = window.setInterval(SetRemainTime, 1000);
            }
        }
        // 单选事件
        $('input[type="radio"]').change(function () {
            var v = Number($(this).val());
            var i = $(this).parents('.form-group').index();
            if (v !== 2) {
                $('.form-horizontal form > div.form-group').each(function (k, v) {
                    if (k > i) {
                        if ($(this).find('select').length > 0) {
                            $(this).removeClass('hidden').addClass('show');
                        }
                        else {
                            return false;
                        }
                    }
                });
            }
            else {
                $('.form-horizontal form > div.form-group').each(function (k, v) {
                    if (k > i) {
                        if ($(this).find('select').length > 0) {
                            $(this).removeClass('show').addClass('hidden');
                        }
                        else {
                            return false;
                        }
                    }
                });
            }
        });
        // 初始化银行下拉列表
        var ajaxTimeoutTest = $.ajax({
            type: 'GET',
            timeout: 3000,
            url: getBaseUrl() + '/static/mobile/js/bankData.json',
            data: {},
            success: function (result) {
                var option = '';
                $.each(result, function (k, v) {
                    option += '<option value="' + v.bin + '">' + v.bankName + '</option>';
                });
                $('#anjiefangyinhang,#anjiecheyinhang').append(option);
            },
            complete: function (XMLHttpRequest, status) {
                if (status === 'timeout') {
                    ajaxTimeoutTest.abort();
                }
            },
            dataType: 'json'
        });
        // 点击跳转手机验证
        $('button.ljcp').click(function () {
            $('div.form-group.mobile')
                .removeClass('hidden')
                .addClass('show')
                .siblings()
                .removeClass('show')
                .addClass('hidden');
        });
        // 发送短信验证码
        $('#send_sms').click(function () {
            var o = $(this);
            if (o.attr('disabled')) {
                return false;
            }
            var m = $('#mobile').val();
            var Mobile = /^1[34578]\d{9}$/;
            if (!Mobile.test(m)) {
                error('请输入有效的11位手机号码！');
            } else {
                curCount = 120;
                localStorage.curCount = curCount;
                localStorage.curAddtime = Date.parse(new Date()) / 1000;
                localStorage.curMobile = m;
                o.attr('disabled', 'true');
                o.text('' + curCount + '秒');
                o.css({
                    'background-color': '#eee',
                    'color': '#555',
                    'border': '1px solid #ccc',
                    'border-left': 'none'
                });
                // 启动计时器，1秒执行一次
                InterValObj = window.setInterval(SetRemainTime, 1000);
                var ajaxTimeoutTest = $.ajax({
                    type: 'GET',
                    timeout: 3000,
                    url: getBaseUrl() + '/mip/index/send_sms',
                    data: {mobile: m},
                    success: function (result) {
                        if (result.code === 1) {
                        } else {
                            // 启用按钮
                            buttunUp();
                            error(result.msg);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        buttunUp();
                        error(XMLHttpRequest.statusText);
                    },
                    complete: function (XMLHttpRequest, status) {
                        if (status === 'timeout') {
                            ajaxTimeoutTest.abort();
                        }
                    },
                    dataType: 'json'
                });
            }
        });
        // 验证短信验证码
        $('#next_step').click(function () {
            var m = $('#mobile').val();
            var c = $('#verify').val();
            var Mobile = /^1[34578]\d{9}$/;
            if (!Mobile.test(m)) {
                error('请输入有效的11位手机号码！');
                return false;
            }
            if (!checknumber(c) || c.length !== 4) {
                error('验证码错误！');
                return false;
            }
            var ajaxTimeoutTest = $.ajax({
                type: 'GET',
                timeout: 3000,
                url: getBaseUrl() + '/mip/index/verify_sms',
                data: $('form').serialize(),
                success: function (result) {
                    if (result.code === 1) {
                        compute(result.msg);
                    } else {
                        error(result.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    error(XMLHttpRequest.statusText);
                },
                complete: function (XMLHttpRequest, status) {
                    if (status === 'timeout') {
                        ajaxTimeoutTest.abort();
                    }
                },
                dataType: 'json'
            });
        });
        // 重新测评
        $('#quotaEvaluation > div.bottom > button').click(function () {
            $('div.form-group.mobile').removeClass('show').addClass('hidden')
                .siblings().removeClass('hidden').addClass('show');
            $('div.dtnq div.form-group.mobile > div > div.conter')
                .removeClass('hidden').addClass('show');
            $('#quotaEvaluation').removeClass('show').addClass('hidden');
            $('select').each(function () {
                $(this).parent().parent().removeClass('show').addClass('hidden');
            });
        });
    };
    // timer处理函数
    function SetRemainTime() {
        if (curCount === 0) {
            buttunUp();
        }
        else {
            localStorage.curCount = Number(localStorage.curCount) - 1;
            localStorage.curAddtime = Date.parse(new Date()) / 1000;
            curCount--;
            $('#send_sms').text('' + curCount + '秒');
        }
    }

    // 重新获取
    function buttunUp() {
        localStorage.curCount = 0;
        // 停止计时器
        window.clearInterval(InterValObj);
        // 启用按钮
        $('#send_sms').removeAttr('disabled');
        $('#send_sms').text('重新获取');
        $('#send_sms').css({
            'background-color': '#f08519',
            'color': '#fff',
            'border': '1px solid #f08519'
        });
    }

    // 是否为数字
    function checknumber(String) {
        if (parseFloat(String).toString() === 'NaN') {
            return false;
        }
        else {
            return true;
        }
    }

    // 计算额度
    function compute(v) {
        $('#AboutMoney').text(v);
        var y = $('div.dtnq div.form-group.mobile.show > div > div.yuan');
        var h = y.height();
        $('div.dtnq div.form-group.mobile.show > div > div.conter').removeClass('show').addClass('hidden');
        $('#quotaEvaluation').height(h).removeClass('hidden').addClass('show');
    }

    // 当前域名
    function getBaseUrl() {
        // protocol 属性是一个可读可写的字符串，可设置或返回当前 URL 的协议,所有主要浏览器都支持 protocol 属性
        var ishttps;
        if ('https:' === document.location.protocol) {
            ishttps = true;
        }
        else {
            ishttps = false;
        }
        var url = window.location.host;
        if (ishttps) {
            url = 'https://' + url;
        }
        else {
            url = 'http://' + url;
        }
        return url;
    }

    // 信息提示
    function tip(result) {
        if (result.code === 1) {
            success(result.msg);
        }
        else {
            error(result.msg);
        }
    }

    // 成功信息
    function success(msg) {
        alert(msg);
    }

    // 错误信息
    function error(msg) {
        alert(msg);
    }

    return customElement;
});
