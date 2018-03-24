/**
 * @file mip-cy-pay-button 组件
 * @author 春雨前端开发组
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    require('./initJs');
    var customElement = require('customElement').create();
    var domain = 'https://m.chunyuyisheng.com';

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.build = function () {
        var $ele = $(this.element);

        /**
         * 初始化依赖第三方组件的部分
         */
        init();

        function init() {
            if (window.CYUI) {
                $ele.on('click', function () {
                    var loginUrl = $ele.attr('login-url') || '';
                    var doctorId = $ele.attr('doctor-id') || '';
                    var orderName = $ele.attr('order-name') || '';
                    var orderDesc = $ele.attr('order-desc') || '';
                    var orderType = $ele.attr('order-type') || '';
                    var partner = $ele.attr('partner') || '';
                    var failUrl = $ele.attr('fail-url') || '';
                    var infoDict = $ele.attr('info-dict') || '';

                    if (loginUrl) {
                        window.location.href = loginUrl;
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
                                    window.location.href = res.baidu_pay_url;
                                }
                                else {
                                    window.CYUI.toast(res.error_msg);
                                }
                            },
                            complete: function () {
                                $ele.removeClass('disabled');
                            }
                        });
                    }
                });
            }
            else {
                setTimeout(init, 0);
            }
        }
    };

    return customElement;
});
