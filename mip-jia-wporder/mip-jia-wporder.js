/**
 * @file mip-jia-wporder 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    // 倒计时
    var downTimer = null;
    function timeDown(startTime, endTime, callback) {
        clearInterval(downTimer);
        var countTime = Math.floor((new Date(endTime) - new Date(startTime)) / 1000);
        downTimer = setInterval(function () {
            if (countTime > 0) {
                var day = Math.floor(countTime / (3600 * 24));
                day < 10 ? day = '0' + day : day;
                var hour = Math.floor((countTime - day * 3600 * 24) / 3600);
                hour < 10 ? hour = '0' + hour : hour;
                var minutes = Math.floor((countTime - day * 3600 * 24 - hour * 3600) / 60);
                minutes < 10 ? minutes = '0' + minutes : minutes;
                countTime--;
                callback(day, hour, minutes);
            } else {
                clearInterval(downTimer);
            }
        }, 1000);
    }

    // 提示层
    var tipMaskTimer = null;
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

    /**
     * 加密手机号
     *
     * @class
     * @param {string} url 获取rsaPubKey接口地址
     * @return {Object}  返回rsaPubKey
     */
    function getRsaPubKey(url) {
        var promise = new Promise(function (resolve, reject) {
            fetch(url, {
                mode: 'cors',
                method: 'get',
                credentials: 'include'
            }).then(function (res) {
                if (res.ok) {
                    resolve(res);
                }
                else {
                    reject(new Error(this.statusText));
                }
            }).catch(function (err) {
                console.log('Fetch错误:' + err);
            });
        });
        return promise;
    }

    customElement.prototype.build = function () {
        var ele = this.element;
        /* global MIP */
        MIP.prerenderElement(ele);

        // 加密依赖
        var scriptDom = document.createElement('script');
        scriptDom.src = '//mued2.jia.com/js/mobile/jsencrypt.js';
        document.body.appendChild(scriptDom);
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;

        var params = JSON.parse(ele.dataset['requestParams'].replace(/'/g, '"'));
        // console.log(params)
        var type = parseInt(params['order-typ'], 10);
        var regPhone = /^1[3|4|5|7|8]\d{9}$/;

        // 加载不同的弹层
        if (!!type) {
            var str = [
                '<mip-fixed type="bottom" class="bottom-base wp-order-pop pay-in-advance">',
                '    <span class="close-btn"></span>',
                '    <p>需支付订金：<span>' + params['order-money'] + '</span></p>',
                '    <span class="btn">去支付</span>',
                '</mip-fixed><div class="pop-mask"></div>'
            ].join('');
        } else {
            var str = [
                '<mip-fixed type="bottom" class="bottom-base wp-order-pop make-an-appointment">',
                '    <span class="close-btn"></span>',
                '    <h3>免费预约，锁定爆款特价</h3>',
                '    <div class="input-box">',
                '        <input type="tel" maxlength="11" placeholder="输入手机号">',
                '    </div>',
                '    <span class="btn">立即预约</span>',
                '</mip-fixed><div class="pop-mask"></div>'
            ].join('');
        }
        str && $(ele).append(str);

        // 显示弹层
        $(ele).find('.order').click(function () {
            $(ele).find('.wp-order-pop').css('display', 'block');
            $(ele).find('.pop-mask').css('display', 'block');
        });

        // 关闭弹层
        function closePop() {
            $(ele).find('.wp-order-pop, .pop-mask').css({'display': 'none'});
        }
        $(ele).find('.close-btn, .pop-mask').click(function () {
            closePop();
        });



        // 请求成功
        function successFn(res) {
            res.json().then(function (res) {
                if (res.code === 1) {
                    if (res.data) {
                        window.location.href = res.data;
                    } else {
                        tipMask('预约成功~');
                    }
                    closePop();
                } else {
                    tipMask(res.msg);
                }
            });
        }

        // 发起请求
        function postApply(url, data) {
            fetch(url, {
                mode: 'cors',
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(function (res) {
                $('.loading-icon').css('display', 'none');
                if (res.ok) {
                    successFn(res);
                }
                else {
                    console.log(res.statusText);
                }
            }).catch(function (err) {
                $('.loading-icon').css('display', 'none');
                console.log('Fetch错误:' + err);
            });
        }

        // 提交信息
        $(ele).find('.btn').click(function () {
            var tel = $(ele).find('input[type="tel"]');

            var datas = params['request-data'];
            if (tel.length) {
                if (!regPhone.test(tel.val())) {
                    tipMask('请输入正确的手机号~');
                    return;
                }
                datas.phone = tel.val();
            }

            if (datas.phone && params['key-url']) {
                getRsaPubKey(params['key-url']).then(function (res) {
                    res.text().then(function (key) {
                        datas.phone = mobileEncrypt(datas.phone, key);
                    }).then(function () {
                        postApply(params['request-url'], datas);
                    });
                });
            } else {
                postApply(params['request-url'], datas);
            }

            $('.loading-icon').css('display', 'block');

        });


        // 倒计时
        var timeBox = ele.querySelector('.time-area');
        var timeDom = timeBox && timeBox.querySelector('em');
        if (!!timeBox) {
            var eTime = timeBox.dataset['time'].trim();
            var sTime = new Date();
            if (!!eTime && new Date(eTime) > new Date()) {
                timeDown(sTime, eTime, function (day, hour, minutes) {
                    timeDom.innerHTML = day + '天' + hour + '时' + minutes + '分';
                });
            }
        }
    };

    return customElement;
});
