/**
 * @file mip-jm-message 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        $el.find('#question li').click(function () {
            var txt = $(this).find('span').text();
            $el.find('#formcontent').val(txt);
        });

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
        // 留言提交
        $el.find('#formbtn').click(function () {
            var name = $el.find('#formname').val();
            var phone = $el.find('#formphone').val();
            var content = $el.find('#formcontent').val();

            if ($.trim(name).length === 0) {
                openarticle($el.find('.model_bg'), $el.find('.article_model'), '姓名不能为空');
                return false;
            }

            if ($.trim(name).length > 20) {
                openarticle($el.find('.model_bg'), $el.find('.article_model'), '姓名字符数不能过20位');
                return false;
            }

            if ($.trim(phone).length === 0) {
                openarticle($el.find('.model_bg'), $el.find('.article_model'), '手机号不能为空');
                return false;
            }

            if (!(/^1[34578]\d{9}$/.test(phone))) {
                openarticle($el.find('.model_bg'), $el.find('.article_model'), '手机号格式不正确');
                return false;
            }

            if ($.trim(phone).length > 500) {
                openarticle($el.find('.model_bg'), $el.find('.article_model'), '留言字符数不能过500');

                return false;
            }

            $el.find('form').submit();
        });
    };

    return customElement;
});
