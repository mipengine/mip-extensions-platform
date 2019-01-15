/**
 * @file mip-jm-telphone 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);

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
        $el.find('.publiccall').click(function () {
            var phone = $el.find('.publicphone').val();
            if ($.trim(phone).length === 0) {
                openarticle($el.find('.model_bg'), $el.find('.article_model'), '手机号码不能为空');

                return false;
            }

            if (!(/^1[34578]\d{9}$/.test(phone))) {
                openarticle($el.find('.model_bg'), $el.find('.article_model'), '请输入正确的手机号码');

                return false;
            }

            $el.find('form').submit();
        });
    };

    return customElement;
});
