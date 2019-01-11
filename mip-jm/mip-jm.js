/**
 * @file mip-jm 组件
 * @author
 */

define(function (require) {
    'use strict';

    let customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        let btnZx = document.querySelectorAll('.btn-zx');
        let mipProject = this.element;
        // let mipProject = document.querySelector('.mip-project');
        let tcClose = mipProject.querySelector('.tc-close');
        let yanzm = mipProject.querySelector('.getYzm');
        let tijao = mipProject.querySelector('.tijao');
        let targetId = '';
        function tancshow(btnname) {
            btnname.addEventListener('click', function () {
                targetId = this.querySelector('.target-id').innerHTML;
                mipProject.classList.add('d-show');
            }, false);
        }
        for (let i = 0; i < btnZx.length; i++) {
            tancshow(btnZx[i]);
        }
        tcClose.addEventListener('click', function () {
            mipProject.classList.remove('d-show');
        }, false);
        let name;
        let sexRadio;
        let sex;
        let tell;
        let getYzm;
        let inputLiuyan;
        let jiamSign = '';
        let regName = /^[\u4E00-\u9FA5]{1,5}$/;
        let regMobile = /^1[3456789]{1}\d{9}$/;
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
            for (let s = 0; s < sexRadio.length; s++) {
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
            let tij = new XMLHttpRequest();
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
                    let tjTxt = JSON.parse(tij.responseText);
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
            let jiami = new XMLHttpRequest();
            jiami.open('post', 'https://perapp.jmw.com.cn/signForMip.php');
            jiami.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            jiami.send('phone=' + tell);
            jiami.onreadystatechange = function () {
                if (jiami.readyState === 4 && jiami.status === 200) {
                    let jiamCode = JSON.parse(jiami.responseText);
                    if (jiamCode.code === 1) {
                        jiamSign = jiamCode.sign;
                        let xhr = new XMLHttpRequest();
                        xhr.open('post', 'https://perapp.jmw.com.cn/sendAuthCodeForMip.php');
                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        xhr.send('phone=' + tell + '&sign=' + jiamSign);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                            }
                        };
                    }
                }
                let time = 60;
                let intervalId = setInterval(function () {
                    time = time - 1;
                    if (time === 0) {
                        yanzm.innerHTML = '获取验证码';
                        clearInterval(intervalId);
                        yanzm.removeAttribute('disabled');
                    }
                    else {
                        yanzm.innerHTML = `重新发送${time}s`;
                        yanzm.setAttribute('disabled', 'disabled');
                    }
                }, 1000);
            };
        }, false);
    };

    return customElement;
});
