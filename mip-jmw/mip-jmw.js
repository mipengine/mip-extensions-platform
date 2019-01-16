/**
 * @file mip-jmw 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var btnZx = document.querySelectorAll('.btn-zx');
        // var mipProject = this.element;
        var mipProject = document.querySelector('.mip-project');
        var tcClose = mipProject.querySelector('.tc-close');
        var yanzm = mipProject.querySelector('.getYzm');
        var tijao = mipProject.querySelector('.tijao');
        var targetId = '';
        function tancshow(btnname) {
            btnname.addEventListener('click', function () {
                targetId = this.querySelector('.target-id').innerHTML;
                mipProject.classList.add('d-show');
            }, false);
        }
        for (var i = 0; i < btnZx.length; i++) {
            tancshow(btnZx[i]);
        }
        tcClose.addEventListener('click', function () {
            mipProject.classList.remove('d-show');
        }, false);
        var name;
        var sexRadio;
        var sex;
        var tell;
        var getYzm;
        var inputLiuyan;
        var jiamSign = '';
        var regName = /^[\u4E00-\u9FA5]{1,5}$/;
        var regMobile = /^1[3456789]{1}\d{9}$/;
        tijao.addEventListener('click', function () {
            name = mipProject.querySelector('.input-name').value;
            sexRadio = document.getElementsByName('sex');
            tell = mipProject.querySelector('.input-tell').value;
            getYzm = mipProject.querySelector('.input-yanzm').value;
            inputLiuyan = mipProject.querySelector('.input-liuyan').value;
            // 姓名
            if (name === '' || !regName.test(name)) {
                mipProject.querySelector('.err-name').classList.add('err-show');
                return;
            }
            mipProject.querySelector('.err-name').classList.remove('err-show');
            // 性别
            for (var s = 0; s < sexRadio.length; s++) {
                if (sexRadio[s].checked === true) {
                    sex = sexRadio[s].value;
                }
            }
            // 手机号
            if (tell === '' || !regMobile.test(tell)) {
                mipProject.querySelector('.err-tell').classList.add('err-show');
                return;
            }
            mipProject.querySelector('.err-tell').classList.remove('err-show');
            // 验证码
            if (getYzm === '' || typeof (getYzm) === 'undefined') {
                mipProject.querySelector('.err-yzm').classList.add('err-show');
                return;
            }
            mipProject.querySelector('.err-yzm').classList.remove('err-show');
            var tij = new XMLHttpRequest();
            tij.open('post', 'https://perapp.jmw.com.cn/messageUnLoginForMip.php');
            tij.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            tij.send('target_id=' + targetId + '&realname='
                + name + '&telphone=' + tell + '&gender='
                + sex + '&code=' + getYzm + '&content='
                + inputLiuyan);
            tij.onreadystatechange = function () {
                if (tij.readyState === 4 && tij.status === 200) {
                    tijao.setAttribute('disabled', 'disabled');
                    setTimeout(function () {
                        tijao.removeAttribute('disabled', 'disabled');
                    }, 3000);
                    var tjTxt = JSON.parse(tij.responseText);
                    if (tjTxt.code === 1 || tjTxt.code === -5) {
                        mipProject.querySelector('ts-txt').innerHTML = '留言成功';
                    }
                    else {
                        mipProject.querySelector('ts-txt').innerHTML = '留言失败';
                    }
                    mipProject.querySelector('tc-bg').classList.add('opact');
                    mipProject.querySelector('tishi').classList.add('err-show');
                    mipProject.querySelector('qued').addEventListener('click', function () {
                        mipProject.classList.remove('d-show');
                    });
                }
            };
            mipProject.querySelector('tc-bg').classList.remove('opact');
        }, false);
        yanzm.addEventListener('click', function () {
            tell = mipProject.querySelector('.input-tell').value;
            if (tell === '' || !regMobile.test(tell)) {
                mipProject.querySelector('.err-tell').classList.add('err-show');
                return;
            }
            mipProject.querySelector('.err-tell').classList.remove('err-show');
            var jiami = new XMLHttpRequest();
            jiami.open('post', 'https://perapp.jmw.com.cn/signForMip.php');
            jiami.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            jiami.send('phone=' + tell);
            jiami.onreadystatechange = function () {
                if (jiami.readyState === 4 && jiami.status === 200) {
                    var jiamCode = JSON.parse(jiami.responseText);
                    if (jiamCode.code === 1) {
                        jiamSign = jiamCode.sign;
                        var xhr = new XMLHttpRequest();
                        xhr.open('post', 'https://perapp.jmw.com.cn/sendAuthCodeForMip.php');
                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        xhr.send('phone=' + tell + '&sign=' + jiamSign);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                            }
                        };
                    }
                }
                var time = 60;
                var intervalId = setInterval(function () {
                    time = time - 1;
                    if (time === 0) {
                        yanzm.innerHTML = '获取验证码';
                        clearInterval(intervalId);
                        yanzm.removeAttribute('disabled');
                    }
                    else {
                        yanzm.innerHTML = '重新发送' + time + 's';
                        yanzm.setAttribute('disabled', 'disabled');
                    }
                }, 1000);
            };
        }, false);
    };

    return customElement;
});
