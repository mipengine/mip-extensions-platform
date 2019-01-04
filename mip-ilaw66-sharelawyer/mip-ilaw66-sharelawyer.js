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
            else {
                var tzurl = 'mipilaw66baidu_login?channel=baidusearch&sessionId='
                    + sessionId + '&questionType=CT007&bdcard=' + bdcard;
                locahost(tzurl, '准备咨询');
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
                    //					var data = {
                    //						"code": "200",
                    //						"status": "success",
                    //						"msg": null,
                    //						"result": "{\"authorizePhoto\":\"https://lawer.ilaw66.com/FrMULMWh23tA-A6MC9blSzXdQhWq\",\"lawyerFields\":\"01,05,09,99\",\"personalIntro\":\"\",\"city\":\"3\",\"minutes\":6,\"sex\":\"male\",\"workExperience\":\"1992年\",\"lawyerFieldStr\":\"婚姻家庭,房产物业,公司创业,其他\",\"percent\":\"83%\",\"workTime\":\"8年\",\"lawyerOffice\":\"框道\",\"identifyPhoto\":\"\",\"authorizedTime\":\"2011\",\"goodCommentRate\":\"90%\",\"formalPhoto\":\"https://lawer.ilaw66.com/FrMULMWh23tA-A6MC9blSzXdQhWq\",\"phoneNumber\":\"13818945436\",\"cityName\":\"上海市\",\"field\":[{\"lawyerField\":\"00\",\"fieldName\":\"劳动人事\"},{\"lawyerField\":\"01\",\"fieldName\":\"婚姻家庭\"},{\"lawyerField\":\"03\",\"fieldName\":\"交通意外\"},{\"lawyerField\":\"04\",\"fieldName\":\"医疗纠纷\"},{\"lawyerField\":\"05\",\"fieldName\":\"房产物业\"},{\"lawyerField\":\"06\",\"fieldName\":\"民间借贷\"},{\"lawyerField\":\"07\",\"fieldName\":\"人身伤害\"},{\"lawyerField\":\"09\",\"fieldName\":\"公司创业\"},{\"lawyerField\":\"10\",\"fieldName\":\"合同纠纷\"},{\"lawyerField\":\"16\",\"fieldName\":\"刑事\"},{\"lawyerField\":\"99\",\"fieldName\":\"其它\"}],\"province\":\"9\",\"name\":\"贺律师\",\"lawyerId\":\"\",\"provinceName\":\"上海市\",\"mark\":4,\"shareChain\":\"https://www.ilaw66.com/jasmine/shareLawyer?lawyerId=biwen.he&from=shareLawyer_lawyerShare&channel=WxiaoApp\"}",
                    //						"data": null
                    //					};
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

                        var htmlstring = '<mip-img src=' + b.authorizePhoto + '  class="userimg"></mip-img>'
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
                                + ' <span class="shareLawyer_h2__takeareaTxt">擅长领域</span><br/>' + lawyer + '</div>';
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

        function startConsulting(questionType) {
            var ajaxdatas = {};
            ajaxdatas.questionType = questionType;
            ajaxdatas._csrf = $el.find('#_csrf').val();
            ajaxdatas.channel = 'baidusearch';
            ajaxdatas.sessionId = sessionId;
            $.ajax({
                url: hosturl + 'greeting2',
                type: 'POST',
                async: true,
                data: ajaxdatas,
                timeout: 5000, // 超时时间设置，单位毫秒
                success: function (datas) {
                    var datas = datas.data;
                    if (datas === 'ERROR' || datas === 'ERROR1') {
                        $el.find('#messagecontem').text('系统异常，请返回重新咨询');
                        $el.find('#alertconten').addClass('alertactive');
                    }
                    else if (datas === 'ERROR2') {
                        $el.find('#messagecontem').text('您有订单未支付，请支付后再咨询');
                        $el.find('#payalert').addClass('alertactive');
                    }
                    else if (datas === 'ERROR3') {
                        $el.find('#messagecontem').text('您有订单未结束，请等待1分钟后再试');
                        $el.find('#alertBillErr').addClass('alertactive');
                    }
                    else if (datas === 'ERROR4') {
                        $el.find('#messagecontem').text('您今日取消咨询已达3次，请明天再来');
                        $el.find('#payalert').addClass('alertactive');
                    }
                    else {
                        var requesturl = 'mipilaw66baidu'
                            + '_request?data=' + datas + '&questionType=' + questionType
                            + '&sessionId=' + sessionId;
                        locahost(requesturl, '匹配律师');
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
