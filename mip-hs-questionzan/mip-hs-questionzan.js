/**
 * @file mip-hs-questionzan 组件
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
        $('body').on('click', '.zan', function () {
            var That = $(this);
            var unzan = That.parent().attr('url-unzan');
            var zan = That.parent().attr('url-zan');
            var urlid = That.parent().attr('url-id');
            if (That.hasClass('zanactive')) {
                $.ajax({
                    type: 'post',
                    url: unzan,
                    data: {
                        'answer_id': urlid
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status === 0) {
                            var b = That.text();
                            var oText = parseFloat(b);
                            That.text(data.data.count);
                            if (That.text() < 0) {
                                That.text() === 0;
                            }

                            That.removeClass('zanactive');
                            That.parents('.addzan').css({
                                'background-color': '#fff5e5',
                                'color': '#ff9900'
                            });
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
                        'answer_id': urlid
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(That);
                        if (data.status === 0) {
                            var b = That.text();
                            var oText = parseFloat(b);
                            That.addClass('zanactive');
                            That.parents('.addzan').css({
                                'background-color': '#ff9900',
                                'color': '#fff'
                            });
                            That.text(data.data.count);
                            if (That.text() > 1) {
                                That.text() === 1;
                            }
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
