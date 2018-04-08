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
        var that = this;
        var tryBtn = $el.find('#try-btn');
        var inputWrap = tryBtn.parents().siblings('.modal-input-info').children('.form-group');
        var inputs = inputWrap.children('input');
        var formItem = tryBtn.parents('.modal-body').children('form')[0];
        function hideTry(that) {
            that.addEventAction('close', function (event) {
                $el.css('display', 'none');
            });
        }
        that.addEventAction('open', function (event) {
            if (formItem.reportValidity()) {
                var body = {};
                body.type = tryBtn.data('type');
                inputs.each(function (i, item) {
                    var inputKey = item.getAttribute('id');
                    var inputVal = item.value;
                    body[inputKey] = inputVal;
                });
                if ($el.find('.select-checkbox').length !== 0) {
                    var choiceKey = $('.select-checkbox').attr('id');
                    var choiceType = $('.select-checkbox').data('choicetype');
                    var checkboxWrap = tryBtn.parents().siblings('.select-checkbox').children('.form-group');
                    if (choiceType === 'radio') {
                        var checked = checkboxWrap.children('input[type=radio]:checked').val();
                        body[choiceKey] = checked;
                    }
                    else if (choiceType === 'checkbox') {
                        var checkedbox = checkboxWrap.children('input[type=checkbox]:checked');
                        var checkedboxArry = [];
                        checkedbox.each(function (index, item) {
                            checkedboxArry.push(item.getAttribute('value'));
                        });
                        body[choiceKey] = checkedboxArry;
                    }
                }
                var aipUrl = tryBtn.data('url');
                if (aipUrl.length !== 0) {
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
                            hideTry(that);
                        }
                    });
                }
            }
        });
    };
    return customElement;
});
