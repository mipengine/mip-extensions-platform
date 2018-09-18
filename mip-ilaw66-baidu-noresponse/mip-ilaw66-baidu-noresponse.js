/**
 * @file mip-ilaw66-baidu-noresponse 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('jquery');

    /**
     * 因有些方法zepto不支持故使用jquery
     */

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var lawyerId;
        var $el = $(this.element);
        $(function () {
            var MIP = window.MIP;
            var sessionId = getQueryString('sessionId');
            setTimeout(function () {
                sessionId = $el.find('#sesiid').html();
                console.log(sessionId);
            }, 1000);
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
            $el.find('.glyphicon-menu-left').click(function () {
                if (!parseInt(sessionStorage.getItem('loginFlg'), 10) && sessionStorage.getItem('loginFlg') === '0') {
                    //                  window.top.location.href = 'login';
                    //                  locahost('login', '登录');
                    locahost('mipilaw66baidu_login?channel=baidusearch', '准备咨询');
                }
                else {
                    //                  window.top.location.href = './';
                    locahost('./', '电话咨询');
                }
            });

            lawyerId = getQueryString('lawyerId');

            var fromChannel = localStorage.getItem('fromChannel');
            var currentHours = new Date().getHours();

            if (currentHours <= 8 || currentHours >= 23 || currentHours === 0) {
                // 非工作时间
                // 应 修改
                $el.find('#js-continueAsk').hide();
                $el.find('.main_text_nonworking').show();
                $el.find('.main_text_busy').hide();
                $el.find('#js-textConsulting').css({
                    'background-color': '#3388FF',
                    'color': '#fff'
                });
            }

            var questionType = getQueryString('questionType');
            var csrfToken = $el.find('#_csrf').val();
            // 点击重新匹配律师按钮
            //          $el.find('#js-continueAsk').on('touchstart', function () {
            //              $.ajax({
            //                  type: 'post',
            //                  url: 'greeting?questionType=' + questionType + '&_csrf=' + csrfToken,
            //                  success: function (data) {
            //                      if (data === 'ERROR' || data === 'ERROR1') {
            //                          $el.find('#err_msg').html('系统异常，请返回重新咨询');
            //                          $el.find('.popUp_sysErr').fadeIn();
            //                      }
            //                      else if (data === 'ERROR2') {
            //                          $el.find('#err_msg').html('您有订单未支付，请支付后再咨询');
            //                          $el.find('.popUp_sysErr').fadeIn();
            //                      }
            //                      else if (data === 'ERROR3') {
            //                          $el.find('#err_msg').html('您有订单未结束，请等待1分钟后再试');
            //                          $el.find('.popUp_sysErr').fadeIn();
            //                      }
            //                      else {
            //                          if (lawyerId) {
            //                              window.top.location.href = 'mipilaw66baidu_request?data=' + data + '&questionType='
            //                                  + questionType + '&lawyerId=' + lawyerId;
            //                          }
            //                          else {
            //                              window.top.location.href = 'mipilaw66baidu_request?data='
            //                                  + data + '&questionType=' + questionType;
            //                          }
            //                      }
            //                  },
            //                  error: function (jqXHR) {
            //                      if (jqXHR.status === 403) {
            //                          window.location.reload();
            //                      }
            //
            //                  }
            //              });
            //          });
            $el.find('#js-continueAsk').click(function () {
                var ajaxdatas = {};
                ajaxdatas.questionType = questionType;
                ajaxdatas._csrf = csrfToken;
                ajaxdatas.channel = 'baidusearch';
                ajaxdatas.sessionId = sessionId;
                $.ajax({
                    type: 'post',
                    url: hosturl + 'greeting2',
                    data: ajaxdatas,
                    timeout: 10000, // 超时时间设置，单位毫秒
                    success: function (datas) {
                        var data = datas.data;
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
                        else {
                            if (lawyerId) {
                                var requset = 'mipilaw66baidu_request?data=' + data + '&questionType='
                                    + questionType + '&lawyerId=' + lawyerId + '&sessionId=' + sessionId;
                            }
                            else {
                                var requset = 'mipilaw66baidu_request?data='
                                    + data + '&questionType=' + questionType + '&sessionId=' + sessionId;
                            }
                            locahost(requset, '匹配律师');
                        }
                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }

                    }
                });
            });

            // 文字咨询按钮
            $el.find('#js-textConsulting').click(function () {
                var textbutturl = 'https://m.baidu.com/zhuanjia/question#/submit?vn=law&ref=alaqiang&ssid=0&from=0&uid=0&pu=csrc%40app_secr_txt,sz%401320_2001,ta%40iphone_1_11.2_22_2.8,usm%406&bd_page_type=1&baiduid=F90644066BC91C4E0285A23EFBBC5CC9&tj=2gs_2_0_10_l1&htrackid=6ec1913b5246ead3b67a15bc5d256a75';
                //              location.assign(textbutturl);
                window.top.location.href = textbutturl;
            });
            $el.find('#err_confirm').click(function () {
                //              $el.find('.popUp_sysErr').hide();
                locahost('./', '电话咨询');
            });
        });
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
