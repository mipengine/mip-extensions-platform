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
        var timerRequestId = getQueryString('data');
        var lawyerId = getQueryString('lawyerId');
        var secondAskFlg = getQueryString('secondAskFlg');
        var requestId = getQueryString('requestId');
        var questionType = getQueryString('questionType');
        var askingType = getQueryString('askingType');
        var lawyerName = getQueryString('lawyerName');
        var csrfToken = $el.find('#_csrf').val();

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

        var currentHour = new Date().getHours();
        var currentMinutes = new Date().getMinutes();
        $el.find('.inform_failed_tip').html('律师可能在忙，请您稍后再试').show();
        if (currentHour < 8 || (currentHour === 23 && currentMinutes > 0) || currentHour > 23) {
            $el.find('.inform_failed_tip').html('当前是非工作时间，建议您在8:00~23:00之间咨询');
        }

        if (secondAskFlg >= '2') {
            $el.find('.askOthers').removeClass().addClass('alreadyKnow');
            $el.find('.alreadyKnow').text('我知道了');
            // $el.find('.continueAsk').hide();
            $el.find('.alreadyKnow').click(function () {
                // location.href = "linking?questionType=" + questionType + "&lawyerName=" + nameOfLawyer
                // + "&requestId=" + requestId + "&askingType=" + askingType + "&lawyerId=" + lawyerId;
                var tmpUrl = encodeURI('mipilaw66baidu_linking?questionType=' + questionType + '&sessionId=' + sessionId
                    + '&lawyerName=' + lawyerName + '&requestId=' + requestId + '&askingType=' + askingType
                    + '&lawyerId=' + lawyerId);
                locahost(tmpUrl, '服务完成');
            });
        }
        else if (secondAskFlg === '1') {
            $el.find('.askOthers').removeClass().addClass('reAskAgain');
            $el.find('.reAskAgain').text('再通知一次');
            // $el.find('.continueAsk').hide();
            /*$el.find('.reAskAgain').click(function () {
                continueAskNew();
            });*/
        }

        // 继续问/再通知一次(informlawyer_failed)
        $el.find('.reAskAgain').click(function () {
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
    };

    return customElement;
});
