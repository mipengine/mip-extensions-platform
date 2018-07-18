/**
 * @file mip-ilaw66-baidu-linking 组件
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

        function PopUp(option) {
            this.init(option);
            return this;
        }

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
                var btnN = '<div class="back-leave" id="js-back-leave">'
                    + This.option.yes + '</div>' + '<div class="back-continue" id="js-back-continue">'
                    + This.option.no + '</div>';
                if (!This.option.yes) {
                    btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
                        + This.option.no + '</div>';
                }

                This.main = '<div class="back__pop popUP" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper"></div>' + '<div class="back__popLayer">' + '<span>'
                    + This.option.title + '</span>' + '<span>' + This.option.main
                    + '</span>' + btnN + '</div>' + '</div>';
                This.body.append(This.main);
                This.PopUp = $el.find('.popUP');
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

                /*This.PopUp.on('click', '.layer__wrapper', function () {
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
                This.main = '<div class="back__pop ToastUp" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper layer__wrapper__toast"></div>'
                    + '<div class="back__popLayer__toast">' + '<span>'
                    + This.option.main + '</span>' + '</div>' + '</div>';
                This.body.append(This.main);
                This.ToastUp = $el.find('.ToastUp');
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

        function backOr(f, a, e, d, c, b) {
            new PopUp({
                title: f,
                main: a,
                yes: e,
                no: d,
                popYes: function (g) {
                    c.call(this, g);
                },
                popNo: function (g) {
                    b.call(this, g);
                }
            });
        }

        function toastOr(a) {
            new ToastUp({
                main: a
            });
        }

        var countTimeInSec = 0;
        var dateTime = new Date();
        var begin = dateTime.getHours();
        var min = dateTime.getMinutes();
        var sec = dateTime.getSeconds();
        var fromRoute = getQueryString('fromRoute');
        var lawyerId = getQueryString('lawyerId');
        var tel = getQueryString('tel');
        var timerRequestId = getQueryString('requestId');
        var timerQuestionType = getQueryString('questionType');
        var flag = 0;
        var isback = true;
        $el.find('#requestId').val(timerRequestId);
        $el.find('#questionType').val(timerQuestionType);
        var t1 = setInterval(function () {
            fnDate();
        }, 1000);

        getInfo(); // 加载头像等

        /*

                var temp = {
                    avatar: 'http://images.ilaw66.com/images/authorize/banner_new_first.png',
                    lawyerName: '某律师',
                    lawyerField: '婚姻家庭',
                    serviceTimes: 2541,
                    lightStar: [0,0,0],
                    grayStar: [0,0],
                    authorizedNo: '13101xxxX0862612'
                };
                // var tp = document.getElementById('mip-template-content');
                // var tpdone = document.getElementById('mip-template-contentdone');
                var tp = $el.find('#mip-template-content');
                var tpdone = $el.find('#mip-template-contentdone');
                templates.render(tp, temp).then(function (html) {
                    tp.innerHTML = html;
                });
                templates.render(tpdone, temp).then(function (html) {
                    tpdone.innerHTML = html;
                });
        */

        if (tel) {
            // 加载的时候显示号码
            $el.find('.link_phone span').html(tel);
        }
        else {
            backToUnusual();
        }

        $el.find('.outOfUnusual').show();
        $el.find('.inOfUnusual').hide();
        $el.find('.glyphicon').click(function () {
            cancelRequestOr();
        });
        $el.find('.js-gotoPay').click(function () { // 点击去支付按钮
            // 调用接口判断合并支付，传递requestId
            checkTalking(timerRequestId, timerQuestionType);
        });

        $el.find('.end_unusual').click(function () { // 通话异常按钮事件
            // window._hmt && window._hmt.push(['_trackEvent', "telUnusual", 'click']);
            $el.find('.pop_unusual').show();
        });
        $el.find('.unusual_wrapper').click(function () { // 点击遮罩层事件
            $el.find('.pop_unusual').hide();
        });
        $el.find('.type_dropline, .type_nocall, .type_disconnect').click(function () {
            toastOr('感谢反馈，我们会尽快改进服务');
            setTimeout(function () {
                window.top.location.href = './';
            }, 2000);
        });
        $el.find('.type_cancell').click(function () { // 取消
            $el.find('.pop_unusual').hide();
        });

        function getInfo() {
            $.ajax({
                type: 'GET',
                url: 'timer?id=' + timerRequestId + '&lawyerId=' + lawyerId,
                dataType: 'json',
                success: function (data) {
                    timerRequestId = data.requestId;
                    // 未上传头像则选择默认头像
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
                    var temp = {
                        avatar: data.avatar,
                        lawyerName: data.lawyerName,
                        lawyerField: data.lawyerField,
                        serviceTimes: data.serviceTimes,
                        lightStar: data.lightStar,
                        grayStar: data.grayStar,
                        authorizedNo: data.authorizedNo
                    };
                    var templates = require('templates');
                    var tp = $el.find('#mip-template-content');
                    var tpdone = $el.find('#mip-template-contentdone');
                    templates.render(tp, temp).then(function (html) {
                        tp.innerHTML = html;
                    });
                    templates.render(tpdone, temp).then(function (html) {
                        tpdone.innerHTML = html;
                    });
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
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
        function fnDate() {
            var date = new Date();
            countTimeInSec = (date.getHours() - begin) * 3600
                + (date.getMinutes() - min) * 60 + (date.getSeconds() - sec);
            getPhoneStatus();
        }
        function getPhoneStatus() {
            var questionType = $el.find('#questionType').val();
            var askingType = $el.find('#askingType').val();

            if (countTimeInSec % 5 === 0) {
                $.ajax({
                    type: 'GET',
                    url: 'timer?id=' + timerRequestId + '&lawyerId=' + lawyerId,
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
                        // 重新显示后台返回的呼叫中心号码，防止是因律师未接电话又下了一个单，然后调用的不同的呼叫中心
                        $el.find('.link_phone span').html(data.tel);
                        if (dataStatus === 3 || dataStatus === 4 || dataStatus === 7) {
                            // 弹出律师未接提示
                            clearInterval(t1);
                            var title = '';
                            var main = '抱歉，' + data.lawyerName + '临时有事，无法为您服务系统可以为您推荐其他律师';
                            var yes = '退出本页';
                            var no = '推荐其他律师';
                            backOr(title, main, yes, no, function () {
                                if (!sessionStorage.getItem('loginFlg') && sessionStorage.getItem('loginFlg') === 0) {
                                    window.top.location.href = 'mipilaw66baidu_login';
                                }
                                else {
                                    window.top.location.href = './';
                                }
                            }, function () {
                                t1 = setInterval(function () {
                                    fnDate();
                                }, 1000);
                            });
                        }
                        else {
                            if (dataStatus === 8 || dataStatus === 6 || dataStatus === 10 || dataStatus === 13) {
                                clearInterval(t1);
                                settime();
                            }
                            else if (dataStatus === 5) {
                                if (flag === 0) {
                                    flag = 1;
                                    clearInterval(t1);
                                    setTimeout('settime()', 20000);
                                    isback = false;
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
        function cancelRequestOr() {
            $.ajax({
                url: 'cancelRequest?requestId=' + timerRequestId + '&_csrf=' + $el.find('$_csrf').val(),
                type: 'POST',
                success: function (data) {
                    clearInterval(t1);
                    if (data === 'NG') {
                        if (!isback) {
                            window.top.location.href = './';
                            return false;
                        }
                        else {
                            var title = '';
                            var main = '律师正在联系你，若不想咨询，可接通后礼貌告知律师，1分钟内结束咨询不计费。';
                            var yes = '离开本页';
                            var no = '礼貌等待';
                        }
                        backOr(title, main, yes, no, function () { // 离开本页时
                            var backUrl = localStorage.getItem('loginFlg');
                            if (!backUrl || backUrl !== 1) {
                                window.top.location.href = 'mipilaw66baidu_login';
                            }
                            else {
                                window.top.location.href = './';
                            }
                        }, function () {
                            t1 = setInterval(function () {
                                fnDate();
                            }, 1000);
                        });
                    }
                    else if (data === 'OK') {
                        var title = '温馨提示';
                        var main = '请支付律师辛苦费，若不支付费用则无法再次咨询律师';
                        var yes = '离开本页';
                        var no = '我知道了';
                        backOr(title, main, yes, no, function () { // yes
                            window.top.location.href = './';
                        }, function () {});
                    }
                    else {
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }
        function backToUnusual() {
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
        function checkTalking(checkRequestId, questionType) {
            $.ajax({
                type: 'GET',
                url: 'checkTalkingOrder?requestId=' + checkRequestId,
                success: function (data) {
                    console.log(data);
                    var state = data.result.state;
                    if (state === '6') {
                        toastOr('通话不足60秒，无需支付');
                        setTimeout(function () {
                            window.top.location.href = './';
                        }, 2000);
                    }
                    else if (state === '4') {
                        // 表示您和律师还在通话中，请咨询结束后，再支付律师辛苦费
                        toastOr(data.result.error);
                        localStorage.setItem('linkingOrding', 'linkingOrding');
                    }
                    else {
                        $.ajax({
                            type: 'get',
                            url: 'getRequestId?requestId=' + checkRequestId,
                            async: false,
                            success: function (data) {
                                console.log('是否合并支付单号：' + data);
                                window.top.location.href = 'mipilaw66baidu_couponPay?requestId='
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
