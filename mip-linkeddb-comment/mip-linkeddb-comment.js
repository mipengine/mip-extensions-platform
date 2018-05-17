/**
 * @file mip-linkeddb-comment 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var car = require('./jquery-weui.min');

	/**
	 * 第一次进入可视区回调，只会执行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        // 页面类型
        var pageType = $(ele).parent().find('.review-cont').data('pageType');
        // 页面 oid
        var pageOid = $(ele).parent().find('.review-cont').data('pageOid');

        function setCommentModule(res) {
            var titleHtml = ''; // titleHtml 评论区域头部
            var spanNum = ''; // 评论数量文本
            if (res.data.total_cnt) {
                spanNum += '<i>"+res.data.total_cnt+"</i>条评论';
            } else {
                spanNum += '暂无评论';
            }
            // 评论头部 html
            titleHtml += '<h4 class="review-title">'
                + '<span class="num">' + spanNum + '</span>'
                + '<a href="###" class="pull-right write">'
                + '<span class="icon icon-write color-select"></span>'
                + '写评论'
                + '</a>'
                + '</h4>';
            $(ele).find('.review-cont').append(titleHtml);

            if (res.data.total_cnt) {
                var reviewFragment = document.createDocumentFragment();
                for (var i = 0; i < res.data.data.length; i++) {
                    var parent = res.data.data[i]; // 一条一级评论的数据
                    var parentHtml = ''; // parentHtml 一级评论内容
                    var headerHtml = ''; // headerHtml 一级评论 user 信息
                    var childHtml = ''; // childHtml 二级评论内容
                    var listBlock = ''; // 一条评论除头部（一级评论用户信息）之外的内容
                    var reviewItem = ''; // reviewItem 一条评论的左右所有内容
                    var removeHtml = ''; // 删除按钮
                    var iconCommentHtml = ''; // 评论按钮
                    if (parent.is_show_del === 1) {
                        removeHtml = '<a href="###" class="mr20 remove">'
                            + '<span class="icon icon-remove"></span></a>';
                    } else {
                        iconCommentHtml = '<a href="###" class="mr20 reply">'
                            + '<span class="icon icon-comment"></span></a>';
                    }
                    headerHtml += '<div class="items-title clearfix">'
                        + '<div class="use pull-left">'
                        + '<div class="clearfix use-msg">'
                        + '<a href="###">'
                        + '<mip-img src="' + parent.User.img + '"alt="' + parent.User.nick_name + '"'
                        + 'title="' + parent.User.nick_name + '" class="use-pic mr5"></mip-img>'
                        + '<span class="name mr5 color-000">' + parent.User.nick_name + '</span>'
                        + '</a>'
                        + '</div>'
                        + '</div>'
                        + '<div class="reply-icon pull-right">'
                        + '+removeHtml+'
                        + '+iconCommentHtml+'
                        + '<a href="###" class="mr5 color-999 agree">'
                        + '<span class="icon icon-agree"></span>'
                        + '<i class="num">' + parent.goods_cnt + '</i>'
                        + '</a>'
                        + '</div>'
                        + '</div>';

                    var parentPics = '';
                    if (parent.img) {
                        for (var x = 0; x < parent.img.length; x++) {
                            parentPics += '<div class="comment-pics mr5">'
                                + '<mip-img src="' + parent.img[x] + '" alt="" title="" class="view-pic-img">'
                                + '</mip-img></div>';
                        }
                    }

                    parentHtml += '<li class="items">'
                        + '<div class="item-content">'
                        + '<div class="item-inner">'
                        + '<div class="item-title-row">'
                        + '<div class="item-title">'
                        + '<h4><span>' + parent.content + '</span></h4>'
                        + '<div class="pics-wrap mt5">'
                        + '+parentPics+'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '<div class="item-text">'
                        + '<span class="time color-999">' + parent.add_time + '</span>'
                        + '<!-- <a href="###" class="ml20 color-999">{$回复$}</a> -->'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</li>';

                    if (parent.Children.length !== 0) {
                        for (var j = 0; j < parent.Children.length; j++) {
                            var child = parent.Children[j];
                            var other = '';
                            if (child.call_user_name) {
                                other = '<a href="###" class="other-name">@' + child.call_user_name + '</a>';
                            }
                            var content = '';
                            if (child.content) {
                                content = '<span>' + child.content + '</span>';
                            }
                            var childPics = '';
                            if (child.img) {
                                for (var x = 0; x < child.img.length; x++) {
                                    childPics += '<div class="comment-pics mr5">'
                                        + '<mip-img src="' + child.img[x] + '" alt="" title="" class="view-pic-img">'
                                        + '</mip-img></div>';
                                }
                            }
                            var childRemoveHtml = '';
                            var childReplyHtml = '';
                            if (child.is_show_del === 1) {
                                childRemoveHtml = '<a href="###" class="ml20 color-999 child-remove">删除</a>';
                            } else {
                                childReplyHtml = '<a href="###" class="ml20 color-999 child-reply">回复</a>';
                            }
                            childHtml += '<li class="items">'
                                + '<div class="item-content" data-comment-id="' + child.oid + '"'
                                + 'data-user-id="' + child.User.oid + '">'
                                + '<div class="item-inner">'
                                + '<div class="item-title-row">'
                                + '<div class="item-title">'
                                + '<a href="###" class="name">' + child.User.nick_name + ':</a>'
                                + '<h5>'
                                + '"+other+"'
                                + '"+content+"'
                                + '</h5>'
                                + '<div class="pics-wrap mt5">'
                                + '"+childPics+"'
                                + '</div>'
                                + '</div>'
                                + '</div>'
                                + '<div class="item-text">'
                                + '<span class="time color-999">' + child.add_time + '</span>'
                                + '"+childReplyHtml+"'
                                + '"+childRemoveHtml+"'
                                + '</div>'
                                + '</div>'
                                + '</div>'
                                + '</li>';

                        }
                        parentHtml += childHtml;
                    }
                    var viewMoreReplyHtml = '';
                    if (parent.Children.length > 2) {
                        viewMoreReplyHtml = '<a href="###" class="view-more-reply external border bgc-eee">'
                            + '<!--<span class="icon icon-down"></span>-->'
                            + '<span class="text" data-down="更多' + parent.Children.length - 2 + ''
                            + '条回复" data-up="收起">更多' + parent.Children.length - 2 + '条回复</span>'
                            + '</a>';
                    }
                    listBlock += '<div class="list-block media-list m0 ml40">'
                        + '<ul>' + parentHtml + '</ul>' + viewMoreReplyHtml + '</div>';

                    reviewItem += '<div class="review-item" data-comment-id="' + parent.oid + '"'
                        + 'data-goods-num="' + parent.goods_cnt + '"'
                        + 'data-user-id="' + parent.User.oid + '">"' + headerHtml + '""' + listBlock + '"</div>';

                    $(reviewFragment).append(reviewItem);
                    setReviewLength();
                }
                $(ele).find('.review-cont').append(reviewFragment);
            }
        }

        function getComment() {

            $.post('https://mip.linkeddb.com/comment_list/', {
                'obj_type': pageType,
                'obj_oid': pageOid
            }, function (res) {

                if (res.response === '1') {
                    setCommentModule(res);
                }
            });
        }

        $(ele).find('.review-cont').on('click', '.write', function () {

            checkLogin();
            $(ele).find('.review-cont .write-comment textarea').attr('placeholder', '写下你的评论...');
            $(ele).find('.write-comment .ok').attr('data-comment-id', '');
            $(ele).find('.write-comment .ok').attr('data-other-user-id', '');
        });

        function checkLogin() {
            $.get('https://mip.linkeddb.com/check_user/', function (res) {
                if (res.response === '-2') {
                    $.confirm('登录后评论', '登录提示', function () {
                        window.top.location.href = 'https://mip.linkeddb.com/sign_in/?callUrl=' + window.location.pathname;
                    }, function () {

                    });
                    return false;
                } else {
                    $(ele).find('.review-modal-overlay').toggleClass('review-modal-overlay-visible');
                    $(ele).find('.write-comment').toggleClass('show');
                    $(ele).find('.content').toggleClass('z-index-11');
                }
            });
        }

        var limitLength = 1000;
        $(ele).find('.review-cont .write-comment').on('input propertychange', '#textarea', function () {

            if ($(this).val().length >= limitLength) {
                $(this).val($(this).val().substring(0, limitLength));
            }
            $(this).siblings().find('span').text($(this).val().length);
        });

        // -------------------- 点击取消按钮隐藏评论框
        $(ele).find('.review-cont .write-comment').on('click', '.cancel', function () {
            $(ele).find('.review-modal-overlay').toggleClass('review-modal-overlay-visible');
            $(ele).find('.write-comment').toggleClass('show');
        });

        function replyComment(pOid, otherUserOid) {
            checkLogin();
            $(ele).find('.write-comment .ok').attr('data-comment-id', pOid);
            $(ele).find('.write-comment .ok').attr('data-other-user-id', otherUserOid);
        }
        // 回复
        // 1、检查登录
        // 2、获取当前评论的id
        $(ele).find('.review-cont').on('click', '.reply', function () {
            var $this = $(this);
            var pOid = $($this).parent().parent().parent().data('commentId');
            var otherUserOid = '';
            replyComment(pOid, otherUserOid);
            $(ele).find('.review-cont .write-comment textarea').attr('placeholder', '写下你的评论...');
        });

        // 二级回复
        // 1、检查登录
        // 2、获取当前评论的id
        $(ele).find('.review-cont').on('click', '.child-reply', function () {
            var $this = $(this);
            var pOid = $($this).parent().parent().parent().parent().parent().parent().parent().data('commentId');
            var otherName = $($this).parent().siblings('.item-title-row').find('.name').text();
            var otherUserOid = $($this).parent().parent().parent().data('userId');

            $(ele).find('.review-cont .write-comment textarea').attr('placeholder', '@' + otherName);
            // $('.review-cont .write-comment textarea').text('@' + otherName);
            replyComment(pOid, otherUserOid);
        });

        $(ele).find('.review-cont .write-comment').on('click', '.ok', function () {

            // $.toast('111111', 'text');
            writeComment();
        });

        function writeComment() {
            var content = $(ele).find('.write-comment').find('#textarea').val();
            var pOid = $(ele).find('.write-comment').find('.ok').attr('data-comment-id') || '';
            var callUserOid = $(ele).find('.write-comment').find('.ok').attr('data-other-user-id') || '';
            if (content === '') {
                $.toast('评论内容不能为空', 'forbidden');
                return;
            }
            var formData = new FormData();
            formData.append('obj_type', pageType);
            formData.append('obj_oid', pageOid);
            formData.append('content', content ? content : '');
            formData.append('p_oid', pOid ? pOid : '');
            formData.append('call_user_oid', callUserOid ? callUserOid : '');
            if ($(ele).find('.write-comment .pic-pop').find('.pic-pop-flex').find('mip-img').length >= 1) {
                if ($(ele).find('input[type="file"]').length >= 2) {
                    formData.append('mip-img', $('input[type="file"]:last').prev('.comment-pic')[0].files[0]);
                } else {
                    formData.append('mip-img', $(ele).find('input[type="file"]')[0].files[0]
                        ? $(ele).find('input[type="file"]')[0].files[0] : '');
                }
            } else {
                formData.append('mip-img', '');
            }

            $.ajax({
                type: 'POST',
                url: 'https://mip.linkeddb.com/reply/',
                dataType: 'json',
                data: formData,
                cache: false, // 不缓存
                processData: false, // jQuery不要去处理发送的数据
                contentType: false, // jQuery不要去设置Content-Type请求头
                beforeSend: function () {
                    // $.toast('评论已提交稍后自动刷新页面');
                    $.toptip('评论已提交稍后自动刷新页面', 'success');
                    $(ele).find('.review-cont .write-comment').find('.ok').attr('disabled', 'disabled');
                },
                success: function (res) {
                    if (res.response === '1') {
                        $.toast(res.message);
                        $(ele).find('.review-modal-overlay').toggleClass('review-modal-overlay-visible');
                        $(ele).find('.write-comment').toggleClass('show'); // 输入框隐藏
                        $(ele).find('.content').toggleClass('z-index-11');
                        $(ele).find('.write-comment').find('#textarea').val(''); // 输入内容置空
                        $(ele).find('.write-comment').find('.weui-textarea-counter').find('span').text(0); // 字数统计重置为0
                        $(ele).find('.write-comment .pic-pop').find('.pic-pop-flex').empty(); // 图片容器置空
                        $(ele).find('.write-comment .pic-pop').removeClass('show'); // 图片容器隐藏
                        commentPicNumFlag = true; // 添加评论图片标志置为 true 允许下次选取
                        $(ele).find('input[type="file"]:last').siblings('.comment-pic').remove(); // 删除已经参与上传图片的input框
                        $(ele).find('.review-cont').find('.review-title').remove(); // 删除评论区域头部
                        $(ele).find('.review-cont').find('.review-item').remove(); // 删除评论区域所有内容
                        getComment();
                    } else {
                        $.toast(res.message, 'forbidden');
                    }
                },
                compvare: function () {
                    $(ele).find('.review-cont .write-comment').find('.ok').removeAttr('disabled');
                }
            });
        }

        function devareComment() {
            var $this = this;
            var replyOid = $($this).parent().parent().data('commentId');

            $.confirm('确定删除吗？', function () {
                $.post('https://mip.linkeddb.com/del_comment/', {
                    'reply_oid': replyOid
                }, function (res) {
                    if (res.response === '1') {
                        // $.toast(res.message, 'text');
                        $.toptip(res.message, 'success');
                        $(ele).find('.review-cont').find('.review-title').remove(); // 删除评论区域头部
                        $(ele).find('.review-cont').find('.review-item').remove(); // 删除评论区域所有内容
                        getComment();
                    } else {
                        // $.toast(res.message, 'text');
                        $.toptip(res.message, 'error');
                    }
                });
            }, function () {

            });
        }
        // 删除一级评论
        $(ele).find('.review-cont').on('click', '.remove', devareComment);

        // 删除二级评论
        $(ele).find('.review-cont').on('click', '.child-remove', devareComment);

        // -------------------- 点赞
        $(ele).find('.review-cont').on('click', '.agree', function () {
            var $this = this;
            var pOid = $(this).parent().parent().parent().data('commentId');
            if (!$($this).find('.icon-agree').hasClass('full')) {
                $.post('https://mip.linkeddb.com/reply_goods/', {
                    'reply_oid': pOid
                }, function (res) {
                    if (res.response === '-2') {
                        $.confirm('请登录后操作', '登录提示', function () {
                            window.top.location.href = 'https://mip.linkeddb.com/sign_in/?callUrl='
                                + window.location.pathname;
                        }, function () {
                            // $.toast('登录取消', 'text');
                        });
                        return false;
                    } else if (res.response === '1') {
                        $.toast(res.message);
                        $($this).find('.num').html(+$($this).find('.num').html() + 1);
                        $($this).find('.icon-agree').toggleClass('full');
                    } else {
                        $.toast(res.message, 'forbidden');
                    }
                });
            } else {
                // $.confirm('确定取消点赞吗?', function() {
                //     //点击确认后的回调函数
                // }, function() {
                //     //点击取消后的回调函数
                //     // $.toast('取消收藏', 1000);
                //     $($this).find('.num').html(+$($this).parent().parent().find('.num').html() - 1);
                //     $($this).find('.icon-agree').toggleClass('full');
                // });
            }
        });
        // 建立一個可存取到該file的url
        function getObjectURL(file) {
            var url = null;
            // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
            if (window.createObjectURL !== undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL !== undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL !== undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }

        var commentPicNumFlag = true; // 是否可以上传图片的标记
        var URL; // 展示图片的 url
        var inputNum = 0; // input 输入框的编号
        // -------------------- 上传图片
        $(ele).find('.review-cont .write-comment').on('click', '.updata-pic', function () {
            if (commentPicNumFlag) {
                $(ele).find('#comment-pic' + inputNum).click();
                $(ele).find('#comment-pic' + inputNum).on('change', function () {
                    var thisFile = this.files[0];
                    if (thisFile) {
                        URL = getObjectURL(thisFile);
                        // var fivarype = thisFile.type.slice(thisFile.type.indexOf('/') + 1);
                        if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(thisFile.type) >= 0) {
                            $(ele).find('.write-comment .pic-pop-flex')
                                .append('<mip-img src="' + URL + '" alt=""></mip-img>');
                            inputNum++;
                            $(ele).find('.write-comment .footer').append('<input class="comment-pic hidden"'
                                + 'id="comment-pic' + inputNum + '" type="file"'
                                + 'accept="image/png, image/jpeg, image/gif, image/jpg" name="comment-pic">');
                            $(ele).find('.write-comment .pic-pop').addClass('show');
                            commentPicNumFlag = false;
                        }
                    }
                });
            } else {
                $.toast('只能上传一张图片', 'text');
            }
        });

        // 删除上传的图片
        $(ele).find('.write-comment').on('click', '.icon-devare', function () {
            $(ele).find('.write-comment .pic-pop-flex').empty();
            $(ele).find('.write-comment .pic-pop').removeClass('show');
            commentPicNumFlag = true;
        });

        /* modal-overlay 点击背景层隐藏，上层隐藏 */
        $(ele).find('.review-modal-overlay').on('click', function () {
            $(ele).find('.review-modal-overlay').toggleClass('review-modal-overlay-visible');
            $(ele).find('.write-comment').toggleClass('show');
            $(ele).find('.content').toggleClass('z-index-11');
        });

        $(ele).find('.review-cont').on('click', '.view-pic-img', function () {
            var src = [$(this).attr('src').slice(0, $(this).attr('src').indexOf('?'))];
            $.photoBrowser({
                items: src
            }).open();
        });

        // 设置只显示两条评论，多余的点击展开显示
        function setReviewLength() {
            $(ele).find('.review-cont').find('.review-item').each(function () {
                var ul = $(this).find('.list-block').find('ul');
                if (ul.find('li').length > 3) {
                    var height = +$(ul).find('li:first').height() + +$(ul).find('li:nth-child(2)')
                        .height() + +$(ul).find('li:nth-child(3)').height();
                    ul.height(height);
                    ul.attr('data-height', height);
                }
            });
        }

        // 延迟执行 防止获取不到元素发生样式错乱
        setTimeout(function () {
            setReviewLength();
        }, 100);

        // 点击展开收起评论
        $(ele).find('.review-cont').on('click', '.view-more-reply', function () {
            if (!$(this).hasClass('down')) {
                $(this).parent().find('ul').height('auto');
                $(this).addClass('down');
                $(this).find('.text').text($(this).find('.text').attr('data-up'));
            } else {
                $(this).parent().find('ul').height($(this).parent().find('ul').attr('data-height'));
                $(this).removeClass('down');
                $(this).find('.text').text($(this).find('.text').attr('data-down'));
            }
        });
    };

    return customElement;
});