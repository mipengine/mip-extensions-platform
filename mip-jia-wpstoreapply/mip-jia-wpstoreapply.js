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
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;

        var msg = ele.querySelector(TYPE);
        var cfg = jsonParse(msg.textContent);
        var isEnd = true;
        $(cfg.btn).on('click', function () {
            var tel = $(cfg.tel).val();
            if (!MRULE.test(tel)) {
                tipMask('请输入正确的电话号码~');
                return;
            }
            if (isEnd) {
                isEnd = false;
                $(cfg.loading).show();
                fetch(cfg.url, {
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
                    $(cfg.loading).hide();
                    isEnd = true;
                    return res.json();
                }).then(function (res) {
                    if (Number(res.code) === 1) {
                        tipMask('预约成功~');
                    } else {
                        tipMask(res.msg);
                    }
                }).catch(function (err) {
                    $(cfg.loading).hide();
                    isEnd = true;
                    console.log('Fetch错误:' + err);
                });
            }
        });
    };

    return customElement;
});