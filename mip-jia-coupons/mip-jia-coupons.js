/**
 * @file mip-jia-coupons 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

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

    // 标题
    function setTitle(data) {
        var str = '';
        var code = data[0].promotionCodeList[0];
        if (data.length === 1 && code) {
            str = '专属优惠码：' + code;
        } else {
            str = '专属优惠码';
        }
        return str;
    }

    // 二维码
    function setCode(data) {
        var str = '';
        var code = data[0].promotionCodeList[0];
        if (data.length === 1 && code) {
            str = '<div class="code-desc" data-text="' + data[0].promotionCodeList[0] + '"></div>';
        }
        return str;
    }

    // 优惠券
    function setCoupons(data) {
        var str = '';
        if (data && data.length) {
            for (var i = 0; i < data.length; i++) {
                str += '<li data-id="' + data[i].pomotionId + '">';
                str += '<span class="label">' + data[i].type + '</span>';
                str += '<span class="text">' + data[i].desc + '</span>';
                str += '<span class="num"></span></li>';
            }
        }
        return str;
    }

    // 优惠券不同状态的显示内容不同
    function setState(ele, data) {
        var str = '';
        if (data && data.length) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].promotionObtainResult !== 'SUCCESS') {
                    ele.find('li[data-id="' + data[i].promotionId + '"]').addClass('fail');
                } else {
                    if (data[i].promotionCodeList && data[i].promotionCodeList.length) {
                        str = '券码：' + data[i].promotionCodeList[0];
                        ele.find('li[data-id="' + data[i].promotionId + '"]').find('.num').html('').append(str);
                    }
                }
            }
        }
    }


    /**
     * 需提前加载js，所以使用build
     */
    customElement.prototype.build = function () {
        // 根据文本内容绘制二维码
        var scriptDom = document.createElement('script');
        scriptDom.src = '//mued2.jia.com/js/mobile/qrcode.min.js';
        document.body.appendChild(scriptDom);
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     * @return {customElement} 组件
     */
    customElement.prototype.firstInviewCallback = function () {
        var selF = this;
        var $ele = $(this.element);
        var couponElement = $ele.find('script[discount-coupon]');
        var enabled = !!couponElement;
        if (!enabled) {
            return false;
        }
        var configJson = JSON.parse(couponElement.text());
        var parms = configJson.parms;


        // 拼接优惠券领取成功的html
        var couponStr = setCoupons(configJson.coupons);
        var popStr = [
            '<div class="get-coupon-success fixed-pop">',
            '    <div class="pop-content">',
            '        <span class="bottom-close-btn"></span>',
            '        <div class="pop-detail">',
            '            <h3>到店优惠领取成功</h3>',
            '            <div class="details">',
            '                <h4></h4>',
            '                <div class="code">',
            '                </div>',
            '                <ul class="cps">',
            couponStr,
            '                </ul>',
            '                <div class="others">',
            '                    <div class="btns">',
            '                        <span class="save">保存截图</span>',
            '                        <span class="way">查看地图</span>',
            '                    </div>',
            '                    <p>· 部分优惠券已领完，感谢您的支持！</p>',
            '                    <p>· 截图保存此页面，到店出示，享受专属优惠。</p>',
            '                    <p>· 优惠详细使用规则请到店咨询商家。</p>',
            '                </div>',
            '            </div>',
            '        </div>',
            '    </div>',
            '</div>',
            '<div class="pop-mask"></div>'
        ].join('');

        $ele.append(popStr);



        // 关闭弹层
        $ele.find('.bottom-close-btn, .pop-mask').click(function () {
            $ele.find('.fixed-pop, .pop-mask').css('display', 'none');
        });

        // 领取优惠券
        function succCouponState(res) {
            res.json().then(function (data) {
                if (data.statusCode === '0000') {

                    // title
                    var tStr = setTitle(data.result);
                    $ele.find('h4').html('').append(tStr);

                    // code
                    var cStr = setCode(data.result);
                    $ele.find('.code').html('').append(cStr);

                    var cele = selF.element.querySelector('.code-desc');
                    if (cele) {
                        var ctext = cele.dataset.text;
                        /* global QRCode */
                        new QRCode(cele, ctext);
                    }

                    // coupons
                    setState($ele, data.result);

                    $ele.find('.fixed-pop, .pop-mask').css('display', 'block');
                } else {
                    tipMask(data.msg);
                }
            });
        }

        // 点击发起请求
        $ele.find('.btn').click(function () {
            $('.loading-icon').css('display', 'block');
            fetch(configJson.url, {
                mode: 'cors',
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(parms),
                credentials: 'include'
            }).then(function (res) {
                $('.loading-icon').css('display', 'none');
                if (res.ok) {
                    succCouponState(res);
                } else {
                    console.log(res.status);
                }
            }).catch(function (err) {
                $('.loading-icon').css('display', 'none');
                console.log('Fetch错误:' + err);
            });
        });

        // 保存截图
        $ele.find('.save').click(function () {
            tipMask('请使用手机截屏功能~');
        });

        // 查看路线
        $ele.find('.way').click(function () {
            $ele.find('.fixed-pop, .pop-mask').css('display', 'none');
            window.location.href = configJson['map-url'];
        });

    };

    return customElement;
});