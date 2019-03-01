/**
 * @file mip-hs-searchword 组件
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
        var $input = $el.find('.serch_go');

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
        });

        function serchsub() {
            var serword = $el.find('.serch_go').val();
            if (serword !== '') {
                window.top.location.href = '/search?keyword=' + serword;
            }
            else {
                openarticle($el.find('.model_bg'), $el.find('.article_model'), '搜索内容不能为空');
                //              return alert('搜索内容不能为空！');
            }
        }

        $el.find('.ser_btn').on('click', function () {
            serchsub();
        });
        $form.on('keydown', function (e) {
            var keycode = e.keyCode;
            if (keycode === 13 || keycode === 9) {
                e.preventDefault();
                serchsub();
                $input.blur();
                return false;
            }

        });
    };

    return customElement;
});
