/**
 * @file mip-ilaw66-ilawlist 组件l
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    // 使用zepto时候报错Failed to execute 'send' on 'XMLHttpRequest': Failed to load '
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
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
            var no = $(this).data('no');
            $el.find('.pay_txt .allow_icon2').show();
            $el.find('.pay_txt .allow_icon1').hide();
            $(this).children('.allow_icon2').hide();
            $(this).children('.allow_icon1').show();
            // 将所选的支付方式放入隐藏表单
            $el.find('input[name="paytype"]').val(no);
        });
        $el.find('.btn_pay').click(function () {
            //  支付结果
            $('body').scrollTop(0);
            $('body').css('overflow', 'hidden');
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

        //  评价页面

        /*$el.find('.btn_conment').click(function () {
                $el.find('body').scrollTop(0);
                $el.find('body').css('overflow','hidden');
                $el.find('.conment_result').show();
                setTimeout(function () {
                    window.top.location.href='index.html';
                },3000)
            });*/

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
        }

        function GetRequest() {
            // 获取url中'?'符后的字串
            var url = location.search;
            var theRequest = {};
            if (url.indexOf('?') !== -1) {
                var str = url.substr(1);
                var strs;
                strs = str.split('&');
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

        //  支付页面
        $el.find('.pay_txt').click(function () {
            var no = $(this).data('no');
            $el.find('.pay_txt .allow_icon2').show();
            $el.find('.pay_txt .allow_icon1').hide();
            $(this).children('.allow_icon2').hide();
            $(this).children('.allow_icon1').show();
            // 将所选的支付方式放入隐藏表单
            $el.find('input[name="paytype"]').val(no);
        });
        function errorResult() {
            $el.find('.success_result').hide();
            $el.find('.error_result').hide();
            window.top.location.href = 'conment.html';
        }
        $el.find('.btn_pay').click(function () {
            //  支付结果
            $el.find('body').scrollTop(0);
            $el.find('body').css('overflow', 'hidden');
            //  支付成功
            $el.find('.success_result').show();

            //  支付失败
            //  $el.find('.error_result').show();
            setTimeout(errorResult(), 3000);
        });

        function getDirectUrl() {
            var currentUrl = window.top.location.href;
            var index = currentUrl.indexOf('/tulip/');
            var redirectUrl = currentUrl.substring(0, index + 7);
            return redirectUrl;
        }

        // 继续问---通知律师跳转到request页面（开始咨询；confirmTel页）
        function continueAsk(lawyerId, questionType, askingType, csrfToken) {
            var fromChannel = localStorage.getItem('fromChannel');
            $.ajax({
                async: true,
                type: 'POST',
                url: 'continueAsk?lawyerId=' + lawyerId + '&questionType=' + questionType + '&_csrf=' + csrfToken,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    if (id !== '') {
                        //  传入lawyerId
                        if (fromChannel === 'WxiaoApp'
                            || $el.find('#channel').val() === 'WxiaoApp'
                            || fromChannel === 'fengniao'
                            || $el.find('#channel').val() === 'fengniao') {
                            window.top.location.href = 'request_wx?data='
                                + id + '&questionType='
                                + questionType + '&askingType='
                                + askingType + '&lawyerId=' + lawyerId;
                        }
                        else {
                            window.top.location.href = 'request?data='
                                + id + '&questionType=' + questionType + '&askingType='
                                + askingType + '&lawyerId=' + lawyerId;
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
                        window.top.location.href = 'informLawyer?data='
                            + id + '&questionType=' + questionType + '&askingType='
                            + askingType + '&lawyerId=' + lawyerId;
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
                url: 'continueAskV3?lawyerId=' + lawyerId + '&questionType='
                    + questionType + '&_csrf=' + csrfToken + '&continueAskPage='
                    + continueAskPage,
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
                        window.top.location.href = 'informLawyer?data='
                            + id + '&questionType=' + questionType + '&askingType='
                            + askingType + '&lawyerId=' + lawyerId + '&PABackJumpFlg=index';
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
                                    url: 'createContinueAskLater?lawyerId='
                                        + lawyerId + '&questionType=' + questionType + '&_csrf=' + csrfToken,
                                    type: 'POST',
                                    //                            data: {
                                    //                                lawyerId: lawyerId,
                                    //                                questionType: questionType,
                                    //                                _csrf: csrfToken
                                    //                            },
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
            var questionType = getQueryString('questionType');
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
                        // window._hmt && window._hmt.push(['_trackEvent',$el.find('#channel').val() + '_falvvip', 'click']);
                        window.top.location.href = 'consulting_testament';
                    }
                    else if (b === 'ST003') {
                        // 百度统计
                        // window._hmt && window._hmt.push(['_trackEvent',$el.find('#channel').val() + '_tehui', 'click']);
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

        /* pop.js */

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
                This.body = $el.find('body');
                var btnN = '<div class="back-leave" id="js-back-leave">'
                    + This.option.yes + '</div>'
                    + '<div class="back-continue" id="js-back-continue">' + This.option.no + '</div>';
                if (!This.option.yes) {
                    btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
                        + This.option.no + '</div>';
                }

                This.main = '<div class="back__pop popUp" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper"></div>'
                    + '<div class="back__popLayer">'
                    + '<span>' + This.option.title + '</span>'
                    + '<span>' + This.option.main + '</span>' + btnN
                    + '</div>'
                    + '</div>';
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
                This.body = $el.find('body');
                This.main = '<div class="ack__pop toastUp" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper layer__wrapper__toast"></div>'
                    + '<div class="back__popLayer__toast">'
                    + '<span>' + This.option.main + '</span>'
                    + '</div>'
                    + '</div>';
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

        /* orderlist.js */
        var myScroll;
        var pullDownEl;
        var pullDownOffset;
        var generatedCount = 0;
        var isMineClose = true;
        // 所有未支付订单的id串
        var requestIdList = '';

        // 解析url参数值
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
        }

        $el.find('.header_block').hide();

        // 点击白底以外区域关闭
        $(window).on('touchend', function (event) {
            var tar = $el.find(event.target);
            if (tar.parents('.myRelative-bg').length === 0) {
                $el.find('.myRelative-bg').fadeOut();
            }

            event.stopPropagation();
        });
        pullDownEl = document.getElementById('refreshing_block');
        pullDownOffset = pullDownEl.offsetHeight;

        // 显示时分秒
        function formatTime(duration) {
            var time = null;
            if (duration >= 3600) {
                var hour = parseInt(duration / 3600, 10);
                var minute = parseInt((duration % 3600) / 60, 10);
                var second = (duration % 3600) % 60;
                time = hour + '时' + minute + '分' + second + '秒';
            }
            else if (duration >= 60) {
                var minute = parseInt(duration / 60, 10);
                var second = duration % 60;
                time = minute + '分' + second + '秒';
            }
            else if (duration >= 0) {
                time = duration + '秒';
            }

            return time;
        }

        // 仅显示分钟数
        function formatTimeNew(duration) {
            var time = null;
            time = Math.ceil(duration / 60) + '分钟';
            return time;
        }

        function startConsulting(questionType, csrfToken) {
            if (checkQuestionType(questionType)) {
                $.ajax({
                    type: 'POST',
                    url: 'greeting?questionType=' + questionType + '&_csrf=' + csrfToken,
                    success: function (data) {
                        $el.find('.loadingArea').hide();
                        if (data === 'ERROR' || data === 'ERROR1') {
                            $el.find('.popUp_sysErr').fadeIn();
                        }
                        else if (data === 'ERROR2') {
                            $el.find('.popUp_unpaidErr').fadeIn();
                        }
                        else if (data === 'ERROR3') {
                            $el.find('.popUp_unFinishedBillErr').fadeIn();
                        }
                        else {
                            window.top.location.href = 'request?data=' + data + '&questionType=' + questionType;
                        }
                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }

                    }
                });
            }
            else {
                window.top.location.href = getBaseUrl();
            }
        }

        function checkIfIsFreeOrder(requestId, questionType) {
            var freeFlg = false;
            var freeMessage = '';
            var togetherFlg = false;
            if (requestId === 'togetherOrder') {
                // 合并支付，传入多个订单号，如：requestIdList=5009,5146
                requestId = requestIdList.substring(0, requestIdList.length - 1);
                togetherFlg = true;
            }

            $.ajax({
                async: false,
                type: 'GET',
                data: {
                    requestIdList: requestId
                },
                url: 'checkFreeBill',
                success: function (data) {
                    freeMessage = data.message;
                    if (data.result === '2') {
                        // 2表示全部订单被免单
                        freeFlg = '2';
                    }
                    else if (data.result === '1') {
                        // 1表示部分订单被免单
                        freeFlg = '1';
                    }

                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
            if (freeFlg === '2' || freeFlg === '1') {
                // Toast提醒
                toastOr(freeMessage);
                // 重新刷新页面，获取是否已成免单
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            }
            else {
                if (togetherFlg) {
                    window.top.location.href = 'couponPay?requestId='
                        + requestId + '&questionType=' + questionType + '&togetherOrderFlg=1';
                }
                else {
                    window.top.location.href = 'couponPay?requestId='
                        + requestId + '&questionType=' + questionType;
                }
            }
        }

        function checkQuestionType(questionType) {
            var array = ['CT001', 'CT002', 'CT003', 'CT004', 'CT005', 'CT006', 'CT007', 'CT008', 'CT009', 'CT010'];
            for (var i = 0; i < array.length; i++) {
                if (array[i] === questionType) {
                    return true;
                }

            }
            return false;
        }

    };

    return customElement;
});
