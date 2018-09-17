/**
 * @file mip-ilaw66-baidu-order 组件
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
        // 自动加载数据
        //      alert("W")
        $el.find('#requestId').val(getQueryString('requestId'));
        var paystart = getQueryString('paystart');
        var sessionId = getQueryString('sessionId');
        var requestId = getQueryString('requestId');
        var MIP = window.MIP;
        //		alert(paystart)
        var hosturl = 'https://www.ilaw66.com/jasmine/';
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
        var mipsesid = 'mip-login-xzh:sessionId:' + hosturl + 'baidusearch/authorize2';
        sessionId = localStorage.getItem(mipsesid);
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
        //      console.log(hosturl);

        this.addEventAction('login', function (event) {
            console.log('授权成功');
            var sessid = event.sessionId;
            var islogin = parseInt(event.userInfo.isLogin, 10);
            if (!islogin) { // 未注册
                var tzurl = 'mipilaw66baidu_login?channel=baidusearch&sessionId='
                    + sessid;
                locahost(tzurl, '准备咨询');
            }
            else {
                console.log('登录成功');
                sessionId = sessid;
            }
        });

        $el.find('#gohome').click(function () {
            //  window.top.location.href = './';
            locahost('./', '电话咨询');
        });
        $el.find('#cleardpayalert').click(function () {
            $el.find('.payalert').hide();
        });

        $el.find('.headerlf5').click(function () {
            if (paystart) {
                //              window.top.location.href = './';
                locahost('./', '电话咨询');
            }
            else {
                window.history.go(-1);
            }
        });
        load();
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
        }
        // 公共
        var flg = 0;
        //		var indexmessage = getQueryString('data');
        //		if(indexmessage === 'ERROR' || indexmessage === 'ERROR1') {
        //			$el.find('#' + tabHref).removeClass().addClass('tab-pane');
        //			flg = 0;
        //			$el.find('.popUp_sysErr').show();
        //		} else if(indexmessage === 'ERROR2') {
        //			$el.find('#' + tabHref).removeClass().addClass('tab-pane');
        //			flg = 0;
        //			$el.find('.popUp_unpaidErr').show();
        //		} else if(indexmessage === 'ERROR3') {
        //			$el.find('#' + tabHref).removeClass().addClass('tab-pane');
        //			flg = 0;
        //			$el.find('.popUp_unFinishedBillErr').show();
        //		} else if(indexmessage === 'ERROR4') {
        //			// toastOr("您今日取消咨询已达3次，请明天再来");
        //			$el.find('#' + tabHref).removeClass().addClass('tab-pane');
        //			flg = 0;
        //			alert('您今日取消咨询已达3次\uFF0C请明天再来');
        //		}

        // 滚屏控制 有弹出层出现 不可滚动
        //		function controlScroll() {
        //			flg = $el.find('.background_kuang').css('display') !== 'none' ? 1 : 0;
        //		}
        //		$(window).scroll(function(a) {
        //			controlScroll();
        //			if(flg === 1) {
        //				document.body.scrollTop = document.documentElement.scrollTop = 0;
        //			}
        //
        //			a.stopPropagation();
        //		});
        //		document.addEventListener('touchmove', function(event) {
        //			controlScroll();
        //			if(flg === 1) {
        //				if(document.all) {
        //					window.event.returnValue = false;
        //				} else {
        //					event.preventDefault();
        //				}
        //			}
        //
        //		});

        // load
        function timestampToTime(timestamp) {
            var date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '/';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var mzdata = date.getMinutes();
            if (mzdata < 10) {
                var m = '0' + date.getMinutes() + ':';
            }
            else {
                var m = date.getMinutes() + ':';
            }
            var s = date.getSeconds();
            if (s < 10) {
                s = '0' + date.getSeconds();
            }
            else {
                s = date.getSeconds();
            }
            return Y + M + D + h + m + s;
        }
        function load() {
            var requestId = $el.find('#requestId').val();
            var questionType = $el.find('#questionType').val();
            $.ajax({
                type: 'GET',
                // url: 'data.json'
                url: hosturl + 'selectOrderV1?id=' + requestId + '&sessionId=' + sessionId,
                async: false,
                success: function (data) {
                    var qusetype = data.questionType;
                    $el.find('#questionType').val(qusetype);
                    function orderStatusLabel(status, unpaidAmount) {
                        if (unpaidAmount === 0) {
                            return status;
                        }
                        else {
                            return '待支付';
                        }
                    }

                    function btnStatus(unpaidAmount) {
                        if (unpaidAmount === 0) {
                            //                  if(data.commentId === null || data.commentId === "") {
                            //                      return '<button class="toComment orderlist-layout__comment right_btn" id="toComment">评价律师</button><button class="toArk orderlist-layout__reAsk reAsk right_btn" data-type="02" lawyerId="' + data.lawyerId +'" questiontype="' +questionType +'">继续问</button>'
                            //                  } else {
                            //                      return '<button class="toArk orderlist-layout__reAsk reAsk right_btn" data-type="02" lawyerId="' + data.lawyerId + '" questiontype="' + questionType + '">继续问</button>'
                            //                  }
                            return '';
                        }
                        else {
                            return '<button class="pay_btn right_btn" id="pay" orderId="'
                                + data.id + '">去支付</button>';
                        }
                    }
                    var orderInfoHtml = '<div class="orderlist__status border_bottom payheader">'
                        + '<div class="con_left">'
                        + '<div class="order__title">'
                        + '<span class="pay_status_icon">付费</span> '
                        + data.lawyerName + '电话咨询'
                        + '</div>'
                        + '<div class="order__status">订单状态：'
                        + orderStatusLabel(data.orderStatusLabel, data.unpaidAmount) + '</div>'
                        + '</div>'
                        + '<div class="con_right">' + btnStatus(data.unpaidAmount) + '</div>'
                        + '</div>'
                        + '<div class="orderlist__status">'
                        + '<div class="order_info">'
                        + '<p>联系方式：' + data.lawyerPhone + '</p>'
                        + '<p>咨询️时间: ' + timestampToTime(data.consultingTime) + '</p>'
                        + '<p>订单金额：' + data.totalAmount + ' 元</p>'
                        + '</div>'
                        + '</div>';
                    $el.find('#orderInfo').html(
                        orderInfoHtml
                    );
                    var lawyerOffice = '';
                    var avatar = 'images/bg_touxaingnan.png';
                    if (data.lawyerOffice !== null) {
                        lawyerOffice = '<div class="order__status text-gary">'
                            + data.lawyerOffice + '</div>';
                    }

                    if (data.avatar !== null && data.avatar) {
                        avatar = data.avatar;
                    }

                    var lawyerInfoHtml = '<div class="head_portrait">'
                        + '<div class="head_portrait_img">'
                        + '<mip-img layout="responsive" width="45" height="45" src="'
                        + avatar + '"></mip-img>'
                        + '</div></div>'
                        + '<div class="con_left">'
                        + '<div class="order__title">服务律师：'
                        + data.lawyerNameFull + '</div>'
                        + lawyerOffice
                        + '</div>';
                    $el.find('#lawyerInfo').html(
                        lawyerInfoHtml
                    );
                    // 支付
                    $el.find('#pay').click(function () {
                        //                  	alert("W")
                        if (data.orderStatusLabel === '已免单') {
                            var $toast = $el.find('#toast');
                            $toast.fadeIn(100);
                            setTimeout(function () {
                                $toast.fadeOut(100);
                            }, 2000);
                        }
                        else {
                            $.ajax({
                                //                              async: false,
                                type: 'GET',
                                //                              data: {
                                //                                  requestIdList: requestId,
                                //                                  sessionId: sessionId
                                //                              },
                                url: hosturl + 'checkFreeBill?sessionId=' + sessionId + '&requestIdList=' + requestId,
                                success: function (data) {
                                    if (data.result !== 2) {
                                        var payurl = 'mipilaw66baidu_couponPay?requestId='
                                            + requestId + '&questionType=' + questionType;
                                        locahost(payurl, '支付详情');
                                    }

                                },
                                error: function (jqXHR) {
                                    if (jqXHR.status === 403) {
                                        window.location.reload();
                                    }

                                }
                            });
                        }
                    });
                    // 继续问
                    $el.find('.reAsk').click(function () {
                        $('.loadingArea').show();
                        var askingType = $(this).data('type');
                        var lawyerId = this.attributes.lawyerId.nodeValue;
                        // var questionType = getQuestionTypeNum(this.attributes['questionType'].nodeValue);
                        var questionType = this.attributes.questiontype.nodeValue;
                        var csrfToken = $el.find('#_csrf').val();
                        // console.log(csrfToken);
                        continueAskNew(lawyerId, questionType, askingType, csrfToken, 'order');
                    });

                    // 希望重试
                    $el.find('#still_reAsk').click(function () {
                        $el.find('.popUp_confirm').hide();
                        $el.find('.loadingArea').show();
                        var askingType = $(this).data('type');
                        var lawyerId = this.attributes.lawyerId.nodeValue;
                        var csrfToken = $el.find('#_csrf').val();
                        continueAsk(lawyerId, questionType, askingType, csrfToken);
                    });
                    // 点击继续问，a有未处理订单时,设为false
                    var flg = false;
                    $el.find('.link_btn_uncheckErrConfirm').click(function () {
                        if (flg) {
                            // 情况为b,弹出重试/咨询其他律师-
                            $el.find('.popUp_uncheckErr').hide();
                            $('.popUp_confirm').fadeIn();
                        }
                        else {
                            // 情况为a,直接关闭
                            $el.find('.popUp_uncheckErr').hide();
                            $el.find('.popUp_confirm').hide();
                        }
                    });
                    // 咨询其他律师时
                    $el.find('.link_others').click(function () {
                        $el.find('.popUp_confirm').hide();
                        $el.find('.loadingArea').show();
                        var csrfToken = $el.find('#_csrf').val();
                        // startConsulting(questionType, csrfToken);
                    });

                    $el.find('.link_btn_sysErrConfirm').click(function () {
                        $el.find('.popUp_sysErr').hide();
                    });

                    $el.find('.link_btn_unFinishedBillErrConfirm').click(function () {
                        $el.find('.popUp_unFinishedBillErr').hide();
                    });

                    $el.find('.link_btn_unpaidErrConfirm').click(function () {
                        var orderlisturl = 'orderlist';
                        locahost(orderlisturl, '订单列表');
                    });
                }
            });
        }

        /*新版操作end*/
        document.addEventListener('touchmove', function (event) {
            // 监听滚动事件
            if (flg === 1) {
                // 判断是遮罩显示时执行，禁止滚屏
                event.preventDefault(); // 最关键的一句，禁止浏览器默认行为
            }

        });
        $el.find('.link_btn_uncheckErrConfirm').click(function () {
            $el.find('.popUp_err').hide();
        });

        //		function showSlogonMsg(tempMoreHtml, delayTime) {
        //			var tempHtml = '<ul  id="slogonMsgId">';
        //			tempHtml += tempMoreHtml;
        //			tempHtml += '</ul>';
        //			$el.find('.slogonMsg').html(tempHtml);
        //			startmarquee(20, 2000);
        //		}

        $el.find('.link_btn_sysErrConfirm').click(function () {
            $el.find('.popUp_sysErr').hide();
        });
        $el.find('.link_btn_unFinishedBillErrConfirm').click(function () {
            $el.find('.popUp_unFinishedBillErr').hide();
        });
        $el.find('.link_btn_unpaidErrConfirm').click(function () {
            //   window.top.location.href = 'orderlist';
            $el.find('.popUp_unpaidErr').hide();
        });
        $el.find('.link_btn_uncheckErrConfirm').click(function () {
            $el.find('.popUp_uncheckErr').hide();
            $el.find('.popUp_confirm').hide();
        });

        /*暂挪去支付继续问弹窗*/
        // 希望重试
        $el.find('#still_reAsk').click(function () {
            $el.find('.popUp_confirm').hide();
            $el.find('.loadingArea').show();
            var lawyerId = this.attributes.lawyerId.nodeValue;
            // var questionType = getQuestionTypeNum(this.attributes['questionType'].nodeValue);
            var questionType = this.attributes.questiontype.nodeValue;
            continueAsk2(lawyerId, questionType, '01', $el.find('#_csrf').val());
        });
        // 咨询其他律师时
        $el.find('.link_others').click(function () {
            $el.find('.popUp_confirm').hide();
            // startConsulting(questionType);
        });
        // function startConsulting(questionType, csrfToken, lawyerId) {
        //   $.ajax({
        //     type: 'POST',
        //     //              data: {
        //     //                  questionType: questionType,
        //     //                  _csrf: csrfToken
        //     //              },
        //     url: 'greeting?questionType=' + questionType + '&_csrf=' + csrfToken,
        //     success: function(data) {
        //       if (data === 'ERROR' || data === 'ERROR1') {
        //         $el.find('#err_msg').html('系统异常，请返回重新咨询');
        //         $el.find('.popUp_sysErr').fadeIn();
        //       } else if (data === 'ERROR2') {
        //         $el.find('#err_msg').html('您有订单未支付，请支付后再咨询');
        //         $el.find('.popUp_sysErr').fadeIn();
        //       } else if (data === 'ERROR3') {
        //         $el.find('#err_msg').html('您有订单未结束，请等待1分钟后再试');
        //         $el.find('.popUp_sysErr').fadeIn();
        //       } else {
        //         if (lawyerId) {
        //           window.top.location.href = 'request?data=' + data + '&questionType=' + questionType + '&lawyerId=' + lawyerId;
        //         } else {
        //           window.top.location.href = 'request?data=' + data + '&questionType=' + questionType;
        //         }
        //       }
        //     },
        //     error: function(jqXHR) {
        //       if (jqXHR.status === 403) {
        //         window.location.reload();
        //       }
        //     }
        //   });
        // }
        // 继续问---通知律师跳转到request页面（开始咨询；confirmTel页）
        function continueAsk(lawyerId, questionType, askingType, csrfToken) {
            $.ajax({
                async: true,
                type: 'POST',
                url: hosturl + 'continueAsk?lawyerId=' + lawyerId + '&questionType=' + questionType + '&_csrf='
                    + csrfToken + '&sessionId=' + sessionId,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    if (id !== '') {
                        var requesturl = 'mipilaw66baidu_request?data='
                            + id + '&questionType=' + questionType + '&askingType='
                            + askingType + '&lawyerId=' + lawyerId;
                        locahost(requesturl, '匹配律师');
                    }
                    else {
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.popUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        }
                        else {
                            var msg = data.error;
                            $el.find('#tips').html(msg);
                            $el.find('.popUp_confirm').hide();
                            $el.find('.popUp_uncheckErr').fadeIn();
                        }
                    }
                },
                error: function (jqXHR) {
                    $el.find('.loadingArea').hide();
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }
        // 继续问---通知律师跳转到informLawyer页面（orderlist页，首页slogon）
        function continueAsk2(lawyerId, questionType, askingType, csrfToken) {
            $.ajax({
                async: true,
                type: 'POST',
                url: hosturl + 'continueAsk?lawyerId=' + lawyerId + '&questionType=' + questionType
                    + '&_csrf=' + csrfToken + '&sessionId=' + sessionId,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    localStorage.setItem('reAskAvatar', data.avatar);
                    localStorage.setItem('reAskName', data.lawyerName);
                    localStorage.setItem('reAskSex', data.sex);
                    if (id !== '') {
                        // 传入lawyerId
                        var informulr = 'mipilaw66baidu_informLawyer?data='
                            + id + '&questionType=' + questionType + '&askingType='
                            + askingType + '&lawyerId=' + lawyerId;
                        locahost(informulr, '匹配律师');
                    }
                    else {
                        $el.find('.loadingArea').hide();
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.popUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        }
                        else {
                            var msg = data.error;
                            $el.find('#tips').html(msg);
                            $el.find('.popUp_confirm').hide();
                            $el.find('.popUp_uncheckErr').fadeIn();
                        }
                    }
                },
                error: function (jqXHR) {
                    $el.find('.loadingArea').hide();
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }
        $el.find('#loading_pop').addClass('alertactivefalse');

        if (paystart) {
            $el.find('#payalert').addClass('alertactivetrue');
            //          $el.find(".payalert").show();
            //          $el.find('#payalert').show();
        }

        // continueAsk2 更改为 continueAskNew
        function continueAskNew(lawyerId, questionType, askingType, csrfToken, continueAskPage) {
            $.ajax({
                async: true,
                type: 'POST',
                url: hosturl + 'continueAskV3?lawyerId=' + lawyerId + '&questionType='
                    + questionType + '&_csrf=' + csrfToken + '&continueAskPage='
                    + continueAskPage + '&sessionId=' + sessionId,
                dataType: 'json',
                success: function (data) {
                    console.log('继续问2', data);
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    localStorage.setItem('reAskAvatar', data.avatar);
                    localStorage.setItem('reAskName', data.lawyerName);
                    localStorage.setItem('reAskSex', data.sex);
                    localStorage.setItem('lawyerField', data.lawyerField);
                    localStorage.setItem('goodCommentRate', data.goodCommentRate);
                    if (id !== '') {
                        // 传入lawyerId
                        var infourl = 'mipilaw66baidu_informLawyer?data='
                            + id + '&questionType='
                            + questionType + '&askingType=' + askingType + '&lawyerId='
                            + lawyerId + '&PABackJumpFlg=index';
                        locahost(infourl, '无人应答');
                    }
                    else {
                        if (state === 1 || state === 2) {
                            // 1.律师正在服务中 2.律师已下线
                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                            var title = '温馨提示';
                            var main = data.error + '\uFF0C您可以稍后继续问\uFF0C或由系统推荐其他律师';
                            var yes = '立刻推荐其他律师';
                            var no = '稍后继续问';
                        //							backOr(title, main, yes, no, function() {
                        //								// startConsulting(questionType);
                        //							}, function() {
                        //								$.ajax({
                        //									url: 'createContinueAskLater?lawyerId=' + lawyerId + '&questionType=' + questionType + '&_csrf=' + csrfToken,
                        //									type: 'POST',
                        //									//                                  data: {
                        //									//                                      lawyerId: lawyerId,
                        //									//                                      questionType: questionType,
                        //									//                                      _csrf: csrfToken
                        //									//                                  },
                        //									success: function(data) {
                        //										if(data === 'ERROR') {
                        //											alert('系统异常');
                        //										} else {
                        //											console.log(data);
                        //										}
                        //									},
                        //									error: function(jqXHR) {
                        //										if(jqXHR.status === 403) {
                        //											window.location.reload();
                        //										}
                        //
                        //									}
                        //								});
                        //							});
                        }
                        else {
                            var msg = data.error;
                            $el.find('#tips').html(msg);
                            $el.find('.popUp_confirm').hide();
                            $el.find('.popUp_uncheckErr').fadeIn();
                        }
                    }
                },
                error: function (jqXHR) {
                    $el.find('.loadingArea').hide();
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }

    };

    return customElement;
});
