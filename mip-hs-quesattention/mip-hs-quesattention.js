/**
 * @file mip-hs-quesattention 组件
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
        $('body').on('click', '.attention', function () {
            var That = $(this);
            var unattention = That.parent().attr('url-unattention');
            var attention = That.parent().attr('url-attention');
            var userid = That.parent().attr('user-id');
            if (That.hasClass('gzactive')) {
                $.ajax({
                    type: 'post',
                    url: attention,
                    data: {
                        'user_id': userid
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status === 0) {
                            That.removeClass('gzactive');
                            That.text('已关注');
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
                    url: unattention,
                    data: {
                        'user_id': userid
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status === 0) {
                            That.addClass('gzactive');
                            That.text('关注');
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
