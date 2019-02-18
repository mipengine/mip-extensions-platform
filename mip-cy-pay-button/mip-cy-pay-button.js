/**
 * @file mip-cy-pay-button 组件
 * @author 春雨前端开发组
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();
    var domain = 'https://m.chunyuyisheng.com';
    var secretSwitch = false;

    // 获取开关状态
    function getSwitchStatus(data) {
        $.ajax({
            url: domain + '/m/get_wx_qr_switch/',
            type: 'get',
            data: data || {},
            cache: false,
            success: function (res) {
                secretSwitch = !!res.redirect;
            }
        });
    }

    customElement.prototype.firstInviewCallback = function () {
        var $ele = $(this.element);
        var autoPay = $ele.attr('auto-pay') === '1';
        var toast = require('./toast');
        var linkUrl = $ele.attr('link-url');
        var clinicNo = $ele.attr('clinic-no');
        var secondClinicNo = $ele.attr('second-clinic-no');

        if (linkUrl) {
            getSwitchStatus({
                'clinic_no': clinicNo,
                'second_clinic_no': secondClinicNo
            });
        }

        /**
         * 初始化依赖第三方组件的部分
         */
        init();

        function init() {
            $ele.on('click', function () {
                var loginUrl = $ele.attr('login-url') || '';
                var orderName = $ele.attr('order-name') || '';
                var orderDesc = $ele.attr('order-desc') || '';
                var orderType = $ele.attr('order-type') || '';
                var partner = $ele.attr('partner') || '';
                var failUrl = $ele.attr('fail-url') || '';
                var infoDict = $ele.attr('info-dict') || '';

                if (secretSwitch) {
                    window.top.location.href = linkUrl;
                    return;
                }
                if (loginUrl) {
                    window.top.location.href = loginUrl;
                }
                else {
                    if ($ele.hasClass('disabled')) {
                        return;
                    }

                    $ele.addClass('disabled');
                    $.ajax({
                        url: domain + '/weixin/pay/create_order/',
                        type: 'post',
                        cache: false,
                        data: {
                            'finish_fail_url': failUrl,
                            'order_name': orderName,
                            'order_type': orderType,
                            'partner': partner,
                            'order_desc': orderDesc,
                            'info_dict': infoDict
                        },
                        success: function (res) {
                            if (res && res.baidu_pay_url) {
                                if (autoPay) {
                                    window.location.replace(res.baidu_pay_url);
                                }
                                else {
                                    window.location.href = res.baidu_pay_url;
                                }
                            }
                            else {
                                toast(res.error_msg);
                            }
                        },
                        complete: function () {
                            $ele.removeClass('disabled');
                        }
                    });
                }
            });
            if (autoPay) {
                $ele.trigger('click');
            }
        }
    };

    return customElement;
});
