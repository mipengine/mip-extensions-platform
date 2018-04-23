/**
 * @file mip-linktion-select-consulter 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var templateBbox = $el.find('#template_box')[0];
        var templates = require('templates');
        var src = $el.find('#planner_more').data('src');
        var change = $el.find('#change');
        function sendData(consultUrl, bodyData) {

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
        function fetchfun($el, templateBbox, templates, src) {
            fetch(src)
            .then(function (res) {
                return res.json();
            }).then(function (data) {
                if (data.data) {
                    var items = data.data.items;
                    templates.render(templateBbox, items).then(function (html) {
                        templateBbox.innerHTML = html;
                        valifypopValue($el);
                    });
                }
            });
        }
        function valifypopValue($el) {
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
                var phoneForm = $el.find('.phone-form')[0];
                if ($(window).width() < 769) {
                    if (phoneForm.reportValidity()) {
                        var bodyData = {
                            productId: productId,
                            userName: inputName,
                            userMobile: inputPhone,
                            contactTime: checkboxR,
                            plannerId: plannerId
                        };
                        sendData(consultUrl, bodyData);
                    }
                }
                else {
                    if (inputName === '') {
                        alert('请填写姓名');
                    } else if (inputPhone === '') {
                        alert('请填写电话');
                    } else if (checkboxR === undefined) {
                        alert('请选择时间');
                    } else {
                        var bodyData = {
                            productId: productId,
                            userName: inputName,
                            userMobile: inputPhone,
                            contactTime: checkboxR,
                            plannerId: plannerId
                        };
                        sendData(consultUrl, bodyData);
                    }
                }

            });
        }
        change.on('click', function () {
            fetchfun($el, templateBbox, templates, src);
        });
        fetchfun($el, templateBbox, templates, src);
    };
    return customElement;
});
