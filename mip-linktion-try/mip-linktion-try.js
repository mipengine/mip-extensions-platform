/**
 * @file mip-linktion-try 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('jquery');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var tryBtn = $el.find('#try-btn');
        this.addEventAction('open', function (event) {
            var inputWrap = tryBtn.parents().siblings('.modal-input-info').children('.form-group');
            var body = {};
            body.name = inputWrap.children('input#name').val();
            body.mobile = inputWrap.children('input#mobile').val();
            body.type = tryBtn.data('type');
            var checkboxWrap = tryBtn.parents().siblings('.select-checkbox').children('.form-group');
            var checked = checkboxWrap.children('input[type=radio]:checked').val();
            if (body.name === '') {
                alert('请填写姓名');
            }
            else if (body.mobile === '') {
                alert('请填写电话');
            }
            else {
                body.state = checked;
                if (!body.state) {
                    alert('请选择我的家庭情况');
                }
                else {
                    $.ajax({
                        type: 'post',
                        data: body,
                        url: 'https://47.100.7.250:8080/product/saveCustomization'
                    }).done(function (data) {
                        if (data) {
                            $el.find('.form-close').trigger('click');
                            $el.find('.try-btn-end').trigger('click');
                        }
                    });
                }
            }
        });
    };
    return customElement;
});
