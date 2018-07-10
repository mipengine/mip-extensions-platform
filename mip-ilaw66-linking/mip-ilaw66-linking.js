/**
 * @file mip-ilaw66-linking 组件
 * @author
 */
// linking
define(function (require) {
    var $ = require('jquery');
    // zepto不支持属性选择器type和is，所以使用jquery
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);

        /* pop.js  */

        //  封装弹窗插件
        // back弹框样式
        function PopUp(option) {
            this.init(option);
            return this;
        }

        PopUp.prototype = {
            constructor: PopUp,
            init: function (option) {
                var This = this;
                This.option = {
                    title: '弹窗标题',
                    main: '弹窗内容',
                    yes: '确定',
                    no: '取消',
                    popYes: function () {},
                    popNo: function () {}
                };
                $.extend(true, this.option, option || {});
                This.dom();
                This.bindEvent();
            },
            dom: function () {
                var This = this;
                This.body = $('body');
                var btnN = '<div class="back-leave" id="js-back-leave">' + This.option.yes + '</div>'
                    + '<div class="back-continue" id="js-back-continue">' + This.option.no + '</div>';
                if (!This.option.yes) {
                    btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
                        + This.option.no + '</div>';
                }

                This.main = '<div class="back__pop popUp" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper"></div>'
                    + '<div class="back__popLayer">'
                    + '<span>' + This.option.title + '</span>'
                    + '<span>' + This.option.main + '</span>'
                    + btnN + '</div>' + '</div>';
                This.body.append(This.main);
                This.PopUp = $el.find('.popUp');
                This.PopUp.show();
            },
            bindEvent: function () {
                var This = this;
                //  点击离开事件
                This.PopUp.on('click', '#js-back-leave', function () {
                    This.PopUp.remove();
                    This.option.popYes();
                });
                //  点击确认事件
                This.PopUp.on('click', '#js-back-continue', function () {
                    This.PopUp.remove();
                    This.option.popNo();

                });
                //  点击遮罩层事件 --- 点击不关闭，必须点按钮

                /*This.popUp.on('click', '.layer__wrapper', function () {
                    This.popUp.remove();
                })*/

            }
        };

        window.PopUp = PopUp;

        // 取消内容显示样式
        function ToastUp(option) {
            this.init(option);
            return this;
        }
        ToastUp.prototype = {
            constructor: ToastUp,
            init: function (option) {
                var This = this;
                This.option = {
                    main: '显示内容'
                };
                $.extend(true, this.option, option || {});
                This.dom();
                This.bindEvent();
            },
            dom: function () {
                var This = this;
                This.body = $('body');
                This.main = '<div class="back__pop toastUp" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper layer__wrapper__toast"></div>'
                    + '<div class="back__popLayer__toast">'
                    + '<span>' + This.option.main + '</span>'
                    + '</div>' + '</div>';
                This.body.append(This.main);
                This.ToastUp = $el.find('.toastUp');
                This.ToastUp.show();
            },
            bindEvent: function () {
                var This = this;
                //  显示内容2秒
                setTimeout(function () {
                    This.ToastUp.remove();
                }, 2000);
            }
        };

        window.ToastUp = ToastUp;

        $el.find('#btn1').on('click', function () {
            new PopUp({
                title: '温馨提示',
                main: '优惠不等人，请三思而行',
                yes: '狠心离开',
                no: '我再想想',
                popYes: function () {
                    alert('狠心离开');
                },
                popNo: function () {
                    alert('我再想想');
                }
            });
        });

        $el.find('#btn2').on('click', function () {
            new PopUp({
                title: '弹窗提醒',
                main: '如果说你真的要走',
                yes: '我真的要走',
                no: '其实我想留',
                popYes: function () {
                    alert('我先走了');
                },
                popNo: function () {
                    alert('我要留下');
                }
            });
        });

        function backOr(title, main, yes, no, sfunc, ffunc) {
            new PopUp({
                title: title,
                main: main,
                yes: yes,
                no: no,
                popYes: function (a) {
                    //  alert('离开本页');
                    sfunc.call(this, a);
                },
                popNo: function (a) {
                    //  alert('留下等待');
                    ffunc.call(this, a);
                }
            });
        }

        function toastOr(main) {
            new ToastUp({
                main: main
            });
        }

        /* linking.js*/
        var countTimeInSec = 0;
        var dateTime = new Date();
        var begin = dateTime.getHours();
        var min = dateTime.getMinutes();
        var sec = dateTime.getSeconds();
        var fromRoute = getQueryString('fromRoute');
        var channel = localStorage.getItem('channel');
        var timerRequestId = getQueryString('requestId');
        var timerQuestionType = getQueryString('questionType');
        var tel = getQueryString('tel');
        var lawyerId = getQueryString('lawyerId');
        var fromChannel = localStorage.getItem('fromChannel');
        var flag = 0;
        console.log(channel);
        console.log(fromChannel);

        //      if (window.appBridge && appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
        //          appBridge.changeWebviewTitle('等待接通');
        //      }
        $el.find('.header_block').hide();

        var wH = $el.find(window).height();
        var wW = $el.find(window).width();
        $el.find('.main_block_linking').css('height', wH + 'px');

        $el.find('#requestId').val(timerRequestId);
        $el.find('#questionType').val(getQueryString('questionType'));
        sessionStorage.setItem('matchRequestId', getQueryString('requestId'));
        sessionStorage.setItem('matchQuestionType', getQueryString('questionType'));

        var dateTime = new Date();
        var dateOrder = dateTime.getHours();
        var minOrder = dateTime.getMinutes();
        var secOrder = dateTime.getSeconds();
        var t1 = setInterval(fnDate, 1000);

        //  加载头像
        $.ajax({
            type: 'GET',
            url: 'timer',
            data: {
                id: timerRequestId,
                lawyerId: lawyerId
            },
            dataType: 'json',
            success: function (data) {
                timerRequestId = data.requestId;

                $el.find('.link_lawyerName').text(data.lawyerName);
                $el.find('.end_name').text(data.lawyerName);
                $el.find('.end_type span').text(data.lawyerField);
                sessionStorage.setItem('matchLawyerName', data.lawyerName);
                $el.find('.typeOfLawyer').text(data.lawyerField);
                // 平安1.7新增用户好评率
                $el.find('.goodCommentRate').text(data.goodCommentRate);
                sessionStorage.setItem('matchLawyerField', data.lawyerField);
                sessionStorage.setItem('goodCommentRate', data.goodCommentRate);
                //  未上传头像则选择默认头像
                if (!data.avatar) {
                    if (data.sex === 'male') {
                        $el.find('.link_avatar').attr('src', 'images/bg_touxaingnan.png');
                        $el.find('.end_avatar').attr('src', 'images/bg_touxaingnan.png');
                        sessionStorage.setItem('matchAvatar', 'images/bg_touxaingnan.png');
                    }
                    else if (data.sex === 'female') {
                        $el.find('.link_avatar').attr('src', 'images/bg_touxiangnv.png');
                        $el.find('.end_avatar').attr('src', 'images/bg_touxiangnv.png');
                        sessionStorage.setItem('matchAvatar', 'images/bg_touxiangnv.png');
                    }
                }
                else {
                    $el.find('.link_avatar').attr('src', data.avatar);
                    $el.find('.end_avatar').attr('src', data.avatar);
                    sessionStorage.setItem('matchAvatar', data.avatar);
                }
                //  判断律师领域是否一致，不匹配则不显示
                if (!data.lawyerField) {
                    $el.find('.link_lawyerType').hide();
                    $el.find('.end_type').hide();
                }

            },
            error: function (jqXHR) {
                if (jqXHR.status === 403) {
                    window.location.reload();
                }

            }
        });

        //  加载的时候显示号码
        if (tel) {
            //  加载的时候显示号码
            $el.find('.link_phone').html(tel);
        }
        else {
            backToUnusual();
        }

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
        }

        function fnDate() {
            var date = new Date();
            countTimeInSec = (date.getHours() - begin) * 3600
            + (date.getMinutes() - min) * 60 + (date.getSeconds() - sec);
            getPhoneStatus();
        }

        function getPhoneStatus() {
            var questionType = $el.find('#questionType').val();
            if (countTimeInSec % 5 === 0) {
                $.ajax({
                    type: 'GET',
                    url: 'timer',
                    data: {
                        id: timerRequestId,
                        lawyerId: lawyerId
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        localStorage.setItem('reAskAvatar', data.avatar);
                        localStorage.setItem('reAskSex', data.sex);
                        localStorage.setItem('reAskName', data.lawyerName);
                        localStorage.setItem('lawyerField', data.lawyerField);
                        localStorage.setItem('goodCommentRate', data.goodCommentRate);
                        var dataStatus = data.status;
                        timerRequestId = data.requestId;

                        //  重新显示后台返回的呼叫中心号码，防止是因律师未接电话又下了一个单，然后调用的不同的呼叫中心
                        $el.find('.link_phone').html(data.tel);

                        if (dataStatus === 3 || dataStatus === 4 || dataStatus === 7) {
                            //  弹出律师未接提示
                            clearInterval(t1);
                            if (fromRoute) {
                                wenShulawyerBusy();
                            }
                            else {
                                var id;
                                // 正常下单时出现【推荐其他律师】，再通知一次未接通时【再通知一次】操作
                                if (dataStatus === 3 || data.reCallNoAnswerTimes > 0) {
                                    window.top.location.href = 'informLawyer_failed?lawyerId='
                                    + lawyerId
                                    + '&requestId=' + timerRequestId + '&questionType=' + questionType
                                    + '&secondAskFlg=' + data.reCallNoAnswerTimes;
                                }
                                else {
                                    window.top.location.href = 'informLawyer_failed?lawyerId='
                                    + lawyerId + '&requestId=' + id + '&questionType=' + questionType
                                    + '&secondAskFlg=' + data.reCallNoAnswerTimes;
                                }
                            }
                        }
                        else {
                            if (dataStatus === 8 || dataStatus === 6 || dataStatus === 10 || dataStatus === 13) {
                                clearInterval(t1);
                                $el.find('title').html('咨询结束');
                                //                              if (window.appBridge && appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
                                //                                  appBridge.changeWebviewTitle('咨询结束');
                                //                              }
                                if (fromRoute) {
                                    window.top.location.href = 'mycardandcoupons';
                                }
                                else {
                                    settime();
                                }
                            }
                            else if (dataStatus === 5) {
                                if (flag === 0) {
                                    flag = 1;
                                    clearInterval(t1);
                                    $el.find('title').html('咨询结束');
                                    //                                  if (window.appBridge && appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
                                    //                                      appBridge.changeWebviewTitle('咨询结束');
                                    //                                  }
                                    if (fromRoute) {
                                        window.top.location.href = 'mycardandcoupons';
                                    }
                                    else {
                                        setTimeout('settime()', 15000);
                                    }
                                }
                            }
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

        function wenShulawyerBusy() {
            var title = '';
            var main = '律师正忙，尝试返回再通知一次';
            var yes = '';
            var no = '返回';
            backOr(title, main, yes, no, function () {
                // yes
            }, function () {
                // no 立即通知
                var reAskWenshuUrl = localStorage.getItem('reAskWenshuUrl');
                window.top.location.href = reAskWenshuUrl;
            });
        }

        // linking页面back键返回+informLawyer_failed页面back键返回/[我知道了]跳转
        function backToUnusual() {
            $el.find('.banner_top').hide();
            $el.find('.link_middle').hide();
            $el.find('.link_bottom').hide();
            $el.find('#pop_consulationEnd').show();
            $el.find('.outOfUnusual').show();
            $el.find('.inOfUnusual').hide();
        }

        function settime() {
            $el.find('.linkingDom').hide();
            $el.find('#pop_consulationEnd').show();
        }

        /* wenlvshi.js */
        // 强行跳转主页为https协议
        function getBaseUrl() {
            var ishttps = 'https:' === document.location.protocol ? true : false;
            var url = window.location.host;
            if (ishttps) {
                url = 'https://' + url;
            }
            else {
                url = 'http://' + url;
            }
            return url + '/jasmine/';
        }

        //  公共的
        $el.find('.backfirst-list-alt').click(function () {
            window.top.location.href = 'orderlist';
        });
        $el.find('.backfirst-home').click(function () {
            window.top.location.href = 'index.html';
        });

        $el.find('.icon_orderlist').click(function () {
            window.top.location.href = 'orderlist';
        });
        $el.find('.backfirst').click(function () {
            if (location.host === '127.0.0.1:9082' || location.host === 'localhost:9082') {
                window.history.go(-1);
            }
            else {
                window.top.location.href = getBaseUrl();
            }
        });

        //  注意事项js
        $el.find('.allow_icon,.conment_allow').click(function () {
            if ($el.find('input[name="allow"]').val()) {
                $el.find('input[name="allow"]').val('');
                $el.find('.allow_icon2').show();
                $el.find('.allow_icon1').hide();
            }
            else {
                $el.find('input[name="allow"]').val('allowed');
                $el.find('.allow_icon1').show();
                $el.find('.allow_icon2').hide();
            }
        });
        //  支付页面
        $el.find('.pay_txt').click(function () {
            var no = $el.find(this).data('no');
            $el.find('.pay_txt .allow_icon2').show();
            $el.find('.pay_txt .allow_icon1').hide();
            $el.find(this).children('.allow_icon2').hide();
            $el.find(this).children('.allow_icon1').show();
            // 将所选的支付方式放入隐藏表单
            $el.find('input[name="paytype"]').val(no);
        });
        $el.find('.btn_pay').click(function () {
            //  支付结果
            $el.find('body').scrollTop(0);
            $el.find('body').css('overflow', 'hidden');
            //  支付成功
            $el.find('.success_result').show();
            //  支付失败
            //  $el.find('.error_result').show();
            setTimeout(function () {
                //  3秒后隐藏
                //  $el.find('body').css('overflow','auto');
                $el.find('.success_result').hide();
                $el.find('.error_result').hide();
                window.top.location.href = 'conment.html';
            }, 3000);
        });

        function GetRequest() {
            // 获取url中'?'符后的字串
            var url = location.search;
            var theRequest = [];
            if (url.indexOf('?') !== -1) {
                var str = url.substr(1);
                var strs = str.split('&');
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
                }
            }

            return theRequest;
        }

        // 判断是否是微信浏览器
        function isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) === 'micromessenger') {
                return true;
            }
            else {
                return false;
            }
        }

        function getDirectUrl() {
            var currentUrl = window.top.location.href;
            var index = currentUrl.indexOf('/tulip/');
            var redirectUrl = currentUrl.substring(0, index + 7);
            return redirectUrl;
        }

        function startConsulting(questionType, csrfToken, lawyerId) {
            $.ajax({
                type: 'POST',
                url: 'greeting?questionType=' + questionType + '&_csrf=' + csrfToken,
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
                    else {
                        if (lawyerId) {
                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
                            === 'fengniao' || $el.find('#channel').val() === 'fengniao') {

                                window.top.location.href = 'request_wx?data=' + data
                                + '&questionType=' + questionType + '&lawyerId=' + lawyerId;
                            }
                            else {

                                window.top.location.href = 'request?data=' + data
                                + '&questionType=' + questionType + '&lawyerId=' + lawyerId;
                            }
                        }
                        else {

                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val()
                            === 'WxiaoApp' || fromChannel === 'fengniao' || $el.find('#channel').val() === 'fengniao') {

                                window.top.location.href = 'request_wx?data=' + data + '&questionType=' + questionType;
                            }
                            else {

                                window.top.location.href = 'request?data='
                                + data + '&questionType=' + questionType;
                            }
                        }
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }

        // 继续问---通知律师跳转到request页面（开始咨询；confirmTel页）
        function continueAsk(lawyerId, questionType, askingType, csrfToken) {
            $.ajax({
                async: true,
                type: 'POST',
                url: 'continueAsk?lawyerId=' + lawyerId + '&questionType='
                + questionType + '&_csrf=' + csrfToken,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    if (id !== '') {
                        //  传入lawyerId
                        if (fromChannel === 'WxiaoApp' || $el.find('#channel').val()
                        === 'WxiaoApp' || fromChannel
                        === 'fengniao' || $el.find('#channel').val() === 'fengniao') {
                            window.top.location.href = 'request_wx?data=' + id + '&questionType='
                            + questionType + '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                        }
                        else {
                            window.top.location.href = 'request?data=' + id + '&questionType='
                            + questionType + '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                        }
                    }
                    else {
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            var flg = true;
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
                url: 'continueAsk?lawyerId=' + lawyerId + '&questionType='
                + questionType + '&_csrf=' + csrfToken,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    localStorage.setItem('reAskAvatar', data.avatar);
                    localStorage.setItem('reAskName', data.lawyerName);
                    localStorage.setItem('reAskSex', data.sex);
                    if (id !== '') {
                        //  传入lawyerId
                        window.top.location.href = 'informLawyer?data=' + id + '&questionType='
                        + questionType + '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                    }
                    else {
                        $el.find('.loadingArea').hide();
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            var flg = true;
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

        //  continueAsk2 更改为 continueAskNew
        function continueAskNew(lawyerId, questionType, askingType, csrfToken, continueAskPage) {
            $.ajax({
                async: true,
                type: 'POST',
                url: 'continueAskV3?lawyerId=' + lawyerId + '&questionType=' + questionType + '&_csrf='
                + csrfToken + '&continueAskPage=' + continueAskPage,
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
                        //  传入lawyerId
                        window.top.location.href = 'informLawyer?data=' + id + '&questionType='
                        + questionType + '&askingType=' + askingType + '&lawyerId=' + lawyerId + '&PABackJumpFlg=index';
                    }
                    else {
                        if (state === 1 || state === 2) {
                            //  1.律师正在服务中 2.律师已下线
                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                            var title = '温馨提示';
                            var main = data.error + '，您可以稍后继续问，或由系统推荐其他律师';
                            var yes = '立刻推荐其他律师';
                            var no = '稍后继续问';
                            backOr(title, main, yes, no, function () {
                                startConsulting(questionType);
                            }, function () {
                                $.ajax({
                                    url: 'createContinueAskLater?lawyerId=' + lawyerId + '&questionType='
                                    + questionType + '&_csrf=' + csrfToken,
                                    type: 'POST',
                                    success: function (data) {
                                        if (data === 'ERROR') {
                                            alert('系统异常');
                                        }
                                        else {
                                            console.log(data);
                                        }
                                    },
                                    error: function (jqXHR) {
                                        if (jqXHR.status === 403) {
                                            window.location.reload();
                                        }

                                    }
                                });
                            });
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

        function toLogin(b) {
            var openId = $el.find('#openId').val();
            var questionType;
            $.ajax({
                url: 'leezyb/getLeezybUser',
                type: 'GET',
                data: {
                    openId: openId
                },
                success: function (data) {
                    console.log(data);
                    if (b === 'ST002') {
                        // 百度统计
                        // window._hmt && window._hmt.push(['_trackEvent', $el.find('#channel').val()+'_falvvip', 'click']);
                        window.top.location.href = 'consulting_testament';
                    }
                    else if (b === 'ST003') {
                        // 百度统计
                        // window._hmt && window._hmt.push(['_trackEvent', $el.find('#channel').val()+'_tehui', 'click']);
                        window.top.location.href = 'preferential?serviceType=' + questionType;
                    }

                },
                error: function (jqXHR) {
                    if (jqXHR === 403) {
                        window.reload();
                    }

                }
            });
        }

        /* consulationEnd,js */

        var lawyerField = sessionStorage.getItem('matchLawyerField');
        if (sessionStorage.getItem('matchLawyerField')) {
            $el.find('.end_type').find('span').text(lawyerField);
        }

        $el.find('.js-gotoPay').on('click', function () {
            //  点击去支付按钮
            // 调用接口判断合并支付，传递requestId
            checkTalking(timerRequestId, timerQuestionType);
        });
        $el.find('.outOfUnusual').show();
        $el.find('.inOfUnusual').hide();

        //  通话异常按钮事件
        $el.find('.end_unusual').on('click', function () {
            // 百度统计
            // window._hmt && window._hmt.push(['_trackEvent', 'telUnusual', 'click']);
            $el.find('.pop_unusual').show();
        });
        //  点击遮罩层事件
        $el.find('.unusual_wrapper').on('click', function () {
            $el.find('.pop_unusual').hide();
        });

        //  意外掉线
        $el.find('.type_dropline').on('click', function () {
            // 百度统计
            // window._hmt && window._hmt.push(['_trackEvent', 'lineUnusual', 'click']);
            $el.find('.pop_unusual').hide();
            $el.find('.outOfUnusual').hide();
            $el.find('.inOfUnusual').show();
        });
        //  没有电话打进
        $el.find('.type_nocall').on('click', function () {
            // 百度统计
            // window._hmt && window._hmt.push(['_trackEvent', 'noCall', 'click']);
            window.top.location.href = 'confirmTel?requestId=' + timerRequestId
            + '&questionType=' + timerQuestionType;
        });
        //  取消
        $el.find('.type_cancell').on('click', function () {
            $el.find('.pop_unusual').hide();
        });

        //  重新呼叫
        $el.find('.outGotoPay__recall').on('click', function () {
            // 百度统计
            // window._hmt && window._hmt.push(['_trackEvent', 'recall', 'click']);
            //  不调用checkTalkingOrder接口，在continueAsk里面判断4的状态
            $.ajax({
                type: 'POST',
                url: 'continueAsk?lawyerId=' + getQueryString('lawyerId') + '&questionType='
                + timerQuestionType + '&_csrf=' + $el.find('#_csrf').val() + '&source=1',
                success: function (data) {
                    console.log(data);
                    var id = data.data;
                    if (id !== '') {
                        window.top.location.href = 'informLawyer?data=' + id + '&questionType='
                        + timerQuestionType + '&lawyerId=' + getQueryString('lawyerId') + '&PABackJumpFlg=linking';
                    }
                    else {
                        // for test need delete
                        //  data.state = 4;
                        if (data.state === 5) {
                            backOr('温馨提示', data.error, '', '去支付', function () {}, function () {
                                window.top.location.href = 'order?requestId=' + timerRequestId
                                + '&questionType=' + timerQuestionType;
                            });
                        }
                        else if (data.state === 4) {
                            // 表示您和律师还在通话中，请咨询结束后，再支付律师辛苦费
                            toastOr(data.error);
                        }
                        else {
                            backOr('温馨提示', data.error, '', '确定', function () {}, function () {});
                        }
                    }
                },
                error: function () {
                    window.location.reload();
                }
            });
        });

        function checkTalking(checkRequestId, questionType) {
            $.ajax({
                type: 'GET',
                url: 'checkTalkingOrder',
                data: {
                    requestId: checkRequestId
                },
                success: function (data) {
                    console.log(data);

                    var state = data.result.state;
                    //  state = 6;
                    //  for test need delete
                    if (state === '6') {
                        toastOr('通话不足60秒，无需支付');
                        setTimeout(function () {
                            window.top.location.href = 'orderlist';
                        }, 2000);
                    }
                    else if (state === '4') {
                        toastOr(data.result.error);
                        localStorage.setItem('linkingOrding', 'linkingOrding');
                    }
                    else {
                        $.ajax({
                            type: 'get',
                            url: 'getRequestId',
                            data: {
                                requestId: checkRequestId
                            },
                            async: false,
                            success: function (data) {
                                console.log('是否合并支付单号：' + data);
                                window.top.location.href = 'couponPay?requestId='
                                + data + '&questionType=' + questionType;
                                localStorage.setItem('linkingOrding', 'linkingOrdingGone');
                            },
                            error: function () {
                                window.location.reload();
                            }
                        });
                    }
                },
                error: function () {
                    window.location.reload();
                }
            });
        }
    };

    return customElement;
});
