/**
 * @file mip-ilaw66-preferential 组件
 * @author
 */
// preferential_hep
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var preferentiallistDate;
        var appBridge;
        if (window.appBridge && appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
            appBridge.changeWebviewTitle('超值优惠');
        };
        // 各项目区分颜色
        var channel = localStorage.getItem('channel');
        if (channel === 'eleme') {
            $el.find('.header_block').css('background', '#089EFF');
        } else if (channel === 'mmbang' || channel === 'hers') {
            if (channel === 'mmbang') {
                $el.find('.header_block').css('margin-top', '48px');
            }
            $el.find('.header_block').css('background', '#ff6191');
        } else if (channel === 'weixin' || channel === 'onstar' || channel
=== 'falv' || channel === 'jbh' || channel === 'linjia') {
            $el.find('.header_block').css('background', '#ff6100');
            $el.find('.header_block').css('color', '#fff');
            $el.find('.glyphicon-menu-left').css('color', '#fff');
        } else if (channel === 'WxiaoApp' || channel === 'fengniao' || channel === 'fengniaozb') {
            if (channel === 'WxiaoApp') {
                $el.find('.header_block').hide();
            } else {
                $el.find('.header_block').css('background', '#5C7DC0');
            }
        } else if (channel === 'dayima') {
            $el.find('.top_header,.header_block').css('background', '#fff');
            $el.find('.div_header,.glyphicon-menu-left:before,.glyphicon,.header_block').css('color', '#000');
        } else if (channel !== 'cmbc') {
            $el.find('.header_block').css('background', '#ff6100');
        }

        if (channel === 'winbaoxian') {
            $el.find('.header_block').hide();
            $el.find('#toactivation').css('top', '7px');
        };

        var frompage = getQueryString('frompage');

        // 调用接口遍历卡种类详情
        // 获取从哪个页面进入的，卡券列表页需要调用接口
        var s = window.location.pathname.substring(window.location.pathname.indexOf('preferential'
        ), window.location.pathname.length);
        if (s === 'preferential') {
            $.ajax({
                url: 'card/getCard',
                type: 'get',
                success: function (data) {
                    var dataarr = [];
                    for (var j = 0; j < data.length; j++) {
                        dataarr.push(data[j]);
                    }
                    preferentiallistDate = callingInterface(dataarr);
                    // 填充模板--已使用（过期）卡券
                    // var preferentiallistHtml = template('preferentiallist_template', preferentiallistDate);
                    // document.getElementById('preferentiallist_content').innerHTML = preferentiallistHtml;

                    for (var i = 0; i < dataarr.length; i++) {
                        var temp = dataarr[i];
                        localStorage.setItem('typePrice' + temp.type, temp.price);
                    }

                    // 去购买畅聊卡/包年卡/展业卡
                    $el.find('.preferential-card').click(function (event) {
                        var tocardtype = $el.find(this).data('cardtype');
                        var loadStatus;
                        var tocardid = $el.find(this).data('cardid');
                        window.top.location.href = 'buyyearcard?cardType=' + tocardtype + '&id=' + tocardid;
                        event.preventDefault();
                    });
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }
                    // loadStatus = 'error';
                }
            });
        }

        /*帮助信息详细内容操作*/
        var dropdown = document.querySelectorAll('.dropdown');
        var dropdownArray = Array.prototype.slice.call(dropdown, 0);
        dropdownArray.forEach(function (el) {
            var button = el.querySelector('p[data-toggle="dropdown"]');
            var menu = el.querySelector('.dropdown-menu');
            var arrow = button.querySelector('i.icon-arrow');

            button.onclick = function (event) {
                if (!menu.hasClass('show')) {
                    menu.classList.add('show');
                    menu.classList.remove('hide');
                    arrow.classList.add('open');
                    arrow.classList.remove('close');
                    event.preventDefault();
                } else {
                    menu.classList.remove('show');
                    menu.classList.add('hide');
                    arrow.classList.remove('open');
                    arrow.classList.add('close');
                    event.preventDefault();
                }
            };
        });

        Element.prototype.hasClass = function (className) {
            return this.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(this.className);
        };

        var flowid = getQueryString('flowid');
        console.log('帮助流程id' + flowid);
        if (flowid) {
            $el.find('.topbg_useflow' + flowid).show();
        }

        $el.find('.glyphicon').on('click',
        function () {
            window.top.location.href = getBaseUrl();
        });

        function callingInterface(recordarr) {
            // 调用接口显示使用记录
            preferentiallistDate = {};
            preferentiallistDate.list = [];
            for (var i = 0; i < recordarr.length; i++) {
                var temp = recordarr[i];
                preferentiallistDate.list.push(temp);
            }
            return preferentiallistDate;
        }

        // 解析url参数值
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
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
            } else {
                window.top.location.href = getBaseUrl();
            }
        });

        //  注意事项js
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
        //  支付页面
        $el.find('.pay_txt').click(function () {
            var no = $el.find(this).data('no');
            $el.find('.pay_txt .allow_icon2').show();
            $el.find('.pay_txt .allow_icon1').hide();
            $el.find(this).children('.allow_icon2').hide();
            $el.find(this).children('.allow_icon1').show();
            $el.find('input[name="paytype"]').val(no);
            // 将所选的支付方式放入隐藏表单
        });
        $el.find('.btn_pay').click(function () {
            //  支付结果
            $el.find('body').scrollTop(0);
            $el.find('body').css('overflow', 'hidden');
            $el.find('.success_result').show();
            //  支付成功
            //  $el.find('.error_result').show();
            //  支付失败
            setTimeout(function () {
                //  3秒后隐藏
                //  $el.find('body').css('overflow','auto');
                $el.find('.success_result').hide();
                $el.find('.error_result').hide();
                window.top.location.href = 'conment.html';
            },
            3000);
        });

        //  评价页面
        /*$el.find('.btn_conment').click(function (){
	$el.find('body').scrollTop(0);
	$el.find('body').css('overflow','hidden');
	$el.find('.conment_result').show();
	setTimeout(function (){
		location.href='index.html';
	},3000)
});*/
        // 手机号码修改
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }

        function GetRequest() {
            var url = location.search;
            // 获取url中'?'符后的字串
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
            var no = $el.find(this).data('no');
            $el.find('.pay_txt .allow_icon2').show();
            $el.find('.pay_txt .allow_icon1').hide();
            $el.find(this).children('.allow_icon2').hide();
            $el.find(this).children('.allow_icon1').show();
            $el.find('input[name="paytype"]').val(no);
            // 将所选的支付方式放入隐藏表单
        });
        $el.find('.btn_pay').click(function () {
            //  支付结果
            $el.find('body').scrollTop(0);
            $el.find('body').css('overflow', 'hidden');
            $el.find('.success_result').show();
            //  支付成功
            //  $el.find('.error_result').show();//  支付失败
            setTimeout(function () {
                //  3秒后隐藏
                //  $el.find('body').css('overflow','auto');
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

                                window.top.location.href = 'request_wx?data=' + data + '&questionType='
+ questionType + '&lawyerId=' + lawyerId;
                            } else {

                                window.top.location.href = 'request?data=' + data + '&questionType='
+ questionType + '&lawyerId=' + lawyerId;
                            }
                        } else {

                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
=== 'fengniao' || $el.find('#channel').val() === 'fengniao') {

                                window.top.location.href = 'request_wx?data=' + data + '&questionType=' + questionType;
                            } else {

                                window.top.location.href = 'request?data=' + data + '&questionType=' + questionType;
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
                url: 'continueAsk?lawyerId=' + lawyerId + '&questionType=' + questionType + '&csrf=' + csrfToken,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    var fromChannel;
                    var flg;
                    if (id !== '') {
                        //  传入lawyerId
                        if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
=== 'fengniao' || $el.find('#channel').val() === 'fengniao') {
                            window.top.location.href = 'request_wx?data=' + id + '&questionType=' + questionType
+ '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                        } else {
                            window.top.location.href = 'request?data=' + id + '&questionType=' + questionType
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
                url: 'continueAsk?lawyerId=' + lawyerId + '&questionType=' + questionType + '&csrf=' + csrfToken,
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
                        //  传入lawyerId
                        window.top.location.href = 'informLawyer?data=' + id + '&questionType=' + questionType
+ '&askingType=' + askingType + '&lawyerId=' + lawyerId;
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

        //  continueAsk2 更改为 continueAskNew
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
                        //  传入lawyerId
                        window.top.location.href = 'informLawyer?data=' + id + '&questionType=' + questionType
+ '&askingType=' + askingType + '&lawyerId=' + lawyerId + '&PABackJumpFlg=index';
                    } else {
                        if (state === 1 || state === 2) {
                            //  1.律师正在服务中 2.律师已下线
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
                        window.top.location.href = 'consulting_testament';

                    } else if (b === 'ST003') {
                        // 百度统计
                        // location.href = 'preferential?serviceType=' + questionType;

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