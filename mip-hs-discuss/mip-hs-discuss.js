/**
 * @file mip-hs-discuss 组件
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
        $el.find('.disnum').click(function () {
            var That = $(this);
            That.parents('.answer_other').siblings('.discuss_show').find('.discuss_list').empty();
            var userid = That.parent().attr('user-id');
            var dataurl = That.parent().attr('data-url');
            $.ajax({
                type: 'get',
                url: dataurl,
                data: {
                    'answer_id': userid
                },
                dataType: 'json',
                beforeSend: function () {
                    $('.loading').show();
                    That.parents('.answer_other').siblings('.discuss_show').find('.look_more').css('display', 'none');
                    That.parents('.answer_other').siblings('.discuss_show').find('.discuss_go').css('display', 'none');
                },
                success: function (data) {
                    $('.loading').hide();

                    if (data.status === 0) {
                        var comments = data.data.comments;
                        var str = '';
                        for (var i = 0; i < comments.length; i++) {
                            if (comments[i].azan_count > 0) {
                                str += '<li>'
                                    + '<div class="discuss_top avatar">'
                                    + '<a class="" href="/user/' + comments[i].user.id
                                    + '"><mip-img class="discuss_img" src="' + comments[i].user.avatar
                                    + '"></mip-img></a>'
                                    + '<a class="discuss_tit" href="/user/' + comments[i].user.id
                                    + '"><span class="discuss_title avatar_text">'
                                    + comments[i].user.name + '</span></a>'
                                    + '<span class="discuss_zannum zanshow borderRadius" url-unzan ="/comment/unzan"'
                                    + 'url-zan ="/comment/zan" url-id ="'
                                    + comments[i].id + '">' + comments[i].zan_count
                                    + '</span>'
                                    + '</div>'
                                    + '<p class="discuss_text">'
                                    + comments[i].content + '</p>';
                            }
                            else {
                                str += '<li>'
                                    + '<div class="discuss_top">'
                                    + '<a class="" href="/user/'
                                    + comments[i].user.id + '"><mip-img class="discuss_img" src="'
                                    + comments[i].user.avatar + '"></mip-img></a>'
                                    + '<a class="discuss_tit" href="/user/' + comments[i].user.id
                                    + '"><span class="discuss_title">' + comments[i].user.name + '</span></a>'
                                    + '<span class="discuss_zannum borderRadius" url-unzan ="/comment/unzan"'
                                    + 'url-zan ="/comment/zan" url-id ="'
                                    + comments[i].id + '">' + comments[i].zan_count
                                    + '</span>'
                                    + '</div>'
                                    + '<p class="discuss_text">'
                                    + comments[i].content + '</p>';
                            }
                            if (comments[i]._child) {
                                var comment = comments[i]._child;
                                for (var j = 0; j < comment.length; j++) {
                                    str += '<div class="lists_replay"><p class="lists_next_title">'
                                        + comment[j].user.name + '</p><p class="lists_next_text">'
                                        + comment[j].content + '</p></div>';
                                }
                            }

                            str += '<mip-hs-replayshow user-id='
                                + comments[i].answer_id + ' data-url="/comment" user-pid='
                                + comments[i].id + '><span class="btn_back">回复</span>'
                                + '<div class="replay_show">'
                                + '<div class="replay_show_text subgo" contenteditable="true" >回复 '
                                + comments[i].user.name + '</div><div class="replay_show_btn">'
                                + '<span class="off_btn">取消</span><span class="on_btn ajaxSubmit">回复</span></div></div>'
                                + '</mip-hs-replayshow></li>';
                        }

                        That.parents('.answer_other').siblings('.discuss_show').find('.discuss_list').append(str);
                        That.parents('.answer_other').siblings('.discuss_show')
                        .find('.look_more').css('display', 'block');
                        That.parents('.answer_other').siblings('.discuss_show')
                        .find('.discuss_go').css('display', 'flex');
                    }
                    else {
                        openarticle($el.find('.model_bg'), $el.find('.article_model'), '暂时没有人评论');
                        //                  alert('暂时没有人评论');
                    }
                },
                error: function (data) {
                    $('.loading').hide();
                    openarticle($el.find('.model_bg'), $el.find('.article_model'), data.msg);
                }
            });
        });
        $el.find('.discuss_zannum').click(function () {
            var That = $(this);
            var unzan = That.attr('url-unzan');
            var zan = That.attr('url-zan');
            var urlid = That.attr('url-id');
            if (That.hasClass('zanshow')) {
                $.ajax({
                    type: 'post',
                    url: unzan,
                    data: {
                        'comment_id': urlid
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data.data.count);
                        if (data.status === 0) {
                            var b = That.text();
                            var oText = parseFloat(b);
                            That.text(data.data.count);
                            if (That.text() < 0) {
                                That.text() === 0;
                            }

                            That.removeClass('zanshow');
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
                            That.addClass('zanshow');
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
