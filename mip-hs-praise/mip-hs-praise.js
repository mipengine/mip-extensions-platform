/**
 * @file mip-hs-praise 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
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
        $el.find('.praise').click(function () {
            var That = $(this);
            var unzan = That.parent().attr('url-unzan');
            var zan = That.parent().attr('url-zan');
            var num = That.parent().siblings('.constants').html();
            if (That.hasClass('praiseon')) {
                $.ajax({
                    type: 'post',
                    url: unzan,
                    data: {
                        'answer_id': num
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status === 0) {
                            var b = That.children('i').text();
                            var oText = parseFloat(b);
                            That.children('i').text(oText - 1);
                            That.removeClass('praiseon');
                        }
                        else {
                            openarticle($el.find('.model_bg'), $el.find('.article_model'), data.msg);
                        }
                    },
                    error: function (data) {
                        if (data.statusText === 'Unauthorized') {
                            openAlart('请登录', function () {
                                window.top.location.href = '/login?service=welcome';
                            });
                        }

                    }
                });
            }
            else {
                $.ajax({
                    type: 'post',
                    url: zan,
                    data: {
                        'answer_id': num
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status === 0) {
                            var b = That.children('i').text();
                            var oText = parseFloat(b);
                            That.addClass('praiseon');
                            That.children('i').text(oText + 1);
                        }
                        else {
                            openarticle($el.find('.model_bg'), $el.find('.article_model'), data.msg);
                        }
                    },
                    error: function (data) {
                        if (data.statusText === 'Unauthorized') {
                            openAlart('请登录', function () {
                                window.top.location.href = '/login?service=welcome';
                            });
                        }

                    }
                });
            }
        });
    };
    return customElement;
});
