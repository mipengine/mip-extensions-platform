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
                        var message = '请填写' + label;
                        window._hmt && window._hmt.push(['_trackEvent', 'input_error', message]);
                        alert(message);
                        return false;
                    }
                }

                var pattern = $element.attr('pattern');
                if (pattern) {
                    var regexp = new RegExp(pattern);
                    if (!regexp.test(value)) {
                        var message = label + '格式不正确';
                        window._hmt && window._hmt.push(['_trackEvent', 'input_error', message]);
                        alert(message);
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

        var $button = $form.find('[data-submit=true]');
        $button.click(function () {
            $button.attr('disable', true);

            var url = $form.attr('action');
            var lightboxId = $form.attr('close-lightbox-id');

            var trackEvent = false;
            if ($form.data('track-event')) {
                trackEvent = $form.data('track-event').split(',');
                trackEvent.unshift('_trackEvent');
            }

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

                        if (trackEvent) {
                            window._hmt && window._hmt.push(trackEvent);
                        }
                        return true;
                    } else {
                        window._hmt && window._hmt.push(['_trackEvent', 'submit_error', response.msg]);
                        alert(response.msg);
                        $button.attr('disable', false);
                        return false;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window._hmt && window._hmt.push(['_trackEvent', 'submit_error', errorThrown]);
                    alert('提交失败，请重试。');
                    $button.attr('disable', false);
                    return false;
                }
            });
        });
    };

    return customElement;
});
