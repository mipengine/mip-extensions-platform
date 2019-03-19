/**
 * @file mip-hs-replayshow 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var mo = function (e) {
            e.preventDefault();
        };
        function getScrollTop() {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            }
            else if (document.body) {
                scrollTop = document.body.scrollTop;
            }

            return scrollTop;
        }

        /***禁止滑动***/
        function stop() {
            document.body.style.overflow = 'hidden';
            document.addEventListener('touchmove', mo, false); // 禁止页面滑动
        }

        /***取消滑动限制***/
        function move() {
            document.body.style.overflow = ''; // 出现滚动条
            document.removeEventListener('touchmove', mo, false);
        }

        function closearticle($modelbg, $model) {
            $modelbg.fadeOut(300);
            $model.fadeOut(300);
            move();
        }

        function openarticle($modelbg, $model, $text) {
            stop();
            $modelbg.bind('touchmove', function (e) {
                e.preventDefault();
            });
            $model.bind('touchmove', function (e) {
                e.preventDefault();
            });
            $model.css('top', getScrollTop() + 300 + 'px');
            $modelbg.css('height', getScrollTop() + 1000 + 'px');
            $el.find('.text').text($text);
            $modelbg.fadeIn(300);
            $model.fadeIn(300);
        }

        function openAlart($showtext, callback) {
            stop();
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

        $('body').on('focus', '.replay_show_text', function () {
            var That = $(this);
            That.css({
                'text-indent': '0',
                'color': '#333'
            });
            That.text('');

        });
        $('body').on('blur', '.replay_show_text', function () {
            var That = $(this);
            if (That.text().length === 0) {
                That.css({
                    'text-indent': '12px',
                    'color': '#999'
                });
                var text = That.parents('mip-hs-replayshow').siblings('.avatar').find('.avatar_text').eq(0).text();
                That.text('回复 ' + text);
            }

        });
        $('body').on('click', '.btn_back', function () {
            var That = $(this);
            That.hide();
            That.siblings('.replay_show').fadeIn();
            var text = That.parents('mip-hs-replayshow').siblings('.avatar').find('.avatar_text').eq(0).text();
            That.siblings('replay_show').find('.replay_show_text').text('回复 ' + text);
        });

        $('body').on('click', '.off_btn', function () {
            var That = $(this);
            That.parents('.replay_show').hide();
            That.parents('.replay_show').siblings('.btn_back').show();
            var text = That.parents('mip-hs-replayshow').siblings('.avatar').find('.avatar_text').eq(0).text();
            That.parents('.replay_show_btn').siblings('.replay_show_text').css({
                'text-indent': '12px',
                'color': '#999'
            });
            That.parents('.replay_show_btn').siblings('.replay_show_text').text('回复 ' + text);
        });

        $('body').on('click', '.ajaxSubmit', function () {
            var That = $(this);
            var userid = That.parents('mip-hs-replayshow').attr('user-id');
            var dataurl = That.parents('mip-hs-replayshow').attr('data-url');
            var content = That.parents('.replay_show_btn').siblings('.subgo').html();
            var pid = That.parents('mip-hs-replayshow').attr('user-pid');

            $.ajax({
                url: dataurl,
                data: {
                    'answer_id': userid,
                    'pid': pid,
                    'content': content
                },
                type: 'post',
                success: function (data) {
                    if (data.status === 0) {
                        if (That.hasClass('on_btn')) {
                            var text = That.parents('mip-hs-replayshow')
                                .siblings('.avatar').find('.avatar_text').eq(0).text();
                            var str = '<div class="lists_replay">\n'
                                + '<p class="lists_next_title">'
                                + data.data.comment.name
                                + '</p>\n'
                                + '<p class="lists_next_text">' + data.data.comment.content + '</p>\n'
                                + '</div>';
                            That.parents('mip-hs-replayshow').siblings('.discuss_text').after(str);
                            That.parents('.replay_show').hide();
                            That.parents('.replay_show_btn').siblings('.replay_show_text').css({
                                'text-indent': '12px',
                                'color': '#999'
                            });
                            That.parents('.replay_show_btn').siblings('.replay_show_text').text('回复 ' + text);
                            That.parents('mip-hs-replayshow').siblings('.content').append(str);
                            That.parents('mip-hs-replayshow').find('.btn_back').show();
                            return;
                        }

                        window.location.reload();
                    }
                    else {
                        That.parents('mip-hs-replayshow').find('.btn_back').show();
                        openarticle($el.find('.model_bg'), $el.find('.article_model'), data.msg);
                    }
                },
                error: function (data) {
                    That.parents('mip-hs-replayshow').find('.btn_back').show();
                    if (data.statusText === 'Unauthorized') {
                        openAlart('请登录', function () {
                            window.top.location.href = '/login?service=welcome';
                        });
                    }

                }
            });

        });
    };
    return customElement;
});
