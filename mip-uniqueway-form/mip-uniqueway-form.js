/**
 * @file mip-uniqueway-form 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $form = $(this.element);

        var validateForm = function ($form) {
            var data = {};
            var $elements = $form.find('[name]');
            for (var i = 0; i < $elements.length; i++) {
                var $element = $($elements[i]);
                var value = $element.val();
                var label = $element.attr('label');

                var required = $element.attr('required');
                if (required) {
                    if ($.trim(value) === '') {
                        alert('请填写' + label);
                        return false;
                    }
                }

                var pattern = $element.attr('pattern');
                if (pattern) {
                    var regexp = new RegExp(pattern);
                    if (!regexp.test(value)) {
                        alert(label + '格式不正确');
                        return false;
                    }
                }

                data[$element.attr('name')] = value;
            }

            return data;
        };

        var resetForm = function ($form) {
            var $elements = $form.find('[name]');
            for (var i = 0; i < $elements.length; i++) {
                var $element = $($elements[i]);
                if ($element.attr('type') !== 'hidden') {
                    $element.val('');
                }
            }
        };

        var $button = $form.find('input[type=submit]');
        $button.click(function () {
            $button.attr('disable', true);

            var url = $form.attr('action');
            var lightboxId = $form.attr('close-lightbox-id');

            var data = validateForm($form);
            if (data === false) {
                $button.removeAttr('disable');
                return false;
            }

            $.ajax({
                url: url,
                data: data,
                type: 'POST',
                success: function (response) {
                    if (response.err === 0) {
                        resetForm($form);
                        $button.removeAttr('disable');
                        if (lightboxId) {
                            $('#' + lightboxId).hide();
                            $('#MIP-LLIGTBOX-MASK').hide();
                            $('html').removeClass('mip-no-scroll');
                            storage.set('mip-uniqueway-timing-' + lightboxId, true);
                        } else {
                            alert('提交成功，顾问会尽快与你联系');
                        }
                        return true;
                    } else {
                        alert(response.msg);
                        $button.attr('disable', false);
                        return false;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('提交失败，请重试。');
                    $button.attr('disable', false);
                    return false;
                }
            });
        });
    };

    return customElement;
});
