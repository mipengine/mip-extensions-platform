/**
 * @file mip-linktion-fortune-consults 组件
 * @author
 */

define(function (require) {
    'use strict';
    // 需要引入jquery
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        $el.find('.card-but .but-advisory').on('click', function () {
            $(this).parent().siblings('.click-lightbox').removeClass('slide-up').addClass('slide');
        });
        $el.find('.click-lightbox .click-hidden').on('click', function () {
            $(this).parent('.click-lightbox').removeClass('slide').addClass('slide-up');
        });
        $el.find('.planner-submit-consult').on('click', function () {
            $(this).siblings('.click-lightbox').removeClass('slideUp').addClass('slide');
        });
        $el.find('.but-submit.consult-submit').on('click', function () {
            var inputName = $(this).siblings('.form-group-input').children('input[name="name"]').val();
            var inputPhone = $(this).siblings('.form-group-input').children('input[name="phone"]').val();
            var checkboxArry = $(this).siblings('.checkbox-flex').children('.form-group-checkbox');
            var checkboxR = checkboxArry.children('input[type=radio]:checked').val();
            var plannerId = $(this).parents('.consult-box').data('plannerid');
            var productId = $(this).parents('.consult-box').data('productid');
            var consultUrl = $(this).parents('.consult-box').data('consulturl');
            var pcForm = $el.find('form.pc-form')[0];
            var phoneForm = $el.find('form.phone-form')[0];
            if ($(window).width() < 769) {
                if (phoneForm.reportValidity()) {
                    sendData(consultUrl);
                }
            }
            else {
                if (pcForm.reportValidity()) {
                    sendData(consultUrl);
                }
            }
            function sendData(consultUrl) {
                var bodyData = {
                    'productId': productId,
                    'userName': inputName,
                    'userMobile': inputPhone,
                    'contactTime': checkboxR,
                    'plannerId': plannerId
                };
                fetch(consultUrl, {
                    method: 'POST', // or 'PUT'
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(bodyData)// data can be `string` or {object}!
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    if (data.code === 0) {
                        window.location.reload();
                    }
                    else {
                        console.log(data.error);
                    }
                });
            }
        });
    };

    return customElement;
});
