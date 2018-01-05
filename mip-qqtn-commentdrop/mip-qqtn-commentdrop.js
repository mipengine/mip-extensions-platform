/**
 * @file mip-qqtn-commentdrop
 * 功能一：根据设备型号和对应栏目关系的ID来获取下拉文件地址,每次获取不同文件，总共下拉9次。功能二：读取评论，添加评论，回复评论，读取评论赞次数，增加赞。
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var p = 1;
        var loading = false;
        var syetem = 'az';
        var catID = '';
        var tlnum = $(ele).find('#tonglei').length;
        var dqsystem = $(ele).find('.f-information').attr('data-system');
        var dqsystem = dqsystem.toLowerCase();
        var dqcatid = $(ele).find('.f-information').attr('data-categroyId');
        var did = $(ele).find('.f-information').attr('data-id');
        var CommentTpye = $(ele).find('.f-information').attr('data-CommentTpye');
        var tagSize = $(ele).find('.g-tags-box li').length;
        var comparecid = ele.getAttribute('data-catid').split(',');
        var addmoreurl = ele.getAttribute('data-url');
        var plurl = ele.getAttribute('data-plurl');
        var addplurl = ele.getAttribute('data-addplurl');
        $(ele).find('#tonglei').after('<div class="f-moreadd m-adddiv m-adddivbg"></div>');
        if ($(ele).find('#tonglei').length > 0) {
            if (dqsystem.indexOf('android') !== -1 || dqsystem.indexOf('ios') !== -1) {
            } else {
                $(ele).find('.f-moreadd').html('没有更多了');
                return false;
            };
            if (tagSize <= 0) {
                for (var i = 0; i < comparecid.length; i++) {
                    var cataid = comparecid[i].split('|');
                    for (var j = 0; j < cataid.length; j++) {
                        if (cataid[j] === dqcatid) {
                            if (/android/i.test(navigator.userAgent)) {
                                var syetem = 'az';
                                var catID = cataid[0];
                                loading = true;
                            } else {
                                var catID = cataid[1];
                                var syetem = 'ios';
                                loading = true;
                            };
                        };
                    };
                };
                if (catID === '') {
                    $(ele).find('.f-moreadd').html('没有更多了').removeClass('m-adddivbg');
                    return false;
                };
            } else {
                var catID = $(ele).find('.g-tags-box li').first().attr('date-catid');
                var catSys = $(ele).find('.g-tags-box li').first().attr('data-system');
                if (catSys !== 'Android') {
                    syetem = 'ios';
                }
                loading = true;
            };
            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if (scrollTop + windowHeight === scrollHeight) {
                    p++;
                    if (p <= 10 && loading) {
                        fetch(addmoreurl + catID + '_' + syetem + '_' + p + '.json')
                        .then(function (res) {
                            return res.text();
                        }).then(function (data) {
                            var data = (new Function('', 'return' + data))();
                            var html = '';
                            for (var i = 0; i < data.softId.length; i++) {
                                html += '<li class="m-rank-' + ((10 * (p - 1) + i) + 1) + '">';
                                html += '<a href="http://m.qqtn.com/q/' + data.softId[i] + '" class="g-a-left">';
                                html += '<img src="' + data.SmallImg[i] + '" /><p>';
                                html += '<strong>' + data.ResName[i] + '</strong><b>';
                                html += '<span>' + data.ResSize[i] + '</span><span>';
                                html += '<em>' + data.softId[i] + '</em>人在玩</span></b>';
                                html += '<b>' + data.Excerpt[i] + '</b></p></a>';
                                html += '<a href="http://m.qqtn.com/q/' + data.softId[i] + '" class="g-a-right">下载</a></li>';
                            };
                            $(ele).find('#tonglei .g-game-recomd .g-scoll-ul').append(html);
                        }).catch(function (err) {
                        });
                    } else {
                        $(ele).find('.f-moreadd').html('没有更多了').removeClass('m-adddivbg');
                    };
                };
            });
        };
        // 评论
        if ($(ele).find('.m-comment').length > 0) {
            var p = 1;
            viewMore();
            function viewMore() {
                fetch(plurl + '?action=6&t=' + did + '&s=' + CommentTpye + '&num=5&p=' + p)
                .then(function (res) {
                    return res.text();
                }).then(function (msg) {
                    var objJson = (new Function('', 'return' + msg))();
                    if (objJson.PageCount >= p) {
                        listDate(msg);
                        gailou();
                    } else {
                        $(ele).find('.g-comment-more').text('没有更多评论了').css('background', '#c3c3c3');
                    };
                });
            }
            function listDate(msg) {
                var objJson = (new Function('', 'return' + msg))();
                var html = '';
                var htmlnew = '';
                for (var i = 0; i < objJson.softid.length; i++) {
                    html += '<dt><span><i>第 ' + objJson.Graded[i] + ' 楼</i>';
                    html += '<b>' + objJson.sUserFrom[i] + objJson.user[i] + '</b></span>';
                    html += '<em>发表于：' + objJson.DateAndTime[i] + ' </em></dt>';
                    html += '<dd>' + objJson.Excerpt[i] + '</dd>';
                    htmlnew += '<dt class="clearfix"><i>第 ' + objJson.Graded[i] + ' 楼 </i><span>';
                    htmlnew += '<b>腾牛网友</b><em>' + objJson.DateAndTime[i] + '</em></span></dt>';
                    if (objJson.bjhf[i] === '') {
                        htmlnew += '<dd>' + objJson.Excerpt[i] + '<p id="' + objJson.Id[i] + '">';
                        htmlnew += '<a href="javascript:">支持<em>(</em><span>0</span><em>)</em></a> ';
                        htmlnew += '<a href="javascript:" pid="' + objJson.Id[i] + '">盖楼(回复)</a></p></dd>';
                    } else {
                        htmlnew += '<dd>' + objJson.Excerpt[i] + '<div class="m-huifu">';
                        htmlnew += '<p class="m-huifu-o">编辑回复：<br><span>' + objJson.bjhf[i] + '</span></p></div>';
                        htmlnew += '<p id="' + objJson.Id[i] + '"><a href="javascript:">支持<em>(</em>';
                        htmlnew += '<span>0</span><em>)</em></a> ';
                        htmlnew += '<a href="javascript:" pid="' + objJson.Id[i] + '">盖楼(回复)</a></p></dd>';
                    };
                };
                $(ele).find('.g-game-ly div dl').append(html);
                $(ele).find('.g-game2-ly div dl').append(htmlnew);
                bindDing('#comment_0 > dl > dd > p', did, '0');
            }
            $(ele).find('.g-comment-more').click(function () {
                p++;
                viewMore();
            });
            plhuifu();
            // 回复，支持进行操作
            function plhuifu() {
                $(ele).find('.g-comment-showbtn').click(function () {
                    $(ele).find('#m-comment-box').show();
                    $(this).hide();
                    $(ele).find('#comment_list').hide();
                    plcole();
                });
            }
            function gailou() {
                $(ele).find('#comment_0 dl dd').each(function () {
                    $(this).find('p a').eq(1).click(function () {
                        var pid = $(this).attr('pid');
                        $(ele).find('#m-comment-box').show();
                        $(ele).find('.g-comment-showbtn').hide();
                        $(ele).find('#m-comment-box textarea').text('[quote]' + pid + '[/quote]').focus();
                        plcole();
                    });
                });
            }
            $(ele).find('#verify').click(function () {
                commontSubmit();
            });
            function plcole() {
                $(ele).find('.m-comment-close').click(function () {
                    $(ele).find('#m-comment-box').hide();
                    $(ele).find('#comment_list,.g-comment-showbtn').show();
                });
            }
            function commontSubmit() {
                function showTime() {
                    var mydate = new Date();
                    var str = '' + mydate.getFullYear() + '年';
                    str += (mydate.getMonth() + 1) + '月';
                    str += mydate.getDate() + '日';
                    return str;
                }
                var id = $('#app-id').val();
                var content = $('.w-text textarea').val();
                if ($.trim(content).length <= 2) {
                    alert('请填写内容');
                    return;
                };
                fetch(addplurl + '?content=' + content + '&SoftID=' + did + '&Action=2&CommentTpye=' + CommentTpye)
                .then(function (res) {
                    return res.text();
                }).then(function (data) {
                    alert('提交成功');
                    $('#comment_list,.g-comment-showbtn').show();
                    $('#m-comment-box').hide();
                    $('.w-text textarea').val('');
                });
                var comment = '<dt><span><i>最高楼</i><b>您的评论 网友 客人</b> </span>';
                comment += '<em>发表于: <font color="red"> ' + showTime() + ' </font> </em></dt>';
                comment += '<dd>' + content + '<p id="' + $(ele).find('#app-id').val() + '">';
                comment += '<a href="javascript:">支持<em>(</em><span>0</span><em>)</em></a>';
                comment += '<a href="javascript:" pid="' + $(ele).find('#app-id').val() + '">盖楼(回复)</a> </p></dd>';
                var newcomment = '<dt class="clearfix"><i>最高楼</i><span><b>您的评论</b>';
                newcomment += ' <em><font color="red"> ' + showTime() + ' </font></em></span></dt>';
                newcomment += '<dd>' + content + '<p id="' + $(ele).find('#app-id').val() + '">';
                newcomment += '<a href="javascript:">支持<em>(</em><span>0</span><em>)</em></a> ';
                newcomment += '<a href="javascript:" pid="' + $(ele).find('#app-id').val() + '">盖楼(回复)</a> </p></dd>';
                $(ele).find('.g-game-ly div dl').prepend(comment);
                $(ele).find('.g-game2-ly div dl').prepend(newcomment);
            }
            // 评论页读取顶
            function bindDing(objtext, id, CommentTpye) {
                var obj = $(objtext);
                if (obj.length === 0) {
                    return false;
                };
                for (var i = 0; i < obj.length; i++) {
                    var sobj = obj.eq(i).find('a').first();
                    var spanobj = obj.eq(i).find('span');
                    sobj.click(function () {
                        sendDing($(this).parent().attr('id'));
                        var spanobj = $(this).parent().find('span');
                        spanobj.html(parseInt(spanobj.html(), 0) + 1);
                        $(this).unbind();
                        $(this).attr('title', '您已经顶过了');
                    });
                };
                readDing(objtext, id, CommentTpye);
            }
            function sendDing(id) {
                fetch(addplurl + '?action=19&id=' + id).then(function (res) {});
            }
            // 读取评论顶的数据
            function readDing(objtext, id, CommentTpye) {
                var obj = $(objtext);
                var sendid = '';
                for (var i = 0; i < obj.length; i++) {
                    sendid += obj.eq(i).attr('id');
                    if (i < (obj.length - 1)) {
                        sendid += ',';
                    };
                };
                if (sendid !== '') {
                    fetch(addplurl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: 'action=18&id=' + id + '&CommentTpye=' + CommentTpye + '&sendid=' + escape(sendid) + ''
                    }).then(function (res) {
                        return res.text();
                    }).then(function (msg) {
                        listDing(objtext, msg);
                    });
                };
            }
            function listDing(objtext, msg) {
                var obj = $(objtext);
                var dataObj = (new Function('', 'return' + msg))();
                for (var i = 0; i < obj.length; i++) {
                    var spanobj = obj.eq(i).find('span');
                    var sid = obj.eq(i).attr('id');
                    for (var y = 0; y < dataObj.ID.length; y++) {
                        if (sid === String(dataObj.ID[y])) {
                            spanobj.html(dataObj.Ding[y]);
                            break;
                        };
                    };
                };
            }
        };
    // 新留言结束
    };
    return customElement;
});
