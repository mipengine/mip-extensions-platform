/**
 * @file mip-ilaw66-resposeajax 组件
 * @author
 */
// lawyer_noresponse
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var lawyerId;
        $el.find('.header_block').hide();

        lawyerId = getQueryString('lawyerId');

        // 获取当前的小时时间
        var currentHours = new Date().getHours();
        console.log(currentHours);
        if (currentHours <= 23 && currentHours >= 8) {
            // 工作时间
            $el.find('.main_text_busy').show();
            $el.find('.main_text_nonworking').hide();
        } else {
            // 非工作时间
            $el.find('.main_text_busy').hide();
            $el.find('.main_text_nonworking').show();
        }

        var questionType = getQueryString('questionType');
        var csrfToken = $el.find('#csrf').val();
        // 点击继续通知律师按钮
        $el.find('#js-continueAsk').on('touchstart',
        function () {
            $.ajax({
                type: 'POST',
                data: {
                    questionType: questionType,
                    csrf: csrfToken
                },
                url: 'greeting',
                success: function (data) {
                    if (data === 'ERROR' || data === 'ERROR1') {
                        $el.find('#err_msg').html('系统异常，请返回重新咨询');
                        $el.find('.popUp_sysErr').fadeIn();
                    } else if (data === 'ERROR2') {
                        $el.find('#err_msg').html('您有订单未支付，请支付后再咨询');
                        $el.find('.popUp_sysErr').fadeIn();
                    } else if (data === 'ERROR3') {
                        $el.find('#err_msg').html('您有订单未结束，请等待1分钟后再试');
                        $el.find('.popUp_sysErr').fadeIn();
                    } else {
                        if (lawyerId) {
                            location.href = 'request?data=' + data + '&questionType='
+ questionType + '&lawyerId=' + lawyerId;

                        } else {
                            location.href = 'request?data=' + data
+ '&questionType=' + questionType;
                        }
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }
                }
            });
        });

        $el.find('.ruleask').click(function () {
            location.href = 'reservation?questionType=' + questionType;
        });

        // 点击弹窗错误按钮
        $el.find('#err_confirm').click(function () {
            $el.find('.popUp_sysErr').hide();
        });
        // 获取url参数
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }
            return null;
        }

        /*common.js*/
        var channel = localStorage.getItem('channel');
        var channelInUrl = getQueryString('channel');
        var head = $el.find('.header_block');
        // 根据channel引入css样式
        if (!channel && channelInUrl) {
            channel = channelInUrl;
        }

        $el.find('.glyphicon').hide();
        $el.find('.header_block').hide();
        $el.find('.btn').css('background', '#8698C6');
        $el.find('.content_inputCodeText').css('color', '#8698C6');
        $el.find('.tile_ele').css('text-algin', 'center');
        $el.find('.common_number').css('height', '48px');
        $el.find('.common_number').text('');

        if (head && head.is(':hidden')) {
            $el.find('.content_inputCodeText').css({
                'top': '4.8rem'
            });
        }

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }
            return null;
        }

        function load() {
            if (!channel && channelInUrl) {
                channel = channelInUrl;
            }
        }

        /* wenlvshi.js */
        // 强行跳转主页为https协议
        function getBaseUrl() {
            var ishttps = 'https:' === document.location.protocol ? true : false;
            var url = window.location.host;
            if (ishttps) {
                url = 'https://' + url;
            } else {
                url = 'http://' + url;
            }
            return url + '/jasmine/';
        }

        // 公共的
        $el.find('.backfirst-list-alt').click(function () {
            location.href = 'orderlist';
        });
        $el.find('.backfirst-home').click(function () {
            location.href = 'index.html';
        });

        $el.find('.icon_orderlist').click(function () {
            location.href = 'orderlist';
        });
        $el.find('.backfirst').click(function () {
            if (location.host === '127.0.0.1:9082' || location.host === 'localhost:9082') {
                window.history.go(- 1);
            } else {
                location.href = getBaseUrl();
            }
        });

        // 注意事项js
        $el.find('.allow_icon,.conment_allow').click(function () {
            if ($el.find('input[name="allow"]').val()) {
                $el.find('input[name="allow"]').val('');
                $el.find('.allow_icon2').show();
                $el.find('.allow_icon1').hide();
            } else {
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
            $('body').scrollTop(0);
            $('body').css('overflow', 'hidden');
            // 支付成功
            $el.find('.success_result').show();
            // 支付失败
            // $el.find('.error_result').show();
            setTimeout(function () {
                // 3秒后隐藏
                // $el.find('body').css('overflow','auto');
                $el.find('.success_result').hide();
                $el.find('.error_result').hide();
                location.href = 'conment.html';
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
            } else {
                return false;
            }
        }

        // 公共的
        $el.find('.backfirst-list-alt').click(function () {
            location.href = 'orderlist';
        });
        $el.find('.backfirst-home').click(function () {
            location.href = 'index.html';
        });

        $el.find('.icon_orderlist').click(function () {
            location.href = 'orderlist';
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
            setTimeout(function () {
                // 3秒后隐藏
                // $el.find('body').css('overflow','auto');
                $el.find('.success_result').hide();
                $el.find('.error_result').hide();
                location.href = 'conment.html';
            },
            3000);
        });

        function getDirectUrl() {
            var currentUrl = location.href;
            var index = currentUrl.indexOf('/tulip/');
            var redirectUrl = currentUrl.substring(0, index + 7);
            return redirectUrl;
        }

        function startConsulting(questionType, csrfToken, lawyerId) {
            var fromChannel;
            $.ajax({
                type: 'POST',
                data: {
                    questionType: questionType,
                    csrf: csrfToken
                },
                url: 'greeting',
                success: function (data) {
                    if (data === 'ERROR' || data === 'ERROR1') {
                        $el.find('#err_msg').html('系统异常，请返回重新咨询');
                        $el.find('.popUp_sysErr').fadeIn();
                    } else if (data === 'ERROR2') {
                        $el.find('#err_msg').html('您有订单未支付，请支付后再咨询');
                        $el.find('.popUp_sysErr').fadeIn();
                    } else if (data === 'ERROR3') {
                        $el.find('#err_msg').html('您有订单未结束，请等待1分钟后再试');
                        $el.find('.popUp_sysErr').fadeIn();
                    } else {
                        if (lawyerId) {
                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
=== 'fengniao' || $el.find('#channel').val() === 'fengniao') {

                                location.href = 'request_wx?data=' + data + '&questionType='
+ questionType + '&lawyerId=' + lawyerId;
                            } else {

                                location.href = 'request?data=' + data
+ '&questionType=' + questionType + '&lawyerId=' + lawyerId;
                            }
                        } else {

                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
=== 'fengniao' || $el.find('#channel').val() === 'fengniao') {

                                location.href = 'request_wx?data='
+ data + '&questionType=' + questionType;
                            } else {

                                location.href = 'request?data=' + data
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
+ questionType + '&csrf=' + csrfToken,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    var flg;
                    var fromChannel;
                    if (id !== '') {
                        // 传入lawyerId
                        if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
=== 'fengniao' || $el.find('#channel').val() === 'fengniao') {
                            location.href = 'request_wx?data=' + id + '&questionType=' + questionType + '&askingType='
+ askingType + '&lawyerId=' + lawyerId;
                        } else {
                            location.href = 'request?data=' + id + '&questionType=' + questionType
+ '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                        }

                    } else {
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.popUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        } else {
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
+ questionType + '&csrf=' + csrfToken,
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
                        location.href = 'informLawyer?data=' + id + '&questionType='
+ questionType + '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                    } else {
                        $el.find('.loadingArea').hide();
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.popUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        } else {
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
                url: 'continueAskV3?lawyerId=' + lawyerId + '&questionType=' + questionType
+ '&csrf=' + csrfToken + '&continueAskPage=' + continueAskPage,
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
                        location.href = 'informLawyer?data=' + id + '&questionType='
+ questionType + '&askingType=' + askingType + '&lawyerId='
+ lawyerId + '&PABackJumpFlg=index';
                    } else {
                        if (state === 1 || state === 2) {
                            // 1.律师正在服务中 2.律师已下线
                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                            var title = '温馨提示';
                            var main = data.error + '，您可以稍后继续问，或由系统推荐其他律师';
                            var yes = '立刻推荐其他律师';
                            var no = '稍后继续问';
                            var backOr;
                            backOr(title, main, yes, no,
                            function () {
                                startConsulting(questionType);
                            },
                            function () {
                                $.ajax({
                                    url: 'createContinueAskLater',
                                    type: 'POST',
                                    data: {
                                        lawyerId: lawyerId,
                                        questionType: questionType,
                                        csrf: csrfToken
                                    },
                                    success: function (data) {
                                        if (data === 'ERROR') {
                                            alert('系统异常');
                                        } else {
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
                        } else {
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
                        location.href = 'consulting_testament';

                    } else if (b === 'ST003') {
                        // 百度统计
                        // window._hmt && window._hmt.push(['_trackEvent', $el.find('#channel').val()+'_tehui', 'click']);
                        location.href = 'preferential?serviceType=' + questionType;

                    }

                },
                error: function (jqXHR) {
                    if (jqXHR === 403) {
                        window.reload();
                    }
                }
            });
        }
    };

    return customElement;
});