/**
 * @file mip-upgrade-service 组件
 * @author 春雨前端开发组
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $ele = $(this.element);
        var partner = $ele.attr('partner') || '';
        var problemId = $ele.attr('problem-id') || '';

        $ele.find('.cyui-switch').on('click', function (event) {
            if ($(this).prop('checked')) {
                var price = $ele.find('.cyui-switch:checked').val();
                var totalPrice = 2 + Number(price);
                $ele.find('.cyui-switch').not(this).prop('checked', false);
                var infoDict = JSON.stringify({
                    'upgrade_type': $ele.find('.cyui-switch:checked').data('upgrade-type'),
                    'problem_id': problemId,
                    'partner': partner
                });
                window.MIP.setData({
                    'orderType': 'qa_upgrade',
                    'infoDict': infoDict
                });
            }
            else {
                var totalPrice = 2;
                var infoDict = JSON.stringify({
                    'upgrade_type': '',
                    'problem_id': problemId,
                    'partner': partner
                });
                window.MIP.setData({
                    'orderType': 'paid_clinic',
                    'infoDict': infoDict
                });
            }
            $ele.find('#total-price').text('¥ ' + totalPrice);
        });
    };

    return customElement;
});