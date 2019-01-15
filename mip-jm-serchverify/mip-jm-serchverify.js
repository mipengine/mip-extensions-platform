/**
 * @file mip-jm-search 组件
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
        $el.find('.serbtn').click(function () {
            var name = $el.find('.search').val();
            if ($.trim(name).length === 0) {
                openarticle($el.find('.model_bg'), $el.find('.article_model'), '输入的关键词不能为空');
                // 提示
                return false;
            }

            $el.find('form').submit();
        });
    };

    return customElement;
});
