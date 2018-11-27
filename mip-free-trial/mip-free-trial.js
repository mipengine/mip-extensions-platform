/**
 * @file mip-free-trial 提交申请免费体验
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var ele = self.element;
        var util = require('util');

        // 验证手机号码
        function isTel(value) {
            return (/^0?(13[0-9]|14[57]|15[0-9]|16[6]|17[0-9]|18[0-9]|19[89])[0-9]{8}$/.test(value.trim()));
        }

        // 关闭弹框
        function closeModal() {
            var modalBgElement = ele.querySelector('.reveal-modal-bg');
            var modalBoxElement = ele.querySelector('.reveal-modal');
            var modalTxDesElement = ele.querySelector('.tx-des');
            var elementArr = [modalBgElement, modalBoxElement, modalTxDesElement];
            util.css(elementArr, {
                display: 'none'
            });
        }

        // 验证码等待提醒
        function verifyWait(tel) {
            var modalTxDesElement = ele.querySelector('.tx-des');
            var sendPhoneElement = ele.querySelector('.send-phone');
            var verifyBtnElement = ele.querySelector('.reg-verify-btn');
            var wait = 60;
            var interval = setInterval(function () {
                var time = --wait;
                verifyBtnElement.innerHTML = '重新获取(' + time + ')';
                if (time <= 0) {
                    verifyBtnElement.innerHTML = '获取验证码';
                    clearInterval(interval);
                };
            }, 1000);
            sendPhoneElement.innerHTML = tel;
            util.css(modalTxDesElement, {
                display: 'block'
            });
        }

        // 提交SQL表单
        function submitSQL() {
            var name = ele.querySelector('input[name=name]').value;
            var tel = ele.querySelector('input[name=tel]').value;
            var company = ele.querySelector('input[name=company]').value;
            var source = 'MIP站';
            var Url = 'https://m.yutang.winb2c.com/zscallbackmipnew.php';
            fetch(Url, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    body: 'name=' + name + '&tel=' + tel + '&company=' + company + '&source=' + source
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data.status === 0) {
                        closeModal();
                        ele.querySelector('input[name=name]').value = '';
                        ele.querySelector('input[name=tel]').value = '';
                        ele.querySelector('input[name=company]').value = '';
                        ele.querySelector('input[name=code]').value = '';
                    }
                    alert(data.des);
                });
        }

        // 关闭弹框
        self.addEventAction('modalClose', function (event) {
            closeModal();
        });

        // 验证表单
        self.addEventAction('checkFrom', function (event) {
            var name = ele.querySelector('input[name=name]').value;
            var tel = ele.querySelector('input[name=tel]').value;
            var company = ele.querySelector('input[name=company]').value;
            if (name.trim() === '') {
                alert('请输入姓名！');
                return;
            }
            if (tel.trim() === '') {
                alert('请输入手机！');
                return;
            }
            if (!isTel(tel)) {
                alert('请输入合法的手机！');
                return;
            }
            if (company.trim() === '') {
                alert('请输入企业名称！');
                return;
            }

            var modalBgElement = ele.querySelector('.reveal-modal-bg');
            var modalBoxElement = ele.querySelector('.reveal-modal');
            var elementArr = [modalBgElement, modalBoxElement];
            util.css(elementArr, {
                display: 'block'
            });
            util.css(modalBoxElement, {
                top: '8rem'
            });
        });

        // 获取验证码
        self.addEventAction('getVerify', function (event) {
            var tel = ele.querySelector('input[name=tel]').value;
            var Url = 'https://m.yutang.winb2c.com/sms/app.php';
            fetch(Url, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    body: 'mobile=' + tel
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data.result === 0) {
                        verifyWait(tel);
                    } else {
                        alert(data.errmsg);
                    }
                });
        });

        // 提交表单
        self.addEventAction('submitFrom', function (event) {
            var code = ele.querySelectorAll('input[name=code]')[0].value;
            if (code.trim() === '') {
                alert('请输入短信验证码！');
                return;
            };
            var Url = 'https://m.yutang.winb2c.com/sms/checkCode.php';
            fetch(Url, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    body: 'code=' + code
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data.status === 0) {
                        submitSQL();
                    } else {
                        alert(data.des);
                    }
                });
        });
    };

    return customElement;
});