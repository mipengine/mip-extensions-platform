/**
 * @file mip-ilaw66-sharelawyer 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var viewer = require('viewer');

    /**
	 * 备注：部分地方存在全局选择因为部分地方规则限定
	 */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var $el = $(this.element);
        var sessionId = 0;
        var MIP = window.MIP;
        var clicksstart = true;
        var thisurls = window.location.href;
        var isthislogin = false; // 是否我们平台注册

        var bdcard = getQueryString('bdcard') ? getQueryString('bdcard') : null;
        var lawyerId = getQueryString('lawyerId') ? getQueryString('lawyerId') : null;

        var hosturl = 'https://www.ilaw66.com/jasmine/';

        function returhostname() {
            var hostweb = location.protocol;
            var hostname = location.hostname;
            if (hostname === 'www-ilaw66-com.mipcdn.com' || hostname === 'www.ilaw66.com') {
                hosturl = 'https://www.ilaw66.com/jasmine/';
            }
            else if (hostname === 'localhost') {
                var hostport = location.port;
                hosturl = 'http://' + hostname + ':' + hostport + '/jasmine/';
            }
            else if (hostname === 'test-ilaw66-com.mipcdn.com') {
                hosturl = 'https://test.ilaw66.com/jasmine/';
            }
            else {
                hosturl = 'https://' + hostname + '/jasmine/';
            }
        }

        returhostname();

        function locahost(topsurl, toptitle) {

            if (topsurl === './') {
                topsurl = 'baidusearch';
            }

            var topurl = hosturl + topsurl;
            if (MIP.viewer.isIframed) {
                if (topsurl === 'baidusearch') {
                    location.assign('https://m.baidu.com/mip/c/s/www.ilaw66.com/jasmine/baidusearch');
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
        var isloginf = false;
        this.addEventAction('login', function (event) {
            var sessid = event.sessionId;
            var islogin = parseInt(event.userInfo.isLogin, 10);
            if (!islogin) { // 未注册
                var qusttype = localStorage.getItem('baiduquestionType');
                var tzurl = 'mipilaw66baidu_login?channel=baidusearch&sessionId='
                + sessid + '&questionType=' + qusttype + '&bdcard=' + bdcard;
                locahost(tzurl, '准备咨询');
            }
            else {
                //    console.log('登录成功');
                sessionId = sessid;
            }
        });

        this.addEventAction('error', function (event) {
            //          console.log('登录错误');
        });

        function getQueryString(name) {
            var reg = new RegExp('(^|&)'
            + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
        }
        getLawyerMsg(lawyerId);
        $el.find('.shareLawyer_btn__toask').on('click', function (event) {
            if (sessionId !== 0) {
                startConsulting('CT007');
            }
        });

        function getLawyerMsg(lawyerId) {
            var b = {};
            var ajaxdatas = {};
            ajaxdatas.lawyerId = lawyerId;
            ajaxdatas.sessionId = sessionId;
            $.ajax({
                type: 'get',
                url: 'getShareLawyerDetail',
                data: ajaxdatas,
                async: false,
                success: function (data) {
                    if (!data.result) {
                    // no lawyer msg
                    }
                    else {
                        b = JSON.parse(data.result);
                        if (!b) {
                            return;
                        }

                        if (!b.authorizePhoto) {
                            b.authorizePhoto = 'http://images.ilaw66.com/images/formal/xucai.ying_formal_thumbnails.';
                        }

                        if (b.lawyerFieldStr) {
                            b.lawyerFieldStr = b.lawyerFieldStr.split(',');
                        }

                        console.log(data.result);
                        var lawylengt = b.lawyerFieldStr.length ? b.lawyerFieldStr.length : 0;

                        var htmlstring = '<mip-img src=' + b.authorizePhoto + 'class="userimg"></mip-img>'
                        + '<h1>' + b.name + '</h1>'
                        + '<p class="shareLawyer_p">好评率:' + b.goodCommentRate
                            + '</p><p class="shareLawyer_h2">执业信息</p>'
                            + '<p class="shareLawyer_p">执业地区:' + b.provinceName + '</p>'
                            + '<p class="shareLawyer_p">执业年限:' + b.workTime + '</p>';
                        if (lawylengt > 0) {
                            var lawyer = ' ';
                            for (var i = 0; i < b.lawyerFieldStr.length; i++) {
                                lawyer += '<p class="shareLawyer_p shareLawyer_p__field">'
                                + b.lawyerFieldStr[i] + '</p>';
                            }
                            htmlstring += '<div class="shareLawyer_h2 shareLawyer_h2__takearea">'
                            + '<span class="shareLawyer_h2__takeareaTxt">擅长领域</span><br/>'
                            + lawyer + '</div>';
                        }

                        $el.find('#authorbox').html(htmlstring);
                        $el.find('#minutes').html(b.minutes);
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }
        $el.find('.link_confirm').click(function (event) {
            $el.find('.alertbox').removeClass('alertactive');
        });

        function constorder() {
            var ajaxdatas = {};
            ajaxdatas.questionType = 'CT007';
            ajaxdatas.lawyerId = lawyerId;
            ajaxdatas.desc = lawyerId;
            ajaxdatas.origin = 'shareLawyer';
            ajaxdatas.continueAskPage = 'shareLawyer_lawyerShare';
            ajaxdatas._csrf = $el.find('#_csrf').val();
            ajaxdatas.channel = 'baidusearch';
            ajaxdatas.sessionId = sessionId;
            $.ajax({
                url: hosturl + 'continueAskV3',
                type: 'POST',
                async: true,
                data: ajaxdatas,
                timeout: 5000, // 超时时间设置，单位毫秒
                success: function (data) {
                    var id = data.data;
                    if (id !== '') {
                        localStorage.setItem('reAskAvatar', data.avatar);
                        localStorage.setItem('reAskName', data.lawyerName);
                        localStorage.setItem('reAskSex', data.sex);
                        localStorage.setItem('lawyerField', data.lawyerField);
                        localStorage.setItem('goodCommentRate', data.goodCommentRate);
                        //		location.href = "informLawyer_wx?data=" + id + "&questionType=" + questionType + "&lawyerId=" + getQueryString("lawyerId") + "&PABackJumpFlg=shareLawyer";
                        var infourl = 'mipilaw66baidu_informLawyer?data='
                        + id + '&questionType=CT007&lawyerId='
                        + lawyerId + '&PABackJumpFlg=shareLawyer'
                        + '&sessionId=' + sessionId;
                        locahost(infourl, '通知律师');
                    }
                    else {
                        $el.find('#messagecontem').text(data.error);
                        $el.find('#payalert').addClass('alertactive');
                    }
                },
                complete: function (xhr, status) {
                    //              	alert(JSON.stringify(xhr))
                },
                error: function (data) {
                    clicksstart = true;
                    //                   $el.find('#messagecontem').text(JSON.stringify(xhr));
                    //                      $el.find('#payalert').addClass('alertactive');
                    $el.find('#sesiid').html(data);
                    //                  window.location.reload();
                }
            });
        }

        function startConsulting(questionType) {
            var ajaxdatas = {};
            ajaxdatas.questionType = questionType;
            ajaxdatas._csrf = $el.find('#_csrf').val();
            ajaxdatas.channel = 'baidusearch';
            ajaxdatas.sessionId = sessionId;
            $.ajax({
                url: hosturl + 'getUserIdFromServer',
                type: 'GET',

                timeout: 5000, // 超时时间设置，单位毫秒
                success: function (datas) {
                    if (datas) {

                        constorder();
                    }
                    else {
                        $el.find('#messagecontem').text('系统异常，请返回重新咨询');
                        $el.find('#payalert').addClass('alertactive');
                    }

                },
                complete: function (xhr, status) {
                    //              	alert(JSON.stringify(xhr))
                },
                error: function (data) {
                    clicksstart = true;
                    //                   $el.find('#messagecontem').text(JSON.stringify(xhr));
                    //                      $el.find('#payalert').addClass('alertactive');
                    $el.find('#sesiid').html(data);
                    //                  window.location.reload();
                }
            });
        }

    };

    return customElement;
});
