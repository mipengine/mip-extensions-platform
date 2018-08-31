/**
 * @file mip-ilaw66-baidu-request 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var templates = require('templates');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var countdown = 0;
        var dateTime = new Date();
        var begin = dateTime.getHours();
        var min = dateTime.getMinutes();
        var sec = dateTime.getSeconds();
        var timer;
        var lawyerId;
        var sessionId = getQueryString('sessionId');
        setTimeout(function () {
            sessionId = $el.find('#sesiid').html();
            console.log(sessionId);
        }, 1000);
        var hosturl = 'https://www.ilaw66.com/jasmine/';
        function returhostname() {
            var hostweb = location.protocol;
            var hostname = location.hostname;
            if (hostname === 'm.baidu.com' || hostname === 'www.ilaw66.com') {
                hosturl = 'https://www.ilaw66.com/jasmine/';
            }
            else if (hostname === 'localhost') {
                var hostport = location.port;
                hosturl = 'http://' + hostname + ':' + hostport + '/jasmine/';
            }
            else {
                hosturl = 'https://' + hostname + '/jasmine/';
            }
        }
        returhostname();
        console.log(hosturl);
        $el.find('.jingxuan_top').css('background-image', 'url("images/bg_jingxuanlvshi.png")');
        $el.find('.jingxuan_top>img').attr('src', 'images/bg_touxiangjx.png');

        getLawyerImgs();
        var i = 0;
        timer = setInterval(function () {
            i++;
            $el.find('.countdownTime').text(i);
            var date = new Date();
            countdown = (date.getHours() - begin) * 3600 + (date.getMinutes() - min) * 60 + (date.getSeconds() - sec);
            settime();
            if (i >= 120) {
                pauseAnimation();
                clearInterval(timer);
                $el.find('.countdownTime').text('120');
            }

        }, 1000);
        // 取消按钮事件
        $el.find('.cancelBtn').click(function () {
            window.top.location.href = './'; // 取消跳转至首页
        });
        // 取消咨询, 头部返回按钮
        $el.find('.tocancle').click(function () {
            clickBackOr();
        });

        // 每隔更改15秒,更改律师匹配数量一次
        changeLawyerNum();

        lawyerId = getQueryString('lawyerId');

        // back键处理
        $el.find('.glyphicon').on('click', function () {
            clickBackOr();
        });

        $el.find('#requestId').val(getQueryString('data'));
        $el.find('#questionType').val(getQueryString('questionType'));
        $el.find('#askingType').val(getQueryString('askingType'));

        // 根据咨询类型：是否继续问显示不同内容
        if ($el.find('#askingType').val() === '02') {
            $el.find('.request_txt').html('请耐心等待，联系律师中...');
            $el.find('.icon_title').html('<span class=\'failed_icon\'>'
                + '</span>请求失败!');
            $el.find('.failed_txt').html('<span class=\'failed_title\'>'
                + '可能因为</span><br/>1.处于非工作时间<br/>'
                + '2.您所选的律师正在服务中<br/>3.您所选的律师目前不在线');
            $el.find('#reAsk').html('重新咨询');
        }

        function clickBackOr() {
            var title = '';
            var main = '累计取消三次，当天将无法再次咨询，确定取消本次咨询吗？';
            var yes = '确定取消';
            var no = '点错了';
            $el.find('.backOr_div .back__popLayer span:nth-of-type(1)').text(title);
            $el.find('.backOr_div .back__popLayer span:nth-of-type(2)').text(main);
            $el.find('.backOr_div .back__popLayer .back-leave').text(yes);
            $el.find('.backOr_div .back__popLayer .back-continue').text(no);
            $el.find('.backOr_div').show();
            $el.find('.backOr_div .back__popLayer .back-leave').click(function () {
                $el.find('.backOr_div').hide();
                cancelRequestOr();
            });
            $el.find('.backOr_div .back__popLayer .back-continue').click(function () {
                $el.find('.backOr_div').hide();
            });
        }
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return null;
        }

        function settime() {

            var id = $el.find('#requestId').val();
            var questionType = $el.find('#questionType').val();
            var askingType = $el.find('#askingType').val();
            if (countdown > 60) {
                clearInterval(timer);
                window.top.location.href = 'mipilaw66baidu_lawyer_noresponse?questionType='
                    + questionType + '&sessionId=' + sessionId;
            }
            else {
                if (countdown % 5 === 0) {
                    $.ajax({
                        type: 'GET',
                        url: hosturl + 'timer?id=' + id + '&sessionId=' + sessionId,
                        dataType: 'json',
                        success: function (data) {
                            //                      	debugger
                            var dataStatus = data.status;
                            if (dataStatus === 2 || dataStatus === 5 || dataStatus === 6
                                || dataStatus === 7 || dataStatus === 8
                                || dataStatus === 11 || dataStatus === 12) {
                                clearInterval(timer);
                                var url = encodeURI(
                                    'mipilaw66baidu_linking?questionType=' + questionType + '&lawyerName='
                                    + data.lawyerName + '&requestId=' + id + '&askingType='
                                    + askingType + '&lawyerId=' + data.lawyerId + '&tel='
                                    + data.tel + '&goodCommentRate=' + data.goodCommentRate
                                    + '&sessionId=' + sessionId);
                                window.top.location.href = url;
                            }
                            else if (dataStatus === 4 || dataStatus === 1 || dataStatus === 3
                                || dataStatus === 9 || dataStatus === 10
                                || dataStatus === 'ERROR' || dataStatus === 'ERROR1') {
                                clearInterval(timer);
                                window.top.location.href = 'mipilaw66baidu_lawyer_noresponse?questionType='
                                    + questionType + '&sessionId=' + sessionId;
                            }

                        },
                        error: function (jqXHR) {
                            if (jqXHR.status === 403) {
                                window.location.reload();
                            }

                        }
                    });
                }
            }
        }
        function cancelRequestOr() {
            $.ajax({
                url: hosturl + 'cancelRequest?requestId=' + $el.find('#requestId').val() + '&_csrf='
                    + $el.find('#_csrf').val() + '&sessionId=' + sessionId,
                type: 'POST',
                success: function (data) {
                    if (data === 'NG') {
                        $el.find('.toast_txt').text('取消晚了，律师正在联系您');
                        $el.find('.toast_div').show();
                        setTimeout(function () {
                            $el.find('.toast_div').hide();
                        }, 2000);
                    }
                    else if (data === 'OK') {
                        pauseAnimation();
                        clearInterval(timer);
                        $el.find('.toast_txt').text('取消成功');
                        $el.find('.toast_div').show();
                        setTimeout(function () {
                            $el.find('.toast_div').hide();
                            gobackHandle();
                        }, 2000);
                    }

                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }

        // 停止定时器
        function pauseAnimation() {
            $el.find('.leftcircle').css('animation-play-state', 'paused');
            $el.find('.rightcircle').css('animation-play-state', 'paused');
            $el.find('.leftcircle').css('-webkit-animation-play-state', 'paused');
            $el.find('.rightcircle').css('-webkit-animation-play-state', 'paused');
        }

        // 改变精选律师匹配数量
        function changeLawyerNum() {
            var lawyerNumTime = 0;
            var initNum = Math.ceil(Math.random() * 5 + 8);
            $el.find('.jingxuanLawyer_num').text(initNum);
            setInterval(function () {
                lawyerNumTime += 15;
                var num;
                if (lawyerNumTime >= 0 && lawyerNumTime < 15) {
                    num = Math.ceil(Math.random() * 5 + 8 * 2);
                    // console.log(num);
                    $el.find('.jingxuanLawyer_num').text(num);
                }
                else if (lawyerNumTime >= 15 && lawyerNumTime < 30) {
                    num = Math.ceil(Math.random() * 6 + 8 * 3);
                    // console.log(num);
                    $el.find('.jingxuanLawyer_num').text(num);
                }
                else if (lawyerNumTime >= 30 && lawyerNumTime < 45) {
                    num = Math.ceil(Math.random() * 7 + 8 * 4);
                    // console.log(num);
                    $el.find('.jingxuanLawyer_num').text(num);
                }
                else if (lawyerNumTime >= 45 && lawyerNumTime < 60) {
                    num = Math.ceil(Math.random() * 8 + 8 * 5);
                    // console.log(num);
                    $el.find('.jingxuanLawyer_num').text(num);
                }

            }, 15000);
        }
        function gobackHandle() {
            if (!parseInt(sessionStorage.getItem('loginFlg'), 10) && sessionStorage.getItem('loginFlg') === '0') {
                window.top.location.href = 'login';
            }
            else {
                window.top.location.href = './';
            }
        }
        function getLawyerImgs() {
            var temp = {};
            temp.list = [];
            $.ajax({
                type: 'post',
                url: hosturl + 'lawyerOnlines?_csrf=' + $el.find('#_csrf').val()
                    + '&questionType=' + getQueryString('questionType') + '&sessionId=' + sessionId,
                async: false,
                success: function (data) {
                    var data = data.data;
                    if (!data || data.length === 0) {
                    // no lawyer msg
                    }
                    else {
                        for (var h = 0; h < data.length; h++) {
                            var a = data[h];
                            temp.list.push({
                                name: a.name,
                                identifyPhoto: a.identifyPhoto
                            });
                        }
                        var tempHtml = '';
                        tempHtml += '<mip-carousel '
                            + 'autoplay '
                            + 'layout="responsive" '
                            + 'width="60" '
                            + 'height="60">';
                        var tempHtmlN = '';
                        tempHtmlN += '<mip-carousel '
                            + 'autoplay '
                            + 'layout="responsive" '
                            + 'width="60" '
                            + 'height="60">';
                        temp.list.forEach(function (item) {
                            tempHtml += '<mip-img class="mip_img" width="60" height="60"'
                                + ' src="' + item.identifyPhoto + '"></mip-img>';
                            tempHtmlN += '<p>' + item.name + '</p>';
                        });
                        tempHtml += '</mip-carousel>';
                        tempHtmlN += '</mip-carousel>';
                        $el.find('#mip-template-lawyerImg').html(tempHtml);
                        $el.find('#mip-template-lawyerName').html(tempHtmlN);
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }

    };

    return customElement;
});
