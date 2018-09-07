/**
 * @file mip-miaotu-login 组件
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

        // 登录界面手机号输入框
        var logValUserName = ele.querySelector('#logValUserName');
        logValUserName.addEventListener('blur', function () {
            var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (logValUserName.value === '' || logValUserName.value === '请输入手机号') {
                logValUserName.parentNode.children[1].style.display = 'block';
                logValUserName.parentNode.children[1].innerHTML = '账号不能为空！';
                return;
            }
            else if (!phoneReg.test(this.value)) {
                logValUserName.parentNode.children[1].style.display = 'block';
                logValUserName.parentNode.children[1].innerHTML = '账号不存在！';
            }
            else {
                logValUserName.parentNode.children[1].innerHTML = '';
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
        var loginValidate = ele.querySelector('#loginValidate');
        loginValidate.addEventListener('blur', function () {
            var reg = /^[A-Za-z0-9]{6}$/;
            if (loginValidate.value === '') {
                loginValidate.parentNode.children[2].style.display = 'block';
                loginValidate.parentNode.children[2].innerHTML = '验证码不能为空！';
                return;
            }
            else if (!reg.test(this.value)) {
                loginValidate.parentNode.children[2].style.display = 'block';
                loginValidate.parentNode.children[2].innerHTML = '验证码输入有误！';
            }
            else {
                loginValidate.parentNode.children[2].innerHTML = '';
            }
        });

        // 登录界面用户名输入框
        var logPwdUserName = ele.querySelector('#logPwdUserName');
        logPwdUserName.addEventListener('blur', function () {
            var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (logPwdUserName.value === '' || logPwdUserName.value === '请输入用户名') {
                logPwdUserName.parentNode.children[1].style.display = 'block';
                logPwdUserName.parentNode.children[1].innerHTML = '用户名不能为空！';
                return;
            }
            else if (!phoneReg.test(this.value)) {
                logPwdUserName.parentNode.children[1].style.display = 'block';
                logPwdUserName.parentNode.children[1].innerHTML = '用户名不存在！';
            }
            else {
                logPwdUserName.parentNode.children[1].innerHTML = '';
            }
        });

        // 登录界面密码输入框
        var loginPassword = ele.querySelector('#loginPassword');
        loginPassword.addEventListener('blur', function () {
            var reg = /^[A-Za-z0-9]{6,12}$/;
            if (loginPassword.value === '') {
                loginPassword.parentNode.children[1].style.display = 'block';
                loginPassword.parentNode.children[1].innerHTML = '密码不能为空！';
                return;
            }
            else if (!reg.test(this.value)) {
                loginPassword.parentNode.children[1].style.display = 'block';
                loginPassword.parentNode.children[1].innerHTML = '请输入6-12位包含数字或字母的密码！';
            }
            else {
                loginPassword.parentNode.children[1].innerHTML = '';
            }
        });

        // 密码和短信登录切换
        var loginByPwd = ele.querySelector('#loginByPwd');
        var logVal = ele.querySelector('#log_val');
        var logPwd = ele.querySelector('#log_pwd');
        var loginByVal = ele.querySelector('#loginByVal');
        loginByPwd.addEventListener('click', function () {
            logVal.style.display = 'none';
            loginByPwd.style.display = 'none';
            logPwd.style.display = 'block';
            loginByVal.style.display = 'block';
        });

        loginByVal.addEventListener('click', function () {
            logVal.style.display = 'block';
            loginByPwd.style.display = 'block';
            logPwd.style.display = 'none';
            loginByVal.style.display = 'none';
        });

    };

    return customElement;
});
