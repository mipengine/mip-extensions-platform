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
        var mipProject = document.querySelectorAll('.mip-project');
        //
        for (var m = 0; m < mipProject.length; m++) {
            bianli(m);
        }
        function bianli(m) {
            var tcClose = mipProject[m].querySelector('.tc-close');
            var yanzm = mipProject[m].querySelector('.getYzm');
            var tijao = mipProject[m].querySelector('.tijao');
            // 性别
            var sexu = mipProject[m].querySelectorAll('.someU');
            function sexuTabs(sexn, sexu) {
                sexn.addEventListener('click', function () {
                    for (var mm = 0; mm < sexu.length; mm++) {
                        sexu[mm].classList.remove('bgChange');
                        sexu[mm].classList.add('bgChange1');
                    }
                    sexn.classList.remove('bgChange1');
                    sexn.classList.add('bgChange');
                }, false);
            }
            for (var n = 0; n < sexu.length; n++) {
                sexuTabs(sexu[n], sexu);
            }
            //
            var targetId = '';
            function tancshow(btnname) {
                btnname.addEventListener('click', function () {
                    targetId = this.querySelector('.target-id').innerHTML;
                    mipProject[m].classList.add('d-show');
                }, false);
            }
            for (var i = 0; i < btnZx.length; i++) {
                tancshow(btnZx[i]);
            }
            tcClose.addEventListener('click', function () {
                mipProject[m].classList.remove('d-show');
            }, false);
            var name;
            var sex;
            var tell;
            var getYzm;
            var inputLiuyan;
            var jiamSign = '';
            var regName = /^[\u4E00-\u9FA5]{1,5}$/;
            var regMobile = /^1[3456789]{1}\d{9}$/;
            tijao.addEventListener('click', function () {
                if (targetId === '') {
                    targetId = mipProject[m].querySelector('.target-id').innerHTML;
                }
                name = mipProject[m].querySelector('.input-name').innerHTML;
                tell = mipProject[m].querySelector('.input-tell').innerHTML;
                getYzm = mipProject[m].querySelector('.input-yanzm').innerHTML;
                inputLiuyan = mipProject[m].querySelector('.input-liuyan').innerHTML;
                // 姓名
                if (name === '' || !regName.test(name)) {
                    mipProject[m].querySelector('.err-name').classList.add('err-show');
                    return;
                }
                mipProject[m].querySelector('.err-name').classList.remove('err-show');
                // 性别
                sex = mipProject[m].querySelector('.bgChange').getAttribute('value');
                // 手机号
                if (tell === '' || !regMobile.test(tell)) {
                    mipProject[m].querySelector('.err-tell').classList.add('err-show');
                    return;
                }
                mipProject[m].querySelector('.err-tell').classList.remove('err-show');
                // 验证码
                if (getYzm === '' || typeof (getYzm) === 'undefined') {
                    mipProject[m].querySelector('.err-yzm').classList.add('err-show');
                    return;
                }
                mipProject[m].querySelector('.err-yzm').classList.remove('err-show');
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
                            mipProject[m].querySelector('.ts-txt').innerHTML = '留言成功';
                        }
                        else if (tjTxt.code === -99) {
                            mipProject[m].querySelector('.ts-txt').innerHTML = '验证码错误';
                        }
                        else {
                            mipProject[m].querySelector('.ts-txt').innerHTML = '留言失败';
                        }
                        if (mipProject[m].querySelector('.zhez').getAttribute('class').indexOf('hidd') > -1) {
                            mipProject[m].querySelector('.zhez').classList.remove('hidd');
                            mipProject[m].querySelector('.tishi').classList.add('err-show');
                            mipProject[m].querySelector('.qued').addEventListener('click', function () {
                                mipProject[m].querySelector('.zhez').classList.add('hidd');
                                mipProject[m].querySelector('.tishi').classList.remove('err-show');
                            });
                        }
                        else {
                            mipProject[m].querySelector('.tc-bg').classList.add('hidd');
                            mipProject[m].querySelector('.tishi').classList.add('err-show');
                            mipProject[m].querySelector('.qued').addEventListener('click', function () {
                                mipProject[m].classList.remove('d-show');
                                mipProject[m].querySelector('.tc-bg').classList.remove('hidd');
                                mipProject[m].querySelector('.tishi').classList.remove('err-show');
                            });
                        }
                    }
                };
            }, false);
            yanzm.addEventListener('click', function () {
                tell = mipProject[m].querySelector('.input-tell').innerHTML;
                if (tell === '' || !regMobile.test(tell)) {
                    mipProject[m].querySelector('.err-tell').classList.add('err-show');
                    return;
                }
                mipProject[m].querySelector('.err-tell').classList.remove('err-show');
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
        }
        //
    };

    return customElement;
});
