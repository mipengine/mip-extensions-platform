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
        $el.find('.card-phone-but a').on('touchstart', function () {
            $el.find('.details-iframe').hide();
            $el.find('.details-iframe video')[0].pause();
            $el.find('#MIP-LLIGTBOX-MASK').on('touchstart', function () {
                $el.find('.details-iframe').show();
            });
        });
        $el.find('.close').on('touchstart', function () {
            $el.find('.details-iframe').show();
        });
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
            var plannerId = '';
            var productId = '';
            var consultUrl = '';
            var inputName = $(this).siblings('.form-group-input').children('input[name="name"]').val();
            var inputPhone = $(this).siblings('.form-group-input').children('input[name="phone"]').val();
            var checkboxArry = $(this).siblings('.checkbox-flex').children('.form-group-checkbox');
            var checkboxR = checkboxArry.children('input[type=radio]:checked').val();
            plannerId = $(this).parents('.consult-box').data('plannerid');
            productId = $(this).parents('.consult-box').data('productid');
            consultUrl = $(this).parents('.consult-box').data('consulturl');
            if (inputName === '') {
                showTips('请填写姓名', 'err');
            }
            else if (inputPhone === '') {
                showTips('请填写电话', 'err');
            }
            else if (inputPhone.length !== 11) {
                showTips('请填写完整的手机号码', 'err');
            }
            else if (checkboxR === undefined) {
                showTips('请选择时间', 'err');
            }
            else if ($(window).width() < 769) {
                plannerId = $(this).parents('.click-lightbox-phone').data('plannerid');
                productId = $(this).parents('.click-lightbox-phone').data('productid');
                consultUrl = $(this).parents('.click-lightbox-phone').data('consulturl');
                var bodyData = {
                    productId: productId,
                    userName: inputName,
                    userMobile: inputPhone,
                    contactTime: checkboxR,
                    plannerId: plannerId
                };
                sendData(consultUrl, bodyData, $(this));
            }
            else {
                var bodyData = {
                    productId: productId,
                    userName: inputName,
                    userMobile: inputPhone,
                    contactTime: checkboxR,
                    plannerId: plannerId
                };
                sendData(consultUrl, bodyData, $(this));
            }
            function sendData(consultUrl, bodyData, that) {
                fetch(consultUrl, {
                    crossDomain: true,
                    credentials: 'include',
                    method: 'POST', // or 'PUT'
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(bodyData)// data can be `string` or {object}!
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    if (data.code === 0) {
                        if ($(window).width() < 769) {
                            showTips('请求成功', 'success');
                            reload();
                        } else {
                            showTips('发送成功', 'success');
                            that.parents('.click-lightbox').children('.click-hidden').click();
                            that.parents('.click-lightbox').siblings('.card-but')
                            .children('.but-advisory').text('咨询中').removeClass('but-advisory')
                            .addClass('consulting').off('click');
                        }
                    }
                    else {
                        console.log(data.error);
                    }
                });
            }
            function reload() {
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            }
            function hideHints() {
                setTimeout(function () {
                    $el.find('.web-hint').fadeOut();
                }, 6000);
            }
            function showTips(text, status) {
                var hintsHtml = '';
                if (status === 'err') {
                    hintsHtml = '<div class="web-error web-hint">'
                                + '<p>' + text + '</p>'
                                + '</div>';
                }
                else if (status === 'success') {
                    hintsHtml = '<div class="web-hint web-succeed">'
                                + ' <p>' + text + '</p>'
                                + ' </div>';
                }
                $el.find('.hints').html(hintsHtml);
                hideHints();
            }
        });
    };

    return customElement;
});
