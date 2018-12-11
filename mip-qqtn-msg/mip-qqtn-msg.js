/**
 * @file v3系统通用评论,修复一处获取地址冲突的情况。.使用firstInviewCallback方式。拖动过快会导致没有获取到路径导致/mipx/undefined的一处问题。
 * @author gom
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var comid = $('.f-information').attr('data-CommentTpye');
    var ajaxUrl = $('#comment').find('mip-form').attr('url');
   // 按钮效果
    function validate() {
        var text = $('.w-text textarea').val();
        var len = text.length;
        var zh = text.replace(/[\x00-\xff]/g, '').length;
        var tlen = Math.ceil((len + zh) / 2);
        if (tlen < 5) {
            $('#verify').addClass('disable');
        }
        else {
            $('#verify').removeClass('disable');
        }
    }

    function comment(o) {
        var oul = $('#comment-list');
        var oid = $('#app-id').val();
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
            else {
                return null;
            }
        }
        // 写入评论
        function writeComment() {
            oli = oul.find('li');
            var pltxt = $('.w-text textarea').val();
            if ($('#submit #verify').hasClass('disable')) {
                alert('\u60a8\u8bc4\u8bba\u5199\u7684\u592a\u77ed\u5566\uff01');
                return false;
            }
            else if (getCookie('oldTime' + oid) === 1) {
                alert('\u60a8\u8bc4\u8bba\u6b21\u6570\u592a\u9891\u7e41\u5566\uff01');
                return false;
            }
            fetch(ajaxUrl + 'ajax.asp?Action=2&SoftID=' + oid + '&content=' + pltxt + '&CommentTpye=' + comid)
            .then(function (res) {
                return res.text();
            }).then(function (data) {
                var html = '<li><p class="user">\u60a8\u53d1\u8868\u7684\u8ddf\u8d34<time><font color="red">'
                + time(new Date()) + '</font></time></p><p>' + $('.w-text textarea').val() + '<p></li>';
                oli.length === 0 ? oul.html(html) : oli.first().before(html);
                $('#comment #submit').hide();
                $('#view-comment').show();
                $('.w-text textarea').val('').focus();
                setCookie('oldTime' + oid, '1');
                alert('\u63d0\u4ea4\u6210\u529f\uff01');
                return false;
            }).catch(function (err) {
            });
        }
        function uclick() {
            $('#comment-list li .u-huifu').click(function () {
                $('#submit').css('display', 'block');
                $('.post .fb').css('display', 'none');
                var pid = $(this).attr('pid');
                $('.w-text textarea').text('[quote]' + pid + '[/quote]').focus();
                $('#cancel').click(function () {
                    $('.w-text textarea').text('');
                    $('.post .fb').css('display', 'block');
                });
            });
        }
        var oid = $('#app-id').val();
        function bindDing(objtext, id, CommentTpye) {
            var obj = $('#comment-list li span');
            if (obj.length === 0) {
                return false;
            }
            for (var i = 0; i < obj.length; i++) {
                var sobj = obj.eq(i).find('a').first();
                var spanobj = obj.eq(i).find('em');
                sobj.click(function () {
                    sendDing($(this).parent().attr('id'));
                    var spanobj = $(this).parent().find('em');
                    spanobj.html(parseInt(spanobj.html(), 0) + 1);
                    $(this).unbind();
                    $(this).attr('title', '您已经顶过了');
                });
            }
            readDing(objtext, id, CommentTpye);
        }
        function sendDing(id)
        {
            var url = 'action=19&id=' + id;
            $.ajax({
                type: 'POST',
                url: 'https://m.qqtn.com/ajax.asp',
                data: url,
                success: function (msg) {
                }
            });
        }
        function readDing(objtext, id, CommentTpye)
        {
            var obj = $('#comment-list li span');
            var sendid = '';
            for (var i = 0; i < obj.length; i++) {
                sendid += obj.eq(i).attr('id');
                if (i < (obj.length - 1)) {
                    sendid += ',';
                }
            }
            if (sendid !== '') {
                var url = 'action=18&id=' + oid + '&CommentTpye=' + comid + '&sendid=' + escape(sendid) + '';
                $.ajax({
                    type: 'POST',
                    url: 'https://m.qqtn.com/ajax.asp',
                    data: url,
                    success: function (msg) {
                        listDing(objtext, msg);
                    }
                });
            }
        }
        function listDing(objtext, msg)
        {
            var obj = $('#comment-list li span');
            var dataObj = (new Function('return' + '' + msg + ''))();
            for (var i = 0; i < obj.length; i++) {
                var spanobj = obj.eq(i).find('em');
                var sid = obj.eq(i).attr('id');
                for (var y = 0; y < dataObj.ID.length; y++) {
                    if (sid === dataObj.ID[y].toString()) {
                        spanobj.html(dataObj.Ding[y]);
                        break;
                    }
                }
            }
        }
        $('#submit #verify').click(function () {
            writeComment();
            return false;
        });
        function readComment() {
            oli = oul.find('li');
            p = Math.floor(oli.length / 5 + 1);
            fetch(ajaxUrl + 'sajax.asp?action=6&t=' + oid + '&s=' + comid + '&num=5&p=' + p)
            .then(function (res) {
                return res.text();
            }).then(function (data) {
                    var html = '';
                    var data = (new Function('', 'return' + data))();
                    var userName = data.user;
                    var userForm = data.sUserFrom;
                    var userData = data.DateAndTime;
                    var userText = data.Excerpt;
                    var usGraded = data.Graded;
                    for (var i = 0; i < userName.length; i++) {
                        html += '<li><p class="user">腾牛网友<time>'
                        + userData[i] + '</time><i>第' + usGraded[i] + '楼</i></p><p>'
                        + decodeURIComponent(userText[i]) + '</p><span class="u-click" id="'
                        + data.Id[i] + '"><a href="javascript:">支持(<em>0</em>)</a>'
                        + '<a class="u-huifu" href="javascript:" pid="'
                        + data.Id[i] + '">盖楼(回复)</a></span></li>';
                    }
                    if (data.RecordCount > 5) {
                        $('#view-comment .button-status-complete').css('display', 'block');
                        $('#comment .button').show();
                    }
                    if (p >= data.PageCount) {
                        $('#view-comment .button').text('没有更多评论了！').unbind('click');
                    }
                    oli.length === 0 ? oul.html(html) : oli.last().after(html);
                    $('#comment-list li h4').hide();
                    uclick();
                    bindDing(oid);
                }).catch(function (err) {
                });
        }
        readComment();
        $('#view-comment .button').bind('click', function () {
            readComment();
        });
        // 评论效果
        $('#view-comment header .fb').click(function () {
            $('#view-comment').css('display', 'none');
            $('#submit').css('display', 'block');
        });
        $('#cancel').click(function () {
            $('#view-comment').css('display', 'block');
            $('#submit').css('display', 'none');
        });
        $('.w-text textarea').keyup(validate);
    }
    customElem.prototype.build = function () {
        var element = this.element;
        comment(element);
    };
    return customElem;
});

