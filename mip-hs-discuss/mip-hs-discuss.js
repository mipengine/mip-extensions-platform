/**
 * @file mip-hs-discuss 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    $('body').on('click', '.disnum', function () {
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
                                + '<span class="discuss_zannum zanshow borderRadius" url-unzan ="http://hsanswer.altke.cn/comment/unzan"'
                                + 'url-zan ="http://hsanswer.altke.cn/comment/zan" url-id ="'
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
                                + '<span class="discuss_zannum borderRadius" url-unzan ="http://hsanswer.altke.cn/comment/unzan"'
                                + 'url-zan ="http://hsanswer.altke.cn/comment/zan" url-id ="'
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
                            + comments[i].answer_id + ' data-url="http://hsanswer.altke.cn/comment" user-pid='
                            + comments[i].id + '><span class="btn_back">回复</span>'
                            + '<div class="replay_show"><div class="replay_show_text subgo" contenteditable="true" >回复 '
                            + comments[i].user.name + '</div><div class="replay_show_btn">'
                            + '<span class="off_btn">取消</span><span class="on_btn ajaxSubmit">回复</span></div></div>'
                            + '</mip-hs-replayshow></li>';

                    }

                    That.parents('.answer_other').siblings('.discuss_show').find('.discuss_list').append(str);
                }
                else {
                    alert('暂时没有人评论');
                }
            },
            error: function (data) {
                $('.loading').hide();
                alert(data.msg);
            }
        });
    });
    $('body').on('click', '.discuss_zannum', function () {
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
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    if (data.statusText === 'Unauthorized') {
                        alert('请登录');
                        window.top.location.href = '/login?service=welcome';
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
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    if (data.statusText === 'Unauthorized') {
                        alert('请登录');
                        window.top.location.href = '/login?service=welcome';
                    }

                }
            });
        }
    });
    customElement.prototype.firstInviewCallback = function () {};
    return customElement;
});
