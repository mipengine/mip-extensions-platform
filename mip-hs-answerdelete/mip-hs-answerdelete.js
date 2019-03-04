/**
 * @file mip-hs-answerdelete 组件
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
        $el.find('.qx_close').click(function () {
            closearticle($el.find('.model_bg'), $el.find('.article_model'));
        });
        $el.find('.answer_delete').click(function () {
            var That = $(this);
            var id = That.attr('data-id');
            openAlart('您确定要删除吗？', function () {
                $.ajax({
                    url: '/question/del',
                    data: {
                        id: id
                    },
                    type: 'POST',
                    success: function (data) {
                        if (data.status === 0) {
                            That.parents('li').remove();
                            var num = $('#question').children('i').text() - 1;

                            if (num < 0) {
                                num === 0;
                                $('#question').children('i').text(num);
                            }
                            else {
                                $('#question').children('i').text(num);
                            }
                        }
                        else {
                            openarticle($el.find('.model_bg'), $el.find('.article_model'), data.msg);
                        }
                    }
                });
            });

        });
    };
    return customElement;
});
