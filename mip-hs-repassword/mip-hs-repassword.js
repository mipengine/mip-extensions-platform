/**
 * @file mip-hs-repassword 组件
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
        var $form = $el.find('form');

        function closearticle($modelbg, $model) {
            $modelbg.fadeOut(300);
            $model.fadeOut(300);
        }

        function openarticle($modelbg, $model, $text) {
            $el.find('.text').text($text);
            $modelbg.fadeIn(300);
            $model.fadeIn(300);
        }

        function openAlart($showtext, callback) {
            $el.find('.qx_close').show();
            openarticle($el.find('.model_bg'), $el.find('.article_model'), $showtext);
            if (callback) {
                $el.find('.article_close').click(function () {
                    closearticle($el.find('.model_bg'), $el.find('.article_model'));
                    callback();
                });
            }
        }

        $el.find('.article_close').click(function () {
            closearticle($el.find('.model_bg'), $el.find('.article_model'));
            $el.find('.qx_close').fadeOut(300);
        });
        $el.find('.qx_close').click(function () {
            closearticle($el.find('.model_bg'), $el.find('.article_model'));
            $el.find('.qx_close').fadeOut(300);
        });

        $form.on('keydown', function (e) {
            var keycode = e.keyCode;
            var $phone = $el.find('input');
            if (keycode === 13 || keycode === 9) {
                e.preventDefault();
                submitgo();
                $phone.blur();
                return false;
            }

        });

        function submitgo() {
            var oldpwd = $el.find('.old_pwd').val();
            var newpwd = $el.find('.new_pwd').val();
            var confirmpwd = $el.find('.confirm_pwd').val();
            $.ajax({
                url: '/password',
                type: 'POST',
                data: {
                    'old_pwd': oldpwd,
                    'new_pwd': newpwd,
                    'confirm_pwd': confirmpwd
                },
                success: function (data) {

                    if (data.status === 0) {
                        openAlart(data.msg, function () {
                            window.top.location.href = '/profile';
                        });
                    //                          alert(data.msg)
                    //                          window.history.go(-1)
                    }
                    else {
                        openarticle($el.find('.model_bg'), $el.find('.article_model'), data.msg);
                        //							$(".error").html(data.msg);
                    }
                },
                error: function (data) {
                    window.top.location.href = '/login';
                }
            });
        }
        $el.find('#pwd').click(function () {
            submitgo();
        });

    };

    return customElement;
});
