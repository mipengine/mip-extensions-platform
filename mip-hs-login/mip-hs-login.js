/**
 * @file mip-hs-login 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
	 * 第一次进入可视区回调，只会执行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var ajaxurl = $el.attr('data-url');
        $el.find('.login').click(function () {
            var phone = $.trim($el.find('.telphone').val());
            var pass = $.trim($el.find('.passText').val());
            var code = $.trim($el.find('.input_idf').val());
            var remember = '';
            if ($el.find('.check').hasClass('checkbox')) {
                remember = true;
            }

            $.ajax({
                type: 'POST',
                url: ajaxurl,
                cache: false,
                data: 'account=' + phone + '&password=' + pass + '&code=' + code
                    + '&remember=' + remember + '&t=' + Math.random(),
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (data.status === 1) {
                        $el.find('.error').html(data.msg);
                        var Url = 'http://hsanswer.altke.cn/captcha';
                        Url = Url + '/' + Math.random();
                        $el.find('.idf_img_show').attr('src', Url);
                    }

                    if (data.status === 0) {
                        if (data.data.close === true) {
                            window.close();
                        }
                        else {
                            window.location.href = data.data.url;
                        }
                    }

                },
                error: function (e) {
                    $el.find('.error').html('登录出错');
                    return;
                }
            });
        });
        $el.find('.idf_img_show').on('click', function () {
            var Url = '/captcha';
            Url = Url + '/' + Math.random();
            $(this).attr('src', Url);
        });
        $el.find('.check').on('click', function () {
            if ($(this).hasClass('checked')) {
                $(this).removeClass('checked');
            }
            else {
                $(this).addClass('checked');
            }
        });
    };

    return customElement;
});
