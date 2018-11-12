/**
 * @file 评论
 * @author lj
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    function comment(o) {
        var ajaxUrl = $(o).find('mip-form').attr('url');
        var oul = $(o).find('#comment-list');
        var oid = $(o).find('#app-id').val();
        var oli = oul.find('li');
        var p = Math.floor(oli.length / 5 + 1);
        // 时间函数
        function time(d) {
            var result = '';
            result += [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('/');
            return result.replace(/(-|\:)(\d[^\d])/g, '$1' + '0$2');
        }
        // 写入cookies
        function setCookie(name, value) {
            var d = new Date();
            d.setTime(d.getTime() + 60 * 2000);// 设置过期时间2分钟
            document.cookie = name + '=' + escape(value) + ';expires=' + d.toGMTString();
        }
        // 读取cookies
        function getCookie(name) {
            var arr;
            var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            }
        }
        // 写入评论
        function writeComment(o) {
            oli = oul.find('li');
            $.ajax({
                url: ajaxUrl + 'ajax.php',
                dataType: 'json',
                data: {
                    type: 'get',
                    saytext: $('.w-text textarea').val(),
                    id: oid,
                    action: 'addComment',
                    username: $(o).find('#username').val(),
                    password: $(o).find('#password').val(),
                    classid: $(o).find('#classid').val(),
                    repid: $(o).find('#repid').val()
                },
                beforeSend: function () {
                    if ($('#submit #verify').hasClass('disable')) {
                        alert('\u60a8\u8bc4\u8bba\u5199\u7684\u592a\u77ed\u5566\uff01');
                        return false;
                    }
                    else if (getCookie('oldTime' + oid) === 1) {
                        alert('\u60a8\u8bc4\u8bba\u6b21\u6570\u592a\u9891\u7e41\u5566\uff01');
                        return false;
                    }
                },
                success: function (data) {
                    if (Number(data.code) === 1) {
                        alert(data.msg);
                        return false;
                    }
                    var html = '<li><p class="user">\u60a8\u53d1\u8868\u7684\u8ddf\u8d34<time><font color="red">'
                    + time(new Date()) + '</font></time></p><p>' + $('.w-text textarea').val() + '<p></li>';
                    oli.length === 0 ? oul.html(html) : oli.first().before(html);
                    $(o).find('#comment #submit').hide();
                    $(o).find('#view-comment').show();
                    $(o).find('.w-text textarea').val('').focus();
                    setCookie('oldTime' + oid, '1');
                }
            });
        }
        $(o).find('#submit #verify').click(function () {
            writeComment();
            return false;
        });
        // 读取评论
        function readComment(o) {
            oli = oul.find('li');
            p = Math.floor(oli.length / 5 + 1);
            $.ajax({
                type: 'get',
                url: ajaxUrl + 'ajax.php',
                data: 'action=readComment&classid=' + $(o).find('#classid').val() + '&id=' + oid + '&page=' + p,
                dataType: 'json',
                success: function (data) {
                    if (Number(data.RecordCount) > 0) {
                        var html = '';
                        var userName = data.sUserName;
                        var userData = data.sDateAndTime;
                        var userText = data.sContent;
                        for (var i = 0; i < userName.length; i++) {
                            html += '<li><p class="user">' + userName[i] + '<time>'
                            + userData[i] + '</time></p><p>' + decodeURIComponent(userText[i]) + '</p></li>';
                        }
                        if (data.RecordCount > 5) {
                            $(o).find('#view-comment .button-status-complete').css('display', 'block');
                            $(o).find('#comment .button').show();
                        }
                        if (p >= data.PageCount) {
                            $(o).find('#view-comment .button').text('没有更多评论了！').unbind('click');
                        }
                        oli.length === 0 ? oul.html(html) : oli.last().after(html);
                    }
                }
            });
        }

        readComment(o);

        $(o).find('#view-comment .button').bind('click', function () {
            readComment();
        });

        // 评论效果
        $(o).find('#view-comment header .fb').click(function () {
            $(o).find('#view-comment').css('display', 'none');
            $(o).find('#submit').css('display', 'block');
        });
        $(o).find('#cancel').click(function () {
            $(o).find('#view-comment').css('display', 'block');
            $(o).find('#submit').css('display', 'none');
        });
        $(o).find('.w-text textarea').on('keyup', function () {
            var text = $(this).val();
            var len = text.length;
            var zh = text.replace(/[\x00-\xff]/g, '').length;
            var tlen = Math.ceil((len + zh) / 2);
            if (tlen < 5) {
                $(o).find('#verify').addClass('disable');
            }
            else {
                $(o).find('#verify').removeClass('disable');
            }
        });
    }

    customElem.prototype.firstInviewCallback = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        comment(element);
    };

    return customElem;
});
