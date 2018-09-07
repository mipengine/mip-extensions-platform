/**
 * @file mip-miaotu-register 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;

        // 注册界面手机号输入框
        var registerName = ele.querySelector('#registerName');
        registerName.addEventListener('blur', function () {
            var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (registerName.value === '' || registerName.value === '请输入手机号') {
                registerName.parentNode.children[1].style.display = 'block';
                registerName.parentNode.children[1].innerHTML = '手机号码不能为空！';
                return;
            }
            else if (!phoneReg.test(this.value)) {
                registerName.parentNode.children[1].style.display = 'block';
                registerName.parentNode.children[1].innerHTML = '请输入正确的手机号码！';
            }
            else {
                registerName.parentNode.children[1].innerHTML = '';
            }
        });

        // 验证码输入框
        var btn = ele.querySelector('.clickme-get-countdown');
        function time(btn, wait) {
            if (wait === 0) {
                btn.removeAttribute('disabled');
                btn.value = '免费获取验证码';
            }
            else {
                btn.setAttribute('disabled', true);
                btn.value = wait + 's';
                wait--;
                setTimeout(function () {
                    time(btn, wait);
                }, 1000);
            }
        }
        btn.onclick = function () {
            time(this, 60);
        };
        var registerValidate = ele.querySelector('#registerValidate');
        registerValidate.addEventListener('blur', function () {
            var reg = /^[A-Za-z0-9]{6}$/;
            if (registerValidate.value === '') {
                registerValidate.parentNode.children[2].style.display = 'block';
                registerValidate.parentNode.children[2].innerHTML = '验证码不能为空！';
                return;
            }
            else if (!reg.test(this.value)) {
                registerValidate.parentNode.children[2].style.display = 'block';
                registerValidate.parentNode.children[2].innerHTML = '验证码输入有误！';
            }
            else {
                registerValidate.parentNode.children[2].innerHTML = '';
            }
        });

        // 下一步
        var btnNextStep = ele.querySelector('#btnNextStep');
        var regFirst = ele.querySelector('#reg_first');
        var regSecond = ele.querySelector('#reg_second');
        btnNextStep.addEventListener('click', function () {
            var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
            var reg = /^[A-Za-z0-9]{6}$/;
            if (phoneReg.test(registerName.value) && reg.test(registerValidate.value)) {
                regFirst.style.display = 'none';
                regSecond.style.display = 'block';
            }
        });

        // 注册界面密码输入框
        var registerPassword = ele.querySelector('#registerPassword');
        registerPassword.addEventListener('blur', function () {
            var reg = /^[A-Za-z0-9]{6,12}$/;
            if (registerPassword.value === '') {
                registerPassword.parentNode.children[1].style.display = 'block';
                registerPassword.parentNode.children[1].innerHTML = '密码不能为空！';
                return;
            }
            else if (!reg.test(this.value)) {
                registerPassword.parentNode.children[1].style.display = 'block';
                registerPassword.parentNode.children[1].innerHTML = '请输入6-12位包含数字或字母的密码！';
            }
            else {
                registerPassword.parentNode.children[1].innerHTML = '';
            }
        });

        // 注册界面确认密码
        var registerRepassword = ele.querySelector('#registerRepassword');
        registerRepassword.addEventListener('blur', function () {
            var pwd1 = registerPassword.value;
            var pwd2 = registerRepassword.value;

            if (pwd1 === '') {
                registerRepassword.parentNode.children[1].style.display = 'block';
                registerRepassword.parentNode.children[1].innerHTML = '确认密码不能为空！';
                return;
            }
            else if (pwd1 !== pwd2) {
                registerRepassword.parentNode.children[1].style.display = 'block';
                registerRepassword.parentNode.children[1].innerHTML = '两次密码输入不一致！';
            }
            else {
                registerRepassword.parentNode.children[1].innerHTML = '';
            }
        });
    };

    return customElement;
});
