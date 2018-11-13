/**
 * @file mip-ilaw66-informLawyerFailed2 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var timerRequestId = getQueryString('requestId');
        var lawyerId = getQueryString('lawyerId');
        var secondAskFlg = getQueryString('secondAskFlg');
        var questionType = getQueryString('questionType');
        var askingType = getQueryString('askingType');
        var lawyerName = getQueryString('lawyerName');
        var csrfToken = $el.find('#_csrf').val();
        // var nameOfLawyer = localStorage.getItem('reAskName');

        var sessionId = getQueryString('sessionId');
        var MIP = window.MIP;
        this.addEventAction('login', function (event) {
            //          console.log('授权成功');
            var sessid = event.sessionId;
            var islogin = parseInt(event.userInfo.isLogin, 10);
            if (!islogin) { // 未注册
                var qusttype = localStorage.getItem('baiduquestionType');
                var tzurl = 'mipilaw66baidu_login?channel=baidusearch&sessionId='
                    + sessid + '&questionType=' + qusttype;
                locahost(tzurl, '准备咨询');
            }
            else {
                console.log('登录成功');
                sessionId = sessid;
            }
        });

        var hosturl = 'https://www.ilaw66.com/jasmine/';
        function returhostname() {
            var hostname = location.hostname;
            if (hostname === 'www-ilaw66-com.mipcdn.com' || hostname === 'www.ilaw66.com') {
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
        function locahost(topsurl, toptitle) {
            if (topsurl === './') {
                topsurl = 'baidusearch';
            }

            var topurl = hosturl + topsurl;
            if (MIP.viewer.isIframed) {
                if (topsurl === 'baidusearch') {
                    window.top.location.href = 'https://m.baidu.com/mip/c/s/www.ilaw66.com/jasmine/baidusearch';
                }
                else {
                    MIP.viewer.sendMessage('loadiframe', {
                        title: toptitle,
                        click: '',
                        url: topurl
                    });
                }
            }
            else {
                location.assign(topurl);
            }
        }

        getInfo();

        $el.find('.reAskAgain, .reAsk').click(function () {
            $.ajax({
                type: 'POST',
                url: hosturl + 'continueAskV3?lawyerId=' + lawyerId + '&questionType='
                    + questionType + '&_csrf=' + csrfToken + '&source=1&sessionId=' + sessionId,
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    var id = data.data;
                    if (id !== '') {
                        var tmpUrl = encodeURI('mipilaw66baidu_informLawyer?questionType=' + questionType
                            + '&sessionId=' + sessionId
                            + '&data=' + id + '&lawyerId=' + lawyerId + '&PABackJumpFlg=informLawyerfailed');
                        locahost(tmpUrl, '通知律师');
                    }
                    else {
                        alert(data.error);
                    }
                },
                error: function (jqXHR) {
                    window.location.reload();
                }
            });
        });
        $el.find('.askOthers').on('click', function () {
            startConsulting(questionType, csrfToken);
        });
        $el.find('#err_confirm').click(function () {
            $el.find('.popUp_sysErr').hide();
        });

        function getInfo() {
            $.ajax({
                type: 'GET',
                url: hosturl + 'timer?id=' + timerRequestId
                    + '&lawyerId=' + lawyerId + '&sessionId=' + sessionId,
                dataType: 'json',
                success: function (data) {
                    if (!data || data.status === 'ERROR') {
                        alert(data.status);
                        return;
                    }

                    timerRequestId = data.requestId;
                    // 未上传头像则选择默认头像
                    if (!data.avatar) {
                        if (data.sex === 'male') {
                            $el.find('.end_avatar').attr('src', 'images/bg_touxaingnan.png');
                        }
                        else if (data.sex === 'female') {
                            $el.find('.end_avatar').attr('src', 'images/bg_touxiangnv.png');
                        }
                    }
                    else {
                        $el.find('.end_avatar').attr('src', data.avatar);
                    }
                    var temp = {
                        avatar: data.avatar,
                        lawyerName: data.lawyerName,
                        lawyerField: data.lawyerField,
                        serviceTimes: data.serviceTimes,
                        lightStar: data.lightStar,
                        grayStar: data.grayStar,
                        authorizedNo: data.authorizedNo
                    };
                    $el.find('.end_name').text(temp.lawyerName);

                    var currentHour = new Date().getHours();
                    var currentMinutes = new Date().getMinutes();
                    $el.find('.inform_failed_tip').html(temp.lawyerName + '不方便接听电话，<br/>'
                        + '请稍后继续问或由系统推荐其他律师').show();
                    if (currentHour < 8 || (currentHour === 23 && currentMinutes > 0) || currentHour > 23) {
                        $el.find('.continueAsk').html('继续问（建议8:00~23:00之间咨询）');
                    }

                    if (secondAskFlg >= '2') {
                        $el.find('.inform_failed_tip').html('律师可能在忙，请您稍后再试').show();
                        if (currentHour < 8 || (currentHour === 23 && currentMinutes > 0) || currentHour > 23) {
                            $el.find('.inform_failed_tip').html('当前是非工作时间，建议您在8:00~23:00之间咨询').show();
                        }

                        $el.find('.askOthers').removeClass().addClass('alreadyKnow');
                        $el.find('.alreadyKnow').text('我知道了');
                        $el.find('.continueAsk').hide();

                        $el.find('.alreadyKnow').click(function () {
                            /*var tmpUrl = encodeURI('mipilaw66baidu_linking?questionType='
                                + questionType + '&sessionId=' + sessionId
                                + '&lawyerName=' + temp.lawyerName + '&requestId='
                                + timerRequestId + '&askingType=' + askingType
                                + '&lawyerId=' + lawyerId);
                            locahost(tmpUrl, '服务完成');*/
                            locahost('./');
                        });
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }
        // 获取url参数
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return null;
        }

        function startConsulting(questionType, csrfToken) {
            var ajaxdatas = {};
            ajaxdatas.questionType = questionType;
            ajaxdatas._csrf = csrfToken;
            ajaxdatas.channel = 'baidusearch';
            ajaxdatas.sessionId = sessionId;
            $.ajax({
                url: hosturl + 'greeting2',
                type: 'post',
                async: true,
                data: ajaxdatas,
                timeout: 5000,
                success: function (data) {

                    if (data === 'ERROR' || data === 'ERROR1') {
                        $el.find('#err_msg').html('系统异常，请返回重新咨询');
                        $el.find('.popUp_sysErr').fadeIn();
                    }
                    else if (data === 'ERROR2') {
                        $el.find('#err_msg').html('您有订单未支付，请支付后再咨询');
                        $el.find('.popUp_sysErr').fadeIn();
                    }
                    else if (data === 'ERROR3') {
                        $el.find('#err_msg').html('您有订单未结束，请等待1分钟后再试');
                        $el.find('.popUp_sysErr').fadeIn();
                    }
                    else if (data === 'ERROR4') {
                        $el.find('#err_msg').html('您今日取消咨询已达3次，请明天再来');
                        $el.find('.popUp_sysErr').fadeIn();
                    }
                    else {
                        var requesturl = 'mipilaw66baidu_request?data=' + data.data + '&questionType=' + questionType
                            + '&sessionId=' + sessionId;
                        locahost(requesturl, '匹配律师');
                    }
                },
                error: function (data) {
                    $el.find('#sesiid').html(data);
                    // window.location.reload();
                }
            });
        }

    };

    return customElement;
});
