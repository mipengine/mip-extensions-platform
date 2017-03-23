/**
* 寻医问药mip改造 功能组件
* @file 脚本支持
* @author yaoyar6@gmail.com
* @time 2017.03.23
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var viewport = require('viewport');
    var customElem = require('customElement').create();
    var chatFunction = function (botShowHeight, docCount) {
        // botShowHeight 代表 底部露出的高度  docCount每次加载的回复条数
        var clientHeight = viewport.getHeight();
        var sHeight = $('.chat-top-search').height();
        var topHeight = $('.chat-top-msg').height();
        var boxHeight = clientHeight - topHeight - botShowHeight;
        var actHref = $('.chat-bot-search').attr('action');
        var answerLength = $('.chat-doc-abox').length;
        var nowIndex = parseInt($('.chat-doc-more').attr('show_doc'), 10);
        var cFlag = true;

        $('.chat-box').height(boxHeight);
        $('.chat-doc-abox').hide().eq(0).show();
        $('.chat-bot').show();

        if (answerLength >= nowIndex) {
            $('.chat-doc-abox').each(function (i) {
                if (i < nowIndex) {
                    $('.chat-doc-abox').eq(i).show();
                }
            });
        }

        if (answerLength <= nowIndex) {
            $('.chat-doc-more').hide();
            cFlag = false;
        } else {
            $('.chat-doc-more').click(function () {
                if (cFlag) {
                    $('.chat-doc-abox').eq(nowIndex).show();
                    $('.chat-doc-abox').eq(nowIndex + 1).show();
                    $('.chat-box').scrollTop($('.chat-box').scrollTop() + 60);
                    nowIndex += docCount;
                    if (nowIndex > answerLength) {
                        $(this).hide();
                        cFlag = false;
                    }
                }
            });
        }


        viewport.on('scroll', function () {
            var scrollTop =  viewport.getScrollTop();
            if (scrollTop < sHeight) {
                $('.chat-top').css('margin-top', -scrollTop);
            } else if (scrollTop === 0) {
                $('.chat-top').css('margin-top', 0);
            } else {
                $('.chat-top').css('margin-top', -sHeight);
            }
        });

        // 顶部搜搜索
        $('.item-hd-so-input-box').on('click', function () {
            $('.item-hd-so-area').addClass('item-hd-so-focus');
        });
        $('.item-hd-so-back').on('click', function () {
            $('.item-hd-so-area').removeClass('item-hd-so-focus');
        });


        $('.item_hd_form').on('submit', function () {
            var textVal = $.trim($('.item-hd-so-inp').val());
            $(this).attr('method', 'post').attr('action', actHref + '&keyword=' + encodeURIComponent(textVal));
        });


        // 底部搜索
        $('.chat-bot-search').on('submit', function () {
            var textValK = $.trim($('.keysd').val());
            if (textValK === '帮您寻医问药') {
                textValK = '';
            } else {
                textValK = textValK;
            }
            $(this).attr('method', 'post').attr('action', actHref + '&keyword=' + encodeURIComponent(textValK));
        });

    };

    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var elem = this.element;
        var botShowHeight = $(elem).attr('botShowHeight');
        var docCount = $(elem).attr('docCount');
        chatFunction(botShowHeight, docCount);
    };
    return customElem;
});
