/**
 * @file mip-linktion-fortune-guidetry 组件
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
            var aipUrl = tryBtn.data('url');
            var formItem = tryBtn.parents('form')[0];
            if (aipUrl.length !== 0) {
                if (body.name === '') {
                    formItem.reportValidity();
                }
                else if (body.mobile === '') {
                    formItem.reportValidity();
                }
                else {
                    body.state = checked;
                    var checkedbox = checkboxWrap.children('input[type=checkbox]:checked');
                    var checkedboxArry = [];
                    checkedbox.each(function (index, item) {
                        checkedboxArry.push(item.getAttribute('value'));
                    });
                    body.demand = checkedboxArry;
                    if (body.demand.length === 0) {
                        formItem.reportValidity();
                    }
                    else {
                        $.ajax({
                            url: aipUrl,
                            type: 'post',
                            data: body
                        }).done(function (data) {
                            if (data.code === 1009) {
                                alert('请登录');
                            }
                            else if (data) {
                                $el.find('.form-close').trigger('click');
                                $el.find('.try-btn-end').trigger('click');
                            }
                        });
                    }
                }
            }
        });
    };

    return customElement;
});
