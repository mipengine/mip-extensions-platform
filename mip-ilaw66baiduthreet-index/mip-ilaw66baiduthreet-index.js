/**
 * @file mip-ilaw66baiduthreet-index 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    //  var $ = require('jquery');
    var customElement = require('customElement').create();
    var viewer = require('viewer');

    /**
   * 备注：部分地方存在全局选择因为部分地方规则限定
   */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var $el = $(this.element);
        var questionType;
        var tabHref;
        var lawyerId = '';
        var flg = 0;
        var qSt = getQueryString('questionType');
        var search = location.search.toLowerCase();
        var channel = $el.find('#channel').val();
        var userId = $el.find('#userId').val();
        var sessionId = 0;
        var MIP = window.MIP;
        var clicksstart = true;
        var thisurls = window.location.href;
        var loginsessionId = 0;
        //      setTimeout(function () {
        //          sessionId = $el.find('#sesiid').html();
        //          console.log(sessionId);
        //      }, 1000);

        //      var els= $el.find('my-lightbox');
        //       viewer.eventAction.execute('toggle', els , {});

        if (sessionStorage.getItem('ishomeorder')) {
            sessionStorage.clear('ishomeorder');
        }

        var isloginpage = sessionStorage.getItem('taplogin') ? sessionStorage.getItem('taplogin') : 0;

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
        //      console.log(hosturl);
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

                if (isloginpage === 0) {
                    var qusttype = localStorage.getItem('baiduquestionType');
                    var tzurl = 'mipilaw66baidu_login?channel=baidusearch&sessionId='
                        + sessid + '&questionType=' + qusttype;
                    locahost(tzurl, '准备咨询');
                }
                else {
                    loginsessionId = sessid;
                }
            }
            else {
                //              console.log('登录成功');
                sessionId = sessid;
                isloginf = true;
                isloginpage = 0;
                if (sessionStorage.getItem('taplogin')) {
                    sessionStorage.removeItem('taplogin');
                }

                var sesidtypes = localStorage.getItem('baiduquestionType');
                if (sesidtypes) {
                    localStorage.removeItem('baiduquestionType');
                    startConsulting(sesidtypes);
                }

                bannerusernum();
            }
        });

        this.addEventAction('error', function (event) {
            //          console.log('登录错误');
        });

        setTimeout(function () {
            if (!isloginf) {
                bannerusernum();
            }

        }, 2000);

        function getQueryString(name) {
            var reg = new RegExp('(^|&)'
                + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
        }

        $el.find('.headerright').click(function () {
            if (!userId) {
                sessionStorage.setItem('ishomeorder', '1');
            }

        });

        // 公共
        var flg = 0;
        // 滚屏控制 有弹出层出现 不可滚动
        function controlScroll() {
            flg = $el.find('.background_kuang').css('display') !== 'none' ? 1 : 0;
        }
        $(window).scroll(function (a) {
            controlScroll();
            if (flg === 1) {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }

            a.stopPropagation();
        });
        document.addEventListener('touchmove', function (event) {
            controlScroll();
            if (flg === 1) {
                if (document.all) {
                    window.event.returnValue = false;
                }
                else {
                    event.preventDefault();
                }
            }

        });

        function haveNoPaidOrder(b) {
            $el.find('#topay').click(function () {
                var a = false;
                var d = '';
                $.ajax({
                    async: false,
                    type: 'GET',
                    data: {
                        requestIdList: b.requestId,
                        sessionId: sessionId
                    },
                    url: hosturl + 'checkFreeBill',
                    success: function (c) {
                        if (c.result === 2) {
                            a = true;
                            d = c.message;
                        }

                    },
                    error: function (c) {
                        if (c.status === 403) {
                            window.location.reload();
                        }

                    }
                });
                if (a) {
                    //                  toastOr(d);
                    setTimeout(function () {
                        window.location.reload();
                    },
                        2e3);
                }
                else {
                    $.ajax({
                        type: 'get',
                        url: hosturl + 'getRequestId',
                        data: {
                            requestId: b.requestId,
                            sessionId: sessionId
                        },
                        async: false,
                        success: function (data) {
                            //                          console.log('是否合并支付单号：' + data);
                            var urls = 'mipilaw66baidu_couponPay?requestId='
                                + data + '&questionType=' + b.questionType + '&sessionId=' + sessionId;
                            locahost(urls, '支付详情');
                        },
                        error: function () {
                            window.location.reload();
                        }
                    });
                }
            });
        }

        $el.find('.tab-content__close').click(function () {
            $(this).parent().parent().removeClass().addClass('tab-pane');
            if (localStorage.getItem('baiduquestionType')) {
                localStorage.removeItem('baiduquestionType');
            }

        });

        //      $el.find('.consulting').click(function () {
        //          var questionType = $(this).data('type');
        //          localStorage.setItem('baiduquestionType', questionType);
        //          statistics(8, thisurls, questionType);
        //          if (sessionId !== 0) {
        //              startConsulting(questionType);
        //          }
        //
        //      });

        $el.find('.link_confirm').click(function (event) {
            //          $el.find('.popUp_sysErr').hide();
            $el.find('.alertbox').removeClass('alertactive');
        });

        function directOrOrder(questionType) {
            window.top.location.href = 'baidusearch/authorize?questionType='
                + questionType
                + '&urlstring=mipilaw66baidu_request';
        }
        var tabHref;

        // 调用banner状态
        function bannerusernum() {

            $.ajax({
                url: hosturl + 'getOrderCount?sessionId=' + sessionId,
                type: 'GET',
                timeout: 10000, // 超时时间设置，单位毫秒
                dataType: 'json',
                success: function (a) {
                    //                     console.log(a);
                    var rvFlg = false;
                    if (!a) {
                        return;
                    }

                    var b;
                    if (a.RQ) {
                        b = a.RQ;

                        /*slogon部位内容start*/
                        var lawyerId = b.lawyerId;
                        var questionType = b.questionType;
                        var pathnamePage = location.pathname;
                        var timestamp3;

                        if (a.RV) {
                            rvFlg = true;
                            timestamp3 = a.RV.reservationTimeString;
                        }

                        if (pathnamePage.indexOf('articleNav') < 1) { // 首页加载视频时
                            var tempMoreHtml = '';
                            tempMoreHtml += '<li><div class="total_user">'
                                + '<mip-img src="tempbaidu/images/bab.png"></mip-img>'
                                + '累计服务人数&nbsp;<i class="userTotalNum">'
                                + numtransform(b.countAll) + ' </i> 人</div></li>';
                            tempMoreHtml += '<li><div class="total_user">'
                                + '<mip-img src="tempbaidu/images/bab.png"></mip-img>'
                                + '今日咨询人数&nbsp;<i class="userTodayNum">'
                                + numtransform(b.countToday) + ' </i> 人 </div></li>';
                            showSlogonMsg(tempMoreHtml, 2000);
                            var tempHtml = '<ul>';
                            if (b.payState === 6) { // 咨询过，欠费的用户
                                tempHtml += '<li><div class="topay">'
                                    + '<mip-img src="tempbaidu/images/paytipicon.png"></mip-img>'
                                    + '您有一个订单未支付<p id="topay">去支付</p></div></li>';
                            }

                            if (rvFlg) {
                                tempHtml += '<li><div class="tocheckreservation">'
                                    + '<mip-img src="tempbaidu/images/paytipicon.png"></mip-img>您预约了'
                                    + timestamp3 + '的咨询<p id="tocheckreservation">查看预约</p></div></li>';
                            }

                            if (b.payState === 6 || rvFlg) {
                                tempHtml += '</ul>';
                                $el.find('.slogonMsg').addClass('slogonMsg_new');
                                $el.find('.userinteractive, .headerbf').show();
                                $el.find('.userinteractive').html(tempHtml);
                                //                                  }
                                haveNoPaidOrder(b);
                            }

                            $el.find('#tocheckreservation').click(function () {
                                checkReservationExpired();
                            });
                        }
                    }

                    /*slogon部位内容end*/
                },
                error: function (a) {
                    //                  console.log('获取访问人数：' + a.countAll);
                }
            });
        }
        //  初始化首页价格

        $.ajax({
            url: hosturl + 'getPrice?channel=' + $el.find('#channel').val() + '&sessionId=' + sessionId,
            type: 'GET',
            success: function (data) {
                //              console.log(data);
                if (data.code === 200) {
                    $el.find('.indexPrice').text(data.result);
                    sessionStorage.setItem('productPrice', data.result);
                }

            },
            error: function (jqXHR) {
                if (jqXHR.status === 403) {
                    window.reload();
                }

            }
        });
        //
        var agreeImgSrc = $el.find('.radio-rule').find('img').attr('src');
        $el.find('.tab-content__close').on('click', function () {
            $(this).parent().parent().removeClass().addClass('tab-pane');
            flg = 0;
        });

        $el.find('.media').on('click', function (event) {
            tabHref = $(this).data('href');
            var questionTypes = $(this).data('type');

            localStorage.setItem('baiduquestionType', questionTypes);
            //          $el.find('#' + $(this).data('href')).removeClass().addClass('tab-pane active');

            if (isloginpage) {
                statistics(8, 'tologin', questionTypes);
                var tzurl = 'mipilaw66baidu_login?channel=baidusearch&sessionId='
                    + loginsessionId + '&questionType=' + questionTypes;
                locahost(tzurl, '准备咨询');
            }
            else {
                statistics(8, 'order', questionTypes);
            }

            if (sessionId !== 0) {
                startConsulting(questionTypes);
            }

            flg = 1;

            event.preventDefault();
        });

        /*新版操作end*/
        document.addEventListener('touchmove', function (event) { // 监听滚动事件
            if (flg === 1) { // 判断是遮罩显示时执行，禁止滚屏
                event.preventDefault(); // 最关键的一句，禁止浏览器默认行为
            }

        });

        $el.find('.link_btn_uncheckErrConfirm').click(function () {
            $el.find('.popUp_err').hide();
        });

        function showSlogonMsg(tempMoreHtml, delayTime) {
            var tempHtml = '<ul  id="slogonMsgId">';
            tempHtml += tempMoreHtml;
            tempHtml += '</ul>';
            $el.find('.slogonMsg').html(tempHtml);
            startmarquee(20, 2000);
        }
        // 上下轮播
        function startmarquee(speed, delay) {
            //          var lineH = ($el.find('#slogonMsgId li').eq(0).height()) *2; // 获取行高
            var lineH = 40; // 获取行高
            var p = false;
            var t;
            var o = document.getElementById('slogonMsgId');
            if (!o) {
                return;
            }

            o.innerHTML += o.innerHTML;
            o.style.marginTop = 0;

            function start() {
                t = setInterval(scrolling, speed);
                if (!p) {
                    o.style.marginTop = parseInt(o.style.marginTop, 10) - 1 + 'px';
                }
            }

            function scrolling() {
                if (parseInt(o.style.marginTop, 10) % lineH !== 0) {
                    o.style.marginTop = parseInt(o.style.marginTop, 10) - 1 + 'px';
                    if (Math.abs(parseInt(o.style.marginTop, 10)) >= o.scrollHeight / 2) {
                        o.style.marginTop = 0;
                    }
                }
                else {
                    clearInterval(t);
                    setTimeout(start, delay);
                }
            }
            setTimeout(start, delay);
        }

        // $el.find('#alertconten').addClass('alertactive');
        // 开始咨询调用接口
        function startConsulting(questionType) {
            var ajaxdatas = {};
            ajaxdatas.questionType = questionType;
            ajaxdatas._csrf = $el.find('#_csrf').val();
            ajaxdatas.channel = 'baidusearch';
            ajaxdatas.sessionId = sessionId;
            $.ajax({
                url: hosturl + 'greeting2',
                type: 'post',
                async: true,
                data: ajaxdatas,
                //              cache:false,
                //              dataType: 'txt',
                //              global:false,
                //              crossDomain: true,
                //    		    contentType: "application/json", // POST时必须
                timeout: 5000, // 超时时间设置，单位毫秒
                success: function (datas) {
                    var datas = datas.data;
                    clicksstart = true;
                    if (localStorage.getItem('baiduquestionType')) {
                        localStorage.removeItem('baiduquestionType');
                    }

                    if (datas === 'ERROR' || datas === 'ERROR1') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        //                      $el.find('.popUp_sysErr').addClass('alertactive');
                        $el.find('#alertconten').addClass('alertactive');
                    }
                    else if (datas === 'ERROR2') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        //   $el.find('.popUp_unpaidErr').show();alertactive
                        $el.find('#payalert').addClass('alertactive');
                    }
                    else if (datas === 'ERROR3') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        //                      $el.find('.popUp_unFinishedBillErr').addClass('alertactive');
                        $el.find('#alertBillErr').addClass('alertactive');
                    }
                    else if (datas === 'ERROR4') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        $el.find('#messagecontem').text('您今日取消咨询已达3次，请明天再来');
                        $el.find('#payalert').addClass('alertactive');
                    }
                    else {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
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
        // 预约咨询
        function checkReservationExpired() {
            $.ajax({
                type: 'GET',
                url: hosturl + 'reservation/findRequestReservationByUserId?sessionId=' + sessionId,
                success: function (data) {
                    //                  console.log(data);
                    if (data.info) {
                        var myreservationurl = 'mipilaw66baidu_myreservation?sessionId=' + sessionId;
                        locahost(myreservationurl, '我的预约');
                    }
                    else {
                        //     toastOr(data.message);
                    }
                },
                error: function (a) {
                    alert('系统异常，请稍后再试');
                    window.location.reload();
                }
            });
        }

        function statistics(userTrack, entrance, description) {
            var datas = {};
            datas.userTrack = userTrack;
            datas.entrance = entrance;
            datas.description = description;
            datas.channel = 'baidusearch';
            datas._csrf = $el.find('#_csrf').val();
            $.ajax({
                type: 'post',
                url: hosturl + 'addUserTrack',
                data: datas,
                success: function (data) {
                    //                  console.log(data);
                },
                error: function (a) {
                    //                  window.location.reload();
                }
            });
        }

        function numtransform(str) {
            var newStr = new Array(str.length + parseInt(str.length / 3, 10));
            var strArray = str.split('');
            newStr[newStr.length - 1] = strArray[strArray.length - 1];
            var currentIndex = strArray.length - 1;
            for (var index = newStr.length - 1; index >= 0; index--) {
                if ((newStr.length - index) % 4 === 0) {
                    newStr[index] = ',';
                }
                else {
                    newStr[index] = strArray[currentIndex--];
                }
            }
            var numafter = newStr.join('');
            if (numafter.indexOf(',') === 0) {
                numafter = numafter.substring(1, numafter.length);
            }

            return numafter;
        }

        $el.find('.link_btn_sysErrConfirm').click(function () {
            //          $el.find('.popUp_sysErr').hide();
            $el.find('#alertconten').removeClass('alertactive');
        });

        $el.find('.link_btn_unFinishedBillErrConfirm').click(function () {
            //          $el.find('.popUp_unFinishedBillErr').hide();
            $el.find('#alertBillErr').removeClass('alertactive');
        });

        $el.find('.link_btn_unpaidErrConfirm').click(function () {
            //   window.top.location.href = 'orderlist';
            $el.find('#payalert').hide();
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
            continueAsk2(lawyerId, questionType, '01', $el.find('#_csrf').val());
        });
        // 咨询其他律师时
        $el.find('.link_others').click(function (event) {
            $el.find('.popUp_confirm').hide();
            //          startConsulting(questionType);

            //          viewer.eventAction.execute('tap','my-lightbox.toggle',{});
        });

        // 继续问---通知律师跳转到request页面（开始咨询；confirmTel页）
        function continueAsk(lawyerId, questionType, askingType, csrfToken) {
            $.ajax({
                async: true,
                type: 'POST',
                url: hosturl + 'continueAsk?lawyerId=' + lawyerId + '&questionType='
                    + questionType + '&_csrf=' + csrfToken + '&sessionId=' + sessionId,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    if (id !== '') {
                        var jxrequesturl = 'mipilaw66baidu_request?data='
                            + id + '&questionType=' + questionType + '&askingType='
                            + askingType + '&lawyerId=' + lawyerId + '&sessionId=' + sessionId;
                        locahost(jxrequesturl, '继续问');
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
                url: hosturl + 'continueAsk?lawyerId=' + lawyerId + '&questionType='
                    + questionType + '&_csrf=' + csrfToken + '&sessionId=' + sessionId,
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
                        var informlawyer = 'mipilaw66baidu_informLawyer?data='
                            + id + '&questionType=' + questionType + '&askingType='
                            + askingType + '&lawyerId=' + lawyerId + '&sessionId=' + sessionId;
                        locahost(informlawyer, '律师未回应');
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
                    //                  console.log('继续问2', data);
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
                            + id + '&questionType=' + questionType + '&askingType='
                            + askingType + '&lawyerId=' + lawyerId + '&PABackJumpFlg=index&sessionId=' + sessionId;
                        locahost(infourl, '律师未回应');
                    }
                    else {
                        if (state === 1 || state === 2) { // 1.律师正在服务中 2.律师已下线
                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                            var title = '温馨提示';
                            var main = data.error + '，您可以稍后继续问，或由系统推荐其他律师';
                            var yes = '立刻推荐其他律师';
                            var no = '稍后继续问';
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
