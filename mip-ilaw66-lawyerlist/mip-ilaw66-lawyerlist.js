/**
 * @file mip-ilaw66-lawyerlist 组件
 * @author
 */
// lawyerlist
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);

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

        // 公共的
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

        // 注意事项js
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
        // 支付页面
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
            // 支付结果
            $el.find('body').scrollTop(0);
            $el.find('body').css('overflow', 'hidden');
            // 支付成功
            $el.find('.success_result').show();
            // 支付失败
            // $el.find('.error_result').show();
            // 3秒后隐藏
            setTimeout(function () {
                // $el.find('body').css('overflow','auto');
                $el.find('.success_result').hide();
                $el.find('.error_result').hide();
                window.top.location.href = 'conment.html';
            },
                3000);
        });

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
        }

        function GetRequest() {
            // 获取url中"?"符后的字串
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

        // 公共的
        $el.find('.backfirst-list-alt').click(function () {
            window.top.location.href = 'orderlist';
        });
        $el.find('.backfirst-home').click(function () {
            window.top.location.href = 'index.html';
        });

        $el.find('.icon_orderlist').click(function () {
            window.top.location.href = 'orderlist';
        });

        // 支付页面
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
            // 支付结果
            $el.find('body').scrollTop(0);
            $el.find('body').css('overflow', 'hidden');
            // 支付成功
            $el.find('.success_result').show();
            // 支付失败
            // $el.find('.error_result').show();
            // 3秒后隐藏
            setTimeout(function () {
                // $el.find('body').css('overflow','auto');
                $el.find('.success_result').hide();
                $el.find('.error_result').hide();
                window.top.location.href = 'conment.html';
            },
                3000);
        });
        function getDirectUrl() {
            var currentUrl = window.top.location.href;
            var index = currentUrl.indexOf('/tulip/');
            var redirectUrl = currentUrl.substring(0, index + 7);
            return redirectUrl;
        }

        function startConsulting(questionType, csrfToken, lawyerId) {
            var fromChannel = localStorage.getItem('fromChannel');
            $.ajax({
                type: 'POST',
                url: 'greeting?questionType=' + questionType + '&_csrf=' + csrfToken,
                success: function (data) {
                    if (data === 'ERROR' || data === 'ERROR1') {
                        $el.find('#err_msg').html('系统异常，请返回重新咨询');
                        $el.find('.PopUp_sysErr').fadeIn();
                    }
                    else if (data === 'ERROR2') {
                        $el.find('#err_msg').html('您有订单未支付，请支付后再咨询');
                        $el.find('.PopUp_sysErr').fadeIn();
                    }
                    else if (data === 'ERROR3') {
                        $el.find('#err_msg').html('您有订单未结束，请等待1分钟后再试');
                        $el.find('.PopUp_sysErr').fadeIn();
                    }
                    else {
                        if (lawyerId) {
                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
                                === 'fengniao' || $el.find('#channel').val() === 'fengniao') {

                                window.top.location.href = 'request_wx?data=' + data + '&questionType='
                                    + questionType + '&lawyerId=' + lawyerId;
                            }
                            else {

                                window.top.location.href = 'request?data=' + data + '&questionType='
                                    + questionType + '&lawyerId=' + lawyerId;
                            }
                        }
                        else {

                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
                                === 'fengniao' || $el.find('#channel').val() === 'fengniao') {

                                window.top.location.href = 'request_wx?data=' + data
                                    + '&questionType=' + questionType;
                            }
                            else {

                                window.top.location.href = 'request?data=' + data
                                    + '&questionType=' + questionType;
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
                    var flg;
                    var fromChannel = localStorage.getItem('fromChannel');
                    if (id !== '') {
                        // 传入lawyerId
                        if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
                            === 'fengniao' || $el.find('#channel').val() === 'fengniao') {
                            window.top.location.href = 'request_wx?data=' + id + '&questionType=' + questionType
                                + '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                        }
                        else {
                            window.top.location.href = 'request?data=' + id + '&questionType='
                                + questionType + '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                        }
                    }
                    else {
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.PopUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        }
                        else {
                            var msg = data.error;
                            $el.find('#tips').html(msg);
                            $el.find('.PopUp_confirm').hide();
                            $el.find('.PopUp_uncheckErr').fadeIn();
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
                    var flg;
                    localStorage.setItem('reAskAvatar', data.avatar);
                    localStorage.setItem('reAskName', data.lawyerName);
                    localStorage.setItem('reAskSex', data.sex);
                    if (id !== '') {
                        // 传入lawyerId
                        window.top.location.href = 'informLawyer?data=' + id + '&questionType=' + questionType
                            + '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                    }
                    else {
                        $el.find('.loadingArea').hide();
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.PopUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        }
                        else {
                            var msg = data.error;
                            $el.find('#tips').html(msg);
                            $el.find('.PopUp_confirm').hide();
                            $el.find('.PopUp_uncheckErr').fadeIn();
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
                        // 传入lawyerId
                        window.top.location.href = 'informLawyer?data=' + id + '&questionType=' + questionType
                            + '&askingType=' + askingType + '&lawyerId=' + lawyerId + '&PABackJumpFlg=index';
                    }
                    else {
                        // 1.律师正在服务中 2.律师已下线
                        if (state === 1 || state === 2) {
                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                            var title = '温馨提示';
                            var main = data.error + '，您可以稍后继续问，或由系统推荐其他律师';
                            var yes = '立刻推荐其他律师';
                            var no = '稍后继续问';
                            var backOr;
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
                            $el.find('.PopUp_confirm').hide();
                            $el.find('.PopUp_uncheckErr').fadeIn();
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
            $.ajax({
                url: 'leezyb/getLeezybUser',
                type: 'GET',
                data: {
                    openId: openId
                },
                success: function (data) {
                    console.log(data);
                    var questionType;
                    if (b === 'ST002') {
                        // 百度统计
                        // window._hmt && window._hmt.push(['_trackEvent', $el.find('#channel').val() + '_falvvip', 'click']);
                        window.top.location.href = 'consulting_testament';
                    }
                    else if (b === 'ST003') {
                        // 百度统计
                        // window._hmt && window._hmt.push(['_trackEvent', $el.find('#channel').val() + '_tehui', 'click']);
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

        /* lawyerlist.js */
        var myScroll;
        var pullDownEl;
        var pullDownOffset;
        var generatedCount = 0;
        var isMineClose = true;

        function autoColorLaw() {
            var appBridge;
            if (window.appBridge && appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
                appBridge.changeWebviewTitle('我的律师');
            }
            //  民生银行取消头部
            cmbcCancelHead();
            // 本页面区分颜色
            var channeller = localStorage.getItem('channel');
            var channelInVal = $el.find('#channel').val();
            var channel = channeller || channelInVal;
            if (channel === 'eleme') {
                $el.find('.header_block').css('background', '#089EFF');
                $el.find('.order_foot a,.payingConfirm').css('color', '#089EFF');
                $el.find('.order_foot').css('border', '1px solid #089EFF');
            }
            else if (channel === 'mmbang' || channel === 'hers') {
                if (channel === 'mmbang') {
                    $el.find('.header_block').css('margin-top', '48px');
                    $el.find('#content_block').css('margin-top', '108px');
                }

                $el.find('.header_block').css('background', '#ff6191');
                $el.find('.order_foot a,.payingConfirm').css('color', '#ff6191');
                $el.find('.order_foot').css('border', '1px solid #ff6191');
            }
            else if (channel === 'weixin' || channel === 'onstar' || channel
                === 'falv' || channel === 'jbh' || channel === 'linjia') {
                $el.find('.header_block').css('background', '#ff6100');
                $el.find('.order_foot a,.payingConfirm').css('color', '#ff6100');
                $el.find('.order_foot').css('border', '1px solid #ff6100');
                $el.find('.header_block').css('color', '#fff');
                $el.find('.glyphicon-menu-left').css('color', '#fff');
            }
            else if (channel === 'WxiaoApp' || channel
                === 'fengniao' || channel === 'fengniaozb') {
                if (channel === 'WxiaoApp') {
                    $el.find('.header_block').hide();
                    $el.find('.block_lawyerlist').css('margin-top', 0);
                }
                else {
                    $el.find('.header_block').css('background', '#5C7DC0');
                }
                $el.find('.order_foot a,.payingConfirm').css('color', '#666666');
                $el.find('.order_foot').css('border', '1px solid #BBB');
            }
            else if (channel === 'dayima') {
                $el.find('.order_foot a,.payingConfirm').css('color', '#ff6100');
                $el.find('.order_foot').css('border', '1px solid #ff6100');
                $el.find('.top_header,.header_block').css('background', '#fff');
                $el.find('.div_header,.glyphicon-menu-left:before,.glyphicon,.header_block').css('color', '#000');
            }
            else if (channel !== 'cmbc') {
                $el.find('.header_block').css('background', '#ff6100');
                $el.find('.order_foot a,.payingConfirm').css('color', '#ff6100');
                $el.find('.order_foot').css('border', '1px solid #ff6100');
            }
            if (channel === 'winbaoxian') {
                $el.find('.header_block').hide();
                $el.find('.block_lawyerlist').css('margin-top', 0);
            }
        }
        // 点击白底以外区域关闭
        $el.find(window).on('touchend', function (event) {
            var tar = $el.find(event.target);
            if (tar.parents('.myRelative-bg').length === 0) {
                $el.find('.myRelative-bg').fadeOut();
            }

            event.stopPropagation();
        });

        //  加载所有订单
        load();

        pullDownEl = document.getElementById('refreshing_block');
        pullDownOffset = pullDownEl.offsetHeight;

        autoColorLaw();

        function load() {

            var loadStatus;
            var lawyerId;
            var questionType;
            var askingType;
            var csrfToken = $el.find('#_csrf').val();

            $.ajax({
                async: false,
                type: 'GET',
                url: 'getMyLawyers',
                success: function (data) {
                    console.log(data);
                    if (!data) {
                        var winHeight = $el.find(window).height();
                        var html = '<li id="noAskLawyers" style="height:';
                        html += winHeight + 'px;' + '"></li>';
                        $el.find('.content_block').html(html);
                        $el.find('.content_block').show();
                    }
                    else {
                        $el.find('.content_block').html('');
                        var flg = false;

                        // 继续问
                        $el.find('.reAsk').click(function () {
                            $el.find('.loadingArea').fadeIn();
                            lawyerId = this.attributes.lawyerId.nodeValue;
                            questionType = this.attributes.questionType.nodeValue;
                            askingType = $el.find(this).data('type');
                            sessionStorage.setItem('page2Informlayer', 'lawyerlist');
                            continueAskNew(lawyerId, questionType, askingType, csrfToken);
                        });

                        //  希望重试
                        $el.find('#still_reAsk').click(function () {
                            $el.find('.popUp_confirm').hide();
                            $el.find('.loadingArea').show();
                            continueAsk(lawyerId, questionType, askingType, csrfToken);
                        });

                        $el.find('.link_btn_uncheckErrConfirm').click(function () {
                            if (flg) {
                                // 情况为b,弹出重试/咨询其他律师
                                $el.find('.popUp_uncheckErr').hide();
                                $el.find('.popUp_confirm').fadeIn();
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
                            startConsulting(questionType, csrfToken);
                        });

                        $el.find('.link_btn_sysErrConfirm').click(function () {
                            $el.find('.popUp_sysErr').hide();
                        });

                        $el.find('.link_btn_unFinishedBillErrConfirm').click(function () {
                            $el.find('.popUp_unFinishedBillErr').hide();
                        });

                        $el.find('.link_btn_unpaidErrConfirm').click(function () {
                            window.top.location.href = 'orderlist';
                        });
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                    loadStatus = 'error';
                }
            });
            return loadStatus;
        }

        function formatTime(duration) {
            var time = null;
            if (duration >= 3600) {
                var hour = parseInt(duration / 3600, 16);
                var minute = parseInt((duration % 3600) / 60, 16);
                var second = (duration % 3600) % 60;
                time = hour + '时' + minute + '分' + second + '秒';
            }
            else if (duration >= 60) {
                var minute = parseInt(duration / 60, 16);
                var second = duration % 60;
                time = minute + '分' + second + '秒';
            }
            else if (duration >= 0) {
                time = duration + '秒';
            }

            return time;
        }

        function startConsulting(questionType, csrfToken) {
            var fromChannel = localStorage.getItem('fromChannel');
            if (checkQuestionType(questionType)) {
                $.ajax({
                    type: 'POST',
                    url: 'greeting?questionType=' + questionType + '&_csrf=' + csrfToken,
                    success: function (data) {
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
                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
                                === 'fengniao' || $el.find('#channel').val() === 'fengniao') {
                                window.top.location.href = 'request_wx?data=' + data + '&questionType=' + questionType;
                            }
                            else {
                                window.top.location.href = 'request?data=' + data + '&questionType=' + questionType;
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
            else {
                window.top.location.href = getBaseUrl();
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

        function cmbcCancelHead() {
            //  民生银行取消头部
            var fromChannelVal = localStorage.getItem('fromChannelVal');
            if (fromChannelVal === 'cmbc') {
                $el.find('.order_foot').css({
                    color: '#4196ea',
                    border: '1px solid #4196ea'
                });
                $el.find('.order_foot a').css('color', '#4196ea');
                $el.find('.header_block').css({
                    'color': '#333',
                    'background': '#fff',
                    'border-bottom': '1px solid #cdcdcd',
                    'font-size': '16px'
                });
                $el.find('.glyphicon').css({
                    'color': '#333',
                    'font-size': '20px',
                    'font-weight': 'lighter',
                    'left': '8px'
                });
                $el.find('.glyphicon').on('click', function () {
                    window.top.location.href = 'cmbc';
                });
            }
        }

    };

    return customElement;
});
