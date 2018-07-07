/**
 * @file mip-ilaw66-inform 组件
 * @author
 */
// informLawyer
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
            // 3秒后隐藏
            setTimeout(function () {
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
                        $el.find('.PopUp_sysErr').fadeIn();
                    } else if (data === 'ERROR2') {
                        $el.find('#err_msg').html('您有订单未支付，请支付后再咨询');
                        $el.find('.PopUp_sysErr').fadeIn();
                    } else if (data === 'ERROR3') {
                        $el.find('#err_msg').html('您有订单未结束，请等待1分钟后再试');
                        $el.find('.PopUp_sysErr').fadeIn();
                    } else {
                        if (lawyerId) {
                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val()
=== 'WxiaoApp' || fromChannel === 'fengniao' || $el.find('#channel').val()
=== 'fengniao') {

                                location.href = 'request_wx?data=' + data
+ '&questionType=' + questionType + '&lawyerId=' + lawyerId;
                            } else {

                                location.href = 'request?data=' + data + '&questionType='
+ questionType + '&lawyerId=' + lawyerId;
                            }
                        } else {

                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val()
=== 'WxiaoApp' || fromChannel === 'fengniao' || $el.find('#channel').val() === 'fengniao') {

                                location.href = 'request_wx?data=' + data
+ '&questionType=' + questionType;
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
                url: 'continueAsk?lawyerId=' + lawyerId + '&questionType=' + questionType + '&csrf=' + csrfToken,
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
                            location.href = 'request_wx?data=' + id + '&questionType=' + questionType
+ '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                        } else {
                            location.href = 'request?data=' + id + '&questionType=' + questionType
+ '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                        }

                    } else {
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.PopUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        } else {
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
                            $el.find('.PopUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        } else {
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
                url: 'continueAskV3?lawyerId=' + lawyerId + '&questionType='
+ questionType + '&csrf=' + csrfToken + '&continueAskPage=' + continueAskPage,
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
                        location.href = 'informLawyer?data=' + id + '&questionType=' + questionType
+ '&askingType=' + askingType + '&lawyerId=' + lawyerId + '&PABackJumpFlg=index';
                    } else {
                        // 1.律师正在服务中 2.律师已下线
                        if (state === 1 || state === 2) {
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
                    if (b === 'ST002') {
                        // 百度统计
                        // window._hmt && window._hmt.push(['_trackEvent', $el.find('#channel').val() + '_falvvip', 'click']);
                        location.href = 'consulting_testament';

                    } else if (b === 'ST003') {
                        // 百度统计
                        // window._hmt && window._hmt.push(['_trackEvent', $el.find('#channel').val() + '_tehui', 'click']);
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

        /* pop.js*/
        // 封装弹窗插件
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
                var btnN = '<div class="back-leave" id="js-back-leave">' + This.option.yes
+ '</div>' + '<div class="back-continue" id="js-back-continue">'
+ This.option.no + '</div>';
                if (!This.option.yes) {
                    btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
+ This.option.no + '</div>';
                }
                This.main = '<div class="back__pop PopUp" style="display:none;" id="back__pop">'
+ '<div class="layer__wrapper"></div>' + '<div class="back__popLayer">' + '<span>'
+ This.option.title + '</span>' + '<span>' + This.option.main + '</span>' + btnN + '</div>' + '</div>';
                This.body.append(This.main);
                This.PopUp = $el.find('.PopUp');
                This.PopUp.show();
            },
            bindEvent: function () {
                var This = this;
                // 点击离开事件
                This.PopUp.on('click', '#js-back-leave',
                function () {
                    This.PopUp.remove();
                    This.option.popYes();
                });
                // 点击确认事件
                This.PopUp.on('click', '#js-back-continue',
                function () {
                    This.PopUp.remove();
                    This.option.popNo();

                });
                // 点击遮罩层事件 --- 点击不关闭，必须点按钮
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
                This.body = $el.find('body');
                This.main = '<div class="back__pop ToastUp" style="display:none;" id="back__pop">'
+ '<div class="layer__wrapper layer__wrapper__toast"></div>' + '<div class="back__popLayer__toast">'
+ '<span>' + This.option.main + '</span>' + '</div>' + '</div>';
                This.body.append(This.main);
                This.ToastUp = $el.find('.ToastUp');
                This.ToastUp.show();
            },
            bindEvent: function () {
                var This = this;
                // 显示内容2秒
                setTimeout(function () {
                    This.ToastUp.remove();
                },
                2000);
            }
        };

        window.ToastUp = ToastUp;

        $el.find('#btn1').on('click',
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

        $el.find('#btn2').on('click',
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
                    // alert('离开本页');
                    sfunc.call(this, a);
                },
                popNo: function (a) {
                    // alert('留下等待');
                    ffunc.call(this, a);
                }
            });
        }
        function toastOr(main) {
            new ToastUp({
                main: main
            });
        }

        /* informLawyer.js */
        var countdown = 0;
        var dateTime = new Date();
        var begin = dateTime.getHours();
        var min = dateTime.getMinutes();
        var sec = dateTime.getSeconds();
        var lawyerId = getQueryString('lawyerId');
        var questionType = getQueryString('questionType');
        var askingType = getQueryString('askingType');
        var avatarOfLawyer = localStorage.getItem('reAskAvatar');
        var nameOfLawyer = localStorage.getItem('reAskName');
        var sexOfLawyer = localStorage.getItem('reAskSex');
        var fromRoute = getQueryString('fromRoute');
        var clericalName = localStorage.getItem('clericalName');
        var clericalAvatar = localStorage.getItem('clericalAvatar');
        var timer;
        $el.find(function () {
            lawyerId = getQueryString('lawyerId');
            // 更改律师头像及姓氏
            if (fromRoute) {
                changeAvatar(clericalName, clericalAvatar, 'male');
            } else {
                changeAvatar(nameOfLawyer, avatarOfLawyer, sexOfLawyer);
            }

            $el.find('#requestId').val(getQueryString('data'));
            $el.find('#questionType').val(getQueryString('questionType'));
            $el.find('#askingType').val(getQueryString('askingType'));
            $el.find('.header_block').hide();

            timer = setInterval(function () {
                var date = new Date();
                countdown = (date.getHours() - begin) * 3600 + (date.getMinutes() - min) * 60
+ (date.getSeconds() - sec);
                $el.find('.inform_time').text(countdown + '秒');
                settime();
                if (countdown >= 60) {
                    clearInterval(timer);
                    $el.find('.countdownTime').html('60秒');
                } else {
                    $el.find('.countdownTime').html(countdown + '秒');
                }
            },
            1000);

        });

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }
            return null;
        }

        function getType(questionType) {
            switch (questionType) {
                case 'CT001':
                    return '婚姻家庭';
                case 'CT002':
                    return '房产物业';
                case 'CT003':
                    return '交通意外';
                case 'CT006':
                    return '民间借贷';
                case 'CT004':
                    return '劳动用工';
                case 'CT008':
                    return '合同纠纷';
                case 'CT010':
                    return '人身伤害';
                case 'CT007':
                    return '其他问题';
                case 'CT064':
                    return '消费维权';
                default:
                    return false;
                    break;
            }
        }

        function settime() {
            var id = $el.find('#requestId').val();
            var questionType = $el.find('#questionType').val();
            var askingType = $el.find('#askingType').val();
            var timer;
            if (countdown % 5 === 0) {
                $.ajax({
                    type: 'GET',
                    url: 'timer',
                    data: {
                        id: id,
                        lawyerId: lawyerId
                    },
                    dataType: 'json',
                    success: function (data) {
                        var dataStatus = data.status;
                        $el.find('.end_name').text(data.lawyerName);
                        // getType(questionType)
                        var typesstring = getType(questionType);

                        if (typesstring && data.lawyerField.indexOf(typesstring) >= 0) {
                            $el.find('.end_type span').text(data.lawyerField);
                            // $el.find('.end_type ').show()
                        } else {
                            $el.find('.end_type.field').hide();
                        }
                        // debugger
                        $el.find('.goodCommentRate').text(data.goodCommentRate);
                        $el.find('.inform_middle_con').text('正在通知' + data.lawyerName + '...');
                        // debugger;
                        if (dataStatus === 3 || dataStatus === 'undefined') {
                            var reAskNames = localStorage.getItem('reAskName');
                            var lawyerFields = localStorage.getItem('lawyerField');
                            var goodCommentRates = localStorage.getItem('goodCommentRate');
                            $el.find('.end_name').text(reAskNames);
                            $el.find('.inform_middle_con').text('正在通知' + reAskNames + '...');
                            $el.find('.end_type span').text(lawyerFields);
                            $el.find('.goodCommentRate').text(goodCommentRates);
                        }
                        if (dataStatus !== 3 || dataStatus === 'undefined') {
                            localStorage.setItem('reAskAvatar', data.avatar);
                            localStorage.setItem('reAskSex', data.sex);
                            localStorage.setItem('reAskName', data.lawyerName);
                            localStorage.setItem('lawyerField', data.lawyerField);
                            localStorage.setItem('goodCommentRate', data.goodCommentRate);
                        }
                        if (dataStatus === 5 || dataStatus === 6 || dataStatus === 7 || dataStatus
=== 8 || dataStatus === 11 || dataStatus === 12) {
                            clearInterval(timer);
                            if (fromRoute) {
                                var url = encodeURI('linking?questionType=' + questionType
+ '&lawyerName=' + data.lawyerName + '&requestId=' + id + '&askingType=' + askingType
+ '&lawyerId=' + lawyerId + '&tel=' + data.tel + '&fromRoute=clerical');
                            } else {
                                var url = encodeURI('linking?questionType=' + questionType
+ '&lawyerName=' + data.lawyerName + '&requestId=' + id + '&askingType=' + askingType
+ '&lawyerId=' + lawyerId + '&tel=' + data.tel);
                            }
                            location.href = url;
                        } else if (dataStatus === 4 || dataStatus === 1 || dataStatus === 3 || dataStatus
=== 9 || dataStatus === 10 || dataStatus === 'ERROR' || dataStatus === 'ERROR1' || countdown >= 65) {
                            clearInterval(timer);
                            if (fromRoute) {
                                location.href = 'informLawyer_failed' + '?lawyerId=' + lawyerId + '&requestId='
+ id + '&questionType=' + questionType + '&askingType=' + askingType + '&fromRoute=clerical';
                            } else {
                                location.href = 'informLawyer_failed' + '?lawyerId='
+ lawyerId + '&requestId=' + id + '&questionType=' + questionType + '&askingType='
+ askingType + '&secondAskFlg=' + data.reCallNoAnswerTimes;
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

        function changeAvatar(nameOfLawyer, avatarOfLawyer, sexOfLawyer) {
            // 页面姓名及头像的更改
            $el.find('.end_name').text(nameOfLawyer);
            var questionType = getQueryString('questionType');
            var typesstring = getType(questionType);
            var localStoragelawyerField = localStorage.getItem('lawyerField');
            if (typesstring && localStoragelawyerField.indexOf(typesstring) >= 0) {
                $el.find('.end_type>span').text(localStoragelawyerField);
            } else {
                $el.find('.end_type.field ').hide();
            }

            $el.find('.goodCommentRate').text(localStorage.getItem('goodCommentRate'));

            $el.find('.inform_middle_con').text('正在通知' + nameOfLawyer + '...');
            if (avatarOfLawyer) {
                $el.find('.inform_top_img').attr('src', avatarOfLawyer);
            } else {
                if (sexOfLawyer === 'male') {
                    $el.find('.inform_top_img').attr('src', 'images/bg_touxaingnan.png');
                } else if (sexOfLawyer === 'female') {
                    $el.find('.inform_top_img').attr('src', 'images/bg_touxiangnv.png');
                }
            }
        }

        function cancelRequestOr(jumpTo) {
            $.ajax({
                url: 'cancelRequest',
                data: {
                    'requestId': $el.find('#requestId').val(),
                    'csrf': $el.find('#csrf').val()
                },
                type: 'POST',
                success: function (data) {
                    if (data === 'NG') {
                        toastOr('取消晚了，律师正在联系您');
                        setTimeout(function () {
                            location.href = jumpTo;
                        },
                        2000);
                    } else if (data === 'OK') {
                        toastOr('取消成功');
                        setTimeout(function () {
                            location.href = jumpTo;
                        },
                        2000);
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }
                }
            });
        }

        // 根据不同入口返回不同上一页页面
        function gobackHandle() {
            var jumpTo;
            if (lawyerId) {
                if (getQueryString('fromRoute') === 'clerical') {
                    window.history.go(- 1);
                } else {
                    jumpTo = 'orderlist';
                    var title = '';
                    var main = '累计取消三次，当天将无法再次 咨询，确定取消本次咨询吗？';
                    var yes = '确定取消';
                    var no = '点错了';
                    var backOr;
                    backOr(title, main, yes, no,
                    function () {
                        // 确认取消时
                        toastOr('正在取消咨询');
                        // 调用接口，判断是否取消成功
                        setTimeout(function () {
                            cancelRequestOr(jumpTo);
                        },
                        2000);
                    },
                    function () {});
                }
            } else {
                jumpTo = getBaseUrl();
                var title = '';
                var main = '累计取消三次，当天将无法再次咨询，确定取消本次咨询吗？';
                var yes = '确定取消';
                var no = '点错了';
                var backOr;
                backOr(title, main, yes, no,
                function () {
                    // 确认取消时
                    toastOr('正在取消咨询');
                    // 调用接口，判断是否取消成功
                    setTimeout(function () {
                        cancelRequestOr(jumpTo);
                    },
                    2000);
                },
                function () {

                });

            }
        }

        /* common.js*/
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
    };

    return customElement;
});