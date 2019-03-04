/**
 * @file mip-hs-commentpraise 组件
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
        $('body').on('click', '.zan', function () {
            var That = $(this);
            var unzan = That.parent().attr('url-unzan');
            var zan = That.parent().attr('url-zan');
            var urlid = That.parent().attr('url-id');
            if (That.hasClass('praiseactive')) {
                $.ajax({
                    type: 'post',
                    url: unzan,
                    data: {
                        'comment_id': urlid
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status === 0) {
                            var b = That.text();
                            var oText = parseFloat(b);
                            That.text(data.data.count);
                            That.removeClass('praiseactive');
                            That.parents('.num').removeClass('numactive');
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
                        'comment_id': urlid
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(That);
                        if (data.status === 0) {
                            var b = That.text();
                            var oText = parseFloat(b);
                            That.addClass('praiseactive');
                            That.parents('.num').addClass('numactive');
                            That.text(data.data.count);
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
