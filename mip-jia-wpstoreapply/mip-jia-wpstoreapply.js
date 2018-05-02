/**
 * @file mip-jia-wpstoreapply 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var MRULE = /^1[3|4|5|6|7|8|9]\d{9}$/;
    var TYPE = 'script[type="application/json"]';
    var KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAurXXoxX'
            + 'AHK4vwRMDDQRFhkQH6tDbVN/k69JGBAGxm2N4+2TVDCKWrBqKjgm'
            + 'jQSqubHiURa9O3bfAXUDYyV7S3/Vajc+NP0kU0l6Fl8q4AldSsQkSf'
            + 'Lq5NrcxU0QsXJbfRCEIyS+lfG9/O+XGVrvpy21hOqs6Zmgvsa5//d6BT'
            + 'C31FOb/d9H4C/iFgIXqAvcEJms+agPpXTMDDjxbB6/6P8qZoqKR1iztv3'
            + 'bzwowU7YRpMVwwdr74K+ka7p0Y+KnnE4oiX3b5rDfQ/GOdG9OJhpGMAUkpR'
            + 'jXy01hu9bT+ep7sYTlhVPhwr+8OICO7tsxNoNW7InOix26oY0IvqWcGjwIDAQAB';

    function jsonParse(json) {
        try {
            return JSON.parse(json);
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    // 提示层
    var tipMaskTimer = null;

    // 弹层需全局加载，所以加载到body上
    function tipMask(msg, duration) {
        clearTimeout(tipMaskTimer);
        duration = duration || 2000;
        if ($('.popup-maskEdit').length > 0) {
            $('.popup-maskEdit').remove();
        }
        $('body').append('<div class="popup-maskEdit">' + msg + '</div>');
        tipMaskTimer = setTimeout(function () {
            $('.popup-maskEdit').fadeOut(100, function () {
                $(this).remove();
            });
        }, duration);
    }

    /**
     * 加密手机号
     *
     * @class
     * @param {string} phone 手机号
     * @param {string} key 加密key
     */
    function mobileEncrypt(phone, key) {
        /* global JSEncryptExports */
        var JSEncrypt = new JSEncryptExports.JSEncrypt();
        JSEncrypt.setKey(key);

        // base64编码在传输到后端的时候，+会变成空格，因此替换掉
        var ep = JSEncrypt.encrypt(phone).replace(/\+/g, '%2B');

        return ep;
    }


    customElement.prototype.build = function () {

        // 加密依赖(必须加载该js进行加密处理)
        var scriptDom = document.createElement('script');
        scriptDom.src = '//mued2.jia.com/js/mobile/jsencrypt.js';
        document.body.appendChild(scriptDom);
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;

        var msg = document.querySelector(TYPE);
        var cfg = jsonParse(msg.textContent);

        var bEle = document.querySelector(cfg.btn);
        var mEle = document.querySelector(cfg.tel);
        var loading = document.querySelector(cfg.loading);

        var isEnd = true;

        function apply() {
            var tel = mEle.value;
            if (!MRULE.test(tel)) {
                tipMask('请输入正确的电话号码~');
                return;
            }
            tel = mobileEncrypt(tel, KEY);
            if (isEnd) {
                isEnd = false;
                loading.style.display = 'inherit';
                fetch('//m.jia.com/wangpu/shop/reservation/add', {
                    mode: 'cors',
                    method: 'post',
                    headers: {'Content-type': 'application/json;charset=UTF-8'},
                    body: JSON.stringify({
                        'shopId': cfg.shopId,
                        'phone': tel,
                        'sourceReferrer': cfg.sourceReferrer
                    }),
                    credentials: 'include'
                }).then(function (res) {
                    loading.style.display = 'none';
                    isEnd = true;
                    return res.json();
                }).then(function (res) {
                    if (Number(res.code) === 1) {
                        tipMask('预约成功~');
                    } else {
                        tipMask(res.msg);
                    }
                }).catch(function (err) {
                    loading.style.display = 'none';
                    isEnd = true;
                    console.log('Fetch错误:' + err);
                });
            }
        }


        bEle.addEventListener('click', apply, false);
    };

    return customElement;
});