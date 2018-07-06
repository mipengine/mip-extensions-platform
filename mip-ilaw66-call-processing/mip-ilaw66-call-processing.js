/**
 * @file mip-ilaw66-call-processing 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
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
        var appBridge = null;

        if (window.appBridge && appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
            appBridge.changeWebviewTitle('等待接通');
        };
        $el.find('.header_block').hide();

        var wH = $(window).height();
        var wW = $(window).width();
        $el.find('.main_block_linking').css('height', wH + 'px');

        $el.find('#requestId').val(timerRequestId);
        $el.find('#questionType').val(getQueryString('questionType'));
        sessionStorage.setItem('matchRequestId', getQueryString('requestId'));
        sessionStorage.setItem('matchQuestionType', getQueryString('questionType'));

        var dateTime = new Date();
        var dateOrder = dateTime.getHours();
        var minOrder = dateTime.getMinutes();
        var secOrder = dateTime.getSeconds();
        var t1 = setInterval(fnDate(), 1000);

        //   加载头像
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
                $el.find('.goodCommentRate').text(data.goodCommentRate);
                //  平安1.7新增用户好评率
                sessionStorage.setItem('matchLawyerField', data.lawyerField);
                sessionStorage.setItem('goodCommentRate', data.goodCommentRate);
                //   未上传头像则选择默认头像
                if (!data.avatar) {
                    if (data.sex === 'male') {
                        $el.find('.link_avatar').attr('src', 'images/bg_touxaingnan.png');
                        $el.find('.end_avatar').attr('src', 'images/bg_touxaingnan.png');
                        sessionStorage.setItem('matchAvatar', 'images/bg_touxaingnan.png');
                    } else if (data.sex === 'female') {
                        $el.find('.link_avatar').attr('src', 'images/bg_touxiangnv.png');
                        $el.find('.end_avatar').attr('src', 'images/bg_touxiangnv.png');
                        sessionStorage.setItem('matchAvatar', 'images/bg_touxiangnv.png');
                    }
                } else {
                    $el.find('.link_avatar').attr('src', data.avatar);
                    $el.find('.end_avatar').attr('src', data.avatar);
                    sessionStorage.setItem('matchAvatar', data.avatar);
                }
                //   判断律师领域是否一致，不匹配则不显示
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

        //   加载的时候显示号码
        if (tel) {
            //   加载的时候显示号码
            $el.find('.link_phone').html(tel);
        } else {
            backToUnusual();
        }

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null;
            }

        }
        //  封装弹窗插件
        //  back弹框样式
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
                var btnN = '<div class="back-leave" id="js-back-leave">' + This.option.yes
+ '</div>' + '<div class="back-continue" id="js-back-continue">'
+ This.option.no + '</div>';
                if (!This.option.yes) {
                    btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
+ This.option.no + '</div>';
                }
                This.main = '<div class="back__pop PopUp" id="back__pop">'
+ '<div class="layer__wrapper"></div>' + '<div class="back__popLayer">' + '<span>'
+ This.option.title + '</span>' + '<span>' + This.option.main + '</span>' + btnN + '</div>' + '</div>';
                This.body.append(This.main);
                This.PopUp = $('.PopUp');
                This.PopUp.show();
            },
            bindEvent: function () {
                var This = this;
                //  点击离开事件
                This.PopUp.on('click', '#js-back-leave',
                function () {
                    This.PopUp.remove();
                    This.option.popYes();
                });
                //  点击确认事件
                This.PopUp.on('click', '#js-back-continue',
                function () {
                    This.PopUp.remove();
                    This.option.popNo();

                });
                //  点击遮罩层事件 --- 点击不关闭，必须点按钮
                /*This.PopUp.on('click', '.layer__wrapper', function  () {
						    This.PopUp.remove();
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
                This.main = '<div class="back__pop ToastUp" id="back__pop">'
+ '<div class="layer__wrapper layer__wrapper__toast"></div>' + '<div class="back__popLayer__toast">'
+ '<span>' + This.option.main + '</span>' + '</div>' + '</div>';
                This.body.append(This.main);
                This.ToastUp = $('.ToastUp');
                This.ToastUp.show();
            },
            bindEvent: function () {
                var This = this;
                //  显示内容2秒
                setTimeout(function () {
                    This.ToastUp.remove();
                },
                2000);
            }
        };

        window.ToastUp = ToastUp;

        $('#btn1').on('click',
        function () {
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

        $('#btn2').on('click',
        function () {
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

                        //   重新显示后台返回的呼叫中心号码，防止是因律师未接电话又下了一个单，然后调用的不同的呼叫中心
                        $el.find('.link_phone').html(data.tel);

                        if (dataStatus === 3 || dataStatus === 4 || dataStatus === 7) {
                            //   弹出律师未接提示
                            clearInterval(t1);
                            if (fromRoute) {
                                wenshulawyerBusy();
                            } else {
                                //  正常下单时出现【推荐其他律师】，再通知一次未接通时【再通知一次】操作
                                if (dataStatus === 3 || data.reCallNoAnswerTimes > 0) {
                                    window.top.location.href = 'informLawyer_failed?lawyerId=' + lawyerId
 + '&requestId=' + timerRequestId + '&questionType='
 + questionType + '&secondAskFlg=' + data.reCallNoAnswerTimes;
                                } else {
                                    window.top.location.href = 'informLawyer_failed?lawyerId=' + lawyerId
+ '&requestId=' + '&questionType=' + questionType
+ '&secondAskFlg=' + data.reCallNoAnswerTimes;
                                }
                            }
                        } else {
                            if (dataStatus === 8 || dataStatus === 6 || dataStatus === 10 || dataStatus === 13) {
                                clearInterval(t1);
                                $el.find('title').html('咨询结束');
                                if (window.appBridge && appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
                                    appBridge.changeWebviewTitle('咨询结束');
                                };
                                if (fromRoute) {
                                    window.top.location.href = 'mycardandcoupons';
                                } else {
                                    settime();
                                }
                            } else if (dataStatus === 5) {
                                if (flag === 0) {
                                    flag = 1;
                                    clearInterval(t1);
                                    $el.find('title').html('咨询结束');
                                    if (window.appBridge && appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
                                        appBridge.changeWebviewTitle('咨询结束');
                                    };
                                    if (fromRoute) {
                                        window.top.location.href = 'mycardandcoupons';
                                    } else {
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

        function wenshulawyerBusy() {
            var title = '';
            var main = '律师正忙，尝试返回再通知一次';
            var yes = '';
            var no = '返回';
            backOr(title, main, yes, no,
            function () {
                //  yes
            },
            function () {
                //  no 立即通知
                var reAskWenshuUrl = localStorage.getItem('reAskWenshuUrl');
                window.top.location.href = reAskWenshuUrl;
            });
        }

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
        //  linking页面back键返回+informLawyer_failed页面back键返回/[我知道了]跳转
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

        var lawyerField = sessionStorage.getItem('matchLawyerField');
        if (sessionStorage.getItem('matchLawyerField')) {
            $el.find('.end_type').find('span').text(lawyerField);
        }

        $el.find('.js-gotoPay').on('click',
        function () {
            //   点击去支付按钮
            //  调用接口判断合并支付，传递requestId
            checkTalking(timerRequestId, timerQuestionType);
        });
        $el.find('.outOfUnusual').show();
        $el.find('.inOfUnusual').hide();

        //   点击遮罩层事件
        $el.find('.unusual_wrapper').on('click',
        function () {
            $el.find('.pop_unusual').hide();
        });

        //   取消
        $el.find('.type_cancell').on('click',
        function () {
            $el.find('.pop_unusual').hide();
        });

        //   重新呼叫
        $el.find('.outGotoPay__recall').on('click',
        function () {
            //   不调用checkTalkingOrder接口，在continueAsk里面判断4的状态
            $.ajax({
                type: 'POST',
                url: 'continueAsk',
                data: {
                    lawyerId: getQueryString('lawyerId'),
                    questionType: timerQuestionType,
                    csrf: $el.find('#csrf').val(),
                    source: '1'
                    //   2为免费的继续问
                },
                success: function (data) {
                    console.log(data);
                    var id = data.data;
                    if (id !== '') {
                        window.top.location.href = 'informLawyer?data=' + id + '&questionType='
+ timerQuestionType + '&lawyerId=' + getQueryString('lawyerId')
+ '&PABackJumpFlg=linking';
                    } else {
                        //   data.state = 4;//  for test need delete
                        if (data.state === 5) {
                            backOr('温馨提示', data.error, '', '去支付',
                            function () {},
                            function () {
                                window.top.location.href = 'order?requestId='
+ timerRequestId + '&questionType=' + timerQuestionType;
                            });
                        } else if (data.state === 4) {
                            //  表示您和律师还在通话中，请咨询结束后，再支付律师辛苦费
                            toastOr(data.error);
                        } else {
                            backOr('温馨提示', data.error, '', '确定',
                            function () {},
                            function () {});
                        }
                    }
                },
                error: function () {
                    window.location.reload();
                }
            });
        });

        function toastOr(main) {
            new ToastUp({
                main: main
            });
        }

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
                    //   state = 6;//   for test need delete
                    if (state === '6') {
                        toastOr('通话不足60秒，无需支付');
                        setTimeout(function () {
                            window.top.location.href = 'orderlist';
                        },
                        2000);
                    } else if (state === '4') {
                        toastOr(data.result.error);
                        localStorage.setItem('linkingOrding', 'linkingOrding');
                    } else {
                        $.ajax({
                            type: 'get',
                            url: 'getRequestId',
                            data: {
                                requestId: checkRequestId
                            },
                            async: false,
                            success: function (data) {
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
