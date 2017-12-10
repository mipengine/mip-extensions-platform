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
    function tipMask(msg, duration) {
        clearTimeout(window.tipMaskTimer);
        window.tipMaskTimer = null;
        duration = duration || 2000;
        if ($('.popup-maskEdit').length > 0) {
            $('.popup-maskEdit').remove();
        }
        $('body').append('<div class="popup-maskEdit">' + msg + '</div>');
        window.tipMaskTimer = setTimeout(function () {
            $('.popup-maskEdit').fadeOut(100, function () {
                $(this).remove();
            });
        }, duration);
    }

    customElement.prototype.build = function () {
        var ele = this.element;
        /* global MIP */
        MIP.prerenderElement(ele);
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
                '<div class="pay-in-advance fixed-pop">',
                '    <div class="pop-content">',
                '        <span class="close-btn"></span>',
                '        <div class="pop-detail">',
                '            <div class="desc">',
                '                <p>需支付订金：<span>￥' + params['order-money'] + '</span></p>',
                '                <span class="btn">去支付</span>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div><div class="pop-mask"></div>'
            ].join('');
        } else {
            var str = [
                '<div class="make-an-appointment fixed-pop">',
                '    <div class="pop-content">',
                '        <span class="close-btn"></span>',
                '        <div class="pop-detail">',
                '            <div class="desc">',
                '                <h5>免费预约，锁定爆款特价</h5>',
                '                <div class="input-box">',
                '                    <input type="tel" maxlength="11" placeholder="输入手机号">',
                '                </div>',
                '                <span class="btn">立即预约</span>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div><div class="pop-mask"></div>'
            ].join('');
        }
        str && $(ele).append(str);

        // 显示弹层
        $(ele).find('.order').click(function () {
            $(ele).find('.fixed-pop').css('display', 'block');
            $(ele).find('.pop-mask').css('display', 'block');
        });

        // 关闭弹层
        function closePop() {
            $(ele).find('.fixed-pop, .pop-mask').css({'display': 'none'});
        }
        $(ele).find('.close-btn, .pop-mask').click(function () {
            closePop();
        });



        // 发起请求
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
        $(ele).find('.btn').click(function () {
            var tel = $(ele).find('input[type="tel"]');

            var datas = params['request-data'];
            if (tel.length) {
                if (!regPhone.test(tel.val())) {
                    tipMask('请输入正确的手机号~');
                    return;
                }
                datas.mobileNumber = tel.val();
            }
            $('.loading-icon').css('display', 'block');
            fetch(params['request-url'], {
                mode: 'cors',
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(datas),
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
