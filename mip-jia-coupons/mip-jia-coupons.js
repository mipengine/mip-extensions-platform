/**
 * @file mip-jia-coupons 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    customElement.prototype.firstInviewCallback = function () {
        var $ele = $(this.element);
        var couponElement = $ele.find('script[discount-coupon]');
        var enabled = !!couponElement;
        if (!enabled) {
            return false;
        }
        var configJson = JSON.parse(couponElement.text());
        var cnData = couponStr(configJson.coupons);
        var cnStr = cnData.str;
        var cnIds = cnData.ids;

        var parms = {shopId: configJson.shopId, promotionIds: cnIds};


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

        // 拼接优惠券html，ids
        function couponStr(data) {
            var datas = null;
            if (data && data.length) {
                datas = {'str': '', 'ids': []};
                datas.str = '<ul class="coupon-list">';
                for (var i = 0; i < data.length; i++) {
                    datas.str += '<li data-id=' + data[i].pomotionId + '><i></i><p><em>￥</em>';
                    datas.str += data[i].money + '</p><span>' + data[i].desc + '</span></li>';
                    datas.ids.push(data[i].pomotionId);
                }
                datas.str += '</ul>';
            }
            return datas;
        }


        // 领取优惠券html
        var popStr = [
            '<div class="get-coupon-pop fixed-pop">',
            '    <div class="pop-content">',
            '        <span class="close-btn"></span>',
            '        <div class="pop-detail">',
            '            <h3>一键领取所有优惠</h3>',
            cnStr,
            '            <div class="form-area">',
            '                <input type="tel" maxlength="11" placeholder="输手机号，领取所有优惠">',
            '                <span class="apply-btn">立即领取</span>',
            '            </div>',
            '        </div>',
            '    </div>',
            '</div><div class="pop-mask"></div>'
        ].join('');


        // 领取成功html
        var succStr = [
            '<div class="fixed-pop get-coupon-success">',
            '    <div class="pop-content">',
            '        <span class="close-btn"></span>',
            '        <div class="pop-detail">',
            '            <h3><i></i><p>优惠券领取成功！</p></h3>',
            '            <div class="gray-content">',
            '                <h4>已领到优惠券</h4>',
            cnStr,
            '                <p class="tip">* 部分优惠券已领完，感谢您的支持！</p>',
            '            </div>',
            '        </div>',
            '    </div>',
            '</div>'
        ].join('');

        $ele.append(succStr, popStr);


        // 显示优惠券弹层
        $ele.find('.btn').click(function () {
            $ele.find('.get-coupon-pop, .pop-mask').css('display', 'block');
        });

        // 关闭弹层
        $ele.find('.fixed-pop .close-btn, .pop-mask').click(function () {
            $ele.find('.fixed-pop, .pop-mask').css('display', 'none');
        });

        // 领取优惠券
        function succCouponState(res) {
            var oUl = $ele.find('.get-coupon-success');
            res.json().then(function (data) {
                if (data.statusCode === '0000') {
                    $ele.find('.get-coupon-pop').css('display', 'none');
                    var error = 0;
                    for (var i = 0; i < data.result.length; i++) {
                        if (data.result[i].promotionObtainResult !== 'SUCCESS') {
                            error++;
                            oUl.find('li[data-id="' + data.result[i].promotionId + '"]').addClass('fail');
                        }
                    }
                    if (!!error) {
                        $ele.find('.get-coupon-success .tip').css('display', 'block');
                    }
                    $ele.find('.get-coupon-success').css('display', 'block');
                } else {
                    tipMask(data.msg);
                }
            });
        }

        $ele.find('.apply-btn').click(function () {
            var regPhone = /^1[3|4|5|7|8]\d{9}$/;
            var phone = $(this).prev().val();
            if (!regPhone.test(phone)) {
                tipMask('请输入正确的手机号~');
                return;
            }
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
                    console.log(res.statusText);
                }
            }).catch(function (err) {
                $('.loading-icon').css('display', 'none');
                console.log('Fetch错误:' + err);
            });
        });

    };

    return customElement;
});
