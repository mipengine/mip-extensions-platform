/**
 * @file mip-ilaw66-falv-fvindex 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    // zepto不支持is方法以及某些属性选择器，所以选用jquery;
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var wW = $el.find(window).width();
        var wMenu = wW - 110;
        var channel = getQueryString('channel');
        if (!channel) {
            channel = $el.find('#channel').val();
        }

        $el.find('.title_more').click(function () {
            $el.find('#box-1').css('left', wMenu + 'px');
            if (channel === 'leezyb') {
                toLogin('mine');
            }

            $el.find('.popUp_clickMore').show();
        });
        $el.find('.title_more_order').click(function () {
            $el.find('#box-1').css('left', wMenu + 'px');

            $el.find('.popUp_clickMore_order').show();
        });

        $el.find('.popUp_clickMore').click(function () {
            $el.find('.popUp_clickMore').hide();
        });

        $el.find('#servicephone').click(function () {
            alert('400 860 7766');
        });

        $el.find('.popUp_clickMore_order').click(function () {
            $el.find('.popUp_clickMore_order').hide();
        });

        $el.find('#orderlist').click(function () {
            window.top.location.href = 'mip_orderlist?channel=' + channel + '&frompage=index';
        });

        $el.find('#account').click(function () {
            window.top.location.href = 'mip_lawyerlist?channel=' + channel;
        });

        // 跳转订单列表（咨询套餐）
        $el.find('#pageageorderlist').click(function () {
            window.top.location.href = 'consultingpackages_orderlist';
        });

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

        $el.find('.backfirst-list-alt').click(function () {
            window.top.location.href = 'mip_orderlist';
        });
        $el.find('.backfirst-home').click(function () {
            window.top.location.href = 'mip_index.html';
        });

        $el.find('.icon_orderlist').click(function () {
            window.top.location.href = 'mip_orderlist';
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
                //  $('body').css('overflow','auto');
                $el.find('.success_result').hide();
                $el.find('.error_result').hide();
                window.top.location.href = 'conment.html';
            },
                3000);
        });

        //  评价页面

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
            }
            else {
                return false;
            }
        }

        //  公共的
        $el.find('.backfirst-list-alt').click(function () {
            window.top.location.href = 'mip_orderlist';
        });
        $el.find('.backfirst-home').click(function () {
            window.top.location.href = 'mip_index.html';
        });

        $el.find('.icon_orderlist').click(function () {
            window.top.location.href = 'mip_orderlist';
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
                //  $('body').css('overflow','auto');
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
                        $el.find('.popUp_sysErr').fadeIn();
                    }
                    else if (data === 'ERROR2') {
                        $el.find('#err_msg').html('您有订单未支付，请支付后再咨询');
                        $el.find('.popUP_sysErr').fadeIn();
                    }
                    else if (data === 'ERROR3') {
                        $el.find('#err_msg').html('您有订单未结束，请等待1分钟后再试');
                        $el.find('.popUP_sysErr').fadeIn();
                    }
                    else {
                        if (lawyerId) {
                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
                                === 'fengniao' || $el.find('#channel').val() === 'fengniao') {

                                window.top.location.href = 'request_wx?data=' + data + '&questionType='
                                    + questionType + '&lawyerId=' + lawyerId;
                            }
                            else {

                                window.top.location.href = 'mip_request?data=' + data + '&questionType='
                                    + questionType + '&lawyerId=' + lawyerId;
                            }
                        }
                        else {

                            if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
                                === 'fengniao' || $el.find('#channel').val() === 'fengniao') {

                                window.top.location.href = 'request_wx?data='
                                    + data + '&questionType=' + questionType;
                            }
                            else {

                                window.top.location.href = 'mip_request?data='
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
                    var fromChannel = localStorage.getItem('fromChannel');
                    if (id !== '') {
                        //  传入lawyerId
                        if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp' || fromChannel
                            === 'fengniao' || $el.find('#channel').val() === 'fengniao') {
                            window.top.location.href = 'request_wx?data=' + id + '&questionType='
                                + questionType + '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                        }
                        else {
                            window.top.location.href = 'mip_request?data=' + id + '&questionType='
                                + questionType + '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                        }
                    }
                    else {
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.popUP_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        }
                        else {
                            var msg = data.error;
                            $el.find('#tips').html(msg);
                            $el.find('.popUP_confirm').hide();
                            $el.find('.popUP_uncheckErr').fadeIn();
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
                        window.top.location.href = 'mip_informLawyer?data=' + id + '&questionType='
                            + questionType + '&askingType=' + askingType + '&lawyerId=' + lawyerId;
                    }
                    else {
                        $el.find('.loadingArea').hide();
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.popUP_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        }
                        else {
                            var msg = data.error;
                            $el.find('#tips').html(msg);
                            $el.find('.popUP_confirm').hide();
                            $el.find('.popUP_uncheckErr').fadeIn();
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
                        window.top.location.href = 'mip_informLawyer?data=' + id + '&questionType=' + questionType
                            + '&askingType=' + askingType + '&lawyerId=' + lawyerId + '&PABackJumpFlg=index';
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
                            $el.find('.popUP_confirm').hide();
                            $el.find('.popUP_uncheckErr').fadeIn();
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
                        window._hmt
                        && window._hmt.push(['_trackEvent', $el.find('#channel').val() + '_falvvip', 'click']);
                        window.top.location.href = 'consulting_testament';
                    }
                    else if (b === 'ST003') {
                        // 百度统计
                        window._hmt
                        && window._hmt.push(['_trackEvent', $el.find('#channel').val() + '_tehui', 'click']);
                        window.top.location.href = 'mip_preferential?serviceType=' + questionType;
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
                This.body = $('body');
                var btnN = '<div class="back-leave" id="js-back-leave">' + This.option.yes + '</div>'
                    + '<div class="back-continue" id="js-back-continue">' + This.option.no + '</div>';
                if (!This.option.yes) {
                    btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
                        + This.option.no + '</div>';
                }

                This.main = '<div class="back__pop popUP" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper"></div>' + '<div class="back__popLayer">' + '<span>'
                    + This.option.title + '</span>' + '<span>' + This.option.main + '</span>'
                    + btnN + '</div>' + '</div>';
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
                    + '<div class="layer__wrapper layer__wrapper__toast"></div>' + '<div class="back__popLayer__toast">'
                    + '<span>' + This.option.main + '</span>' + '</div>' + '</div>';
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

        /* index.js */
        var questionType;
        var tabHref;
        var lawyerId = '';
        var flg = 0;
        var qSt = getQueryString('questionType');
        var search = location.search.toLowerCase();
        var channel = $el.find('#channel').val();
        var userId = $el.find('#userId').val();

        if (JSON.parse(localStorage.getItem('reservationSuccess'))
            && localStorage.getItem('reservationknowFlg') !== 1) {
            // 预约页面预约成功时，跳转到首页显示模块
            $el.find('.reservationSuccess_bg').show();
        }

        $el.find('.reservationSuccess_close').click(function () {
            $el.find('.reservationSuccess_bg').hide();
            localStorage.setItem('reservationknowFlg', 1);
        });

        //  初始化首页价格
        $.ajax({
            url: 'getPrice',
            type: 'GET',
            data: {
                channel: $el.find('#channel').val()
            },
            success: function (data) {
                console.log(data);
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

        localStorage.setItem('channel', $el.find('#channel').val());

        //  $el.find('img.lazy').lazyload({ effect: 'fadeIn' });
        var wH = $el.find(window).height();
        var wW = $el.find(window).width();
        $el.find('.main_block').css('height', wH + 'px');

        var timeOutEvent = 0;
        $el.find('.media').on({
            touchstart: function (e) {
                timeOutEvent = setTimeout(longPress, 300);
                $(this).attr('class', 'media').css('background', 'rgba(218,209,204, 1)');
            }
        });

        /*有userID就执行余额显示*/
        function orLogoin() {
            $.ajax({
                type: 'GET',
                url: 'getUserIdFromServer',
                success: function (data) {
                    console.log(data);
                    if (data) {
                        loadUserAccountInfo();
                    }
                    else {
                        console.log(null);
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }
        orLogoin();

        /*有userID就执行余额显示*/

        function loadUserAccountInfo() {
            $.ajax({
                type: 'GET',
                url: 'getUserAccountInfo',
                success: function (data) {
                    console.log(data);
                    if (!data) {
                    }
                    else {
                        if (!data.availableBalanceString || data.availableBalanceString < 1) {
                            $el.find('#accountBalance').text('');
                        }
                        else {
                            $el.find('#accountBalance').text('账户余额：¥' + data.availableBalanceString);
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

        var agreeImgSrc = $el.find('.radio-rule').find('.radio-rule-iconCT015').attr('src');
        $el.find('.radio-rule').on('click', function () {
            console.log(agreeImgSrc);
            $(this).hasClass('rule-checked')
                ? $(this).removeClass('rule-checked') : $(this).addClass('rule-checked');
            var type = $(this).data('type');
            if ($el.find('#radio-rule-icon' + type).hasClass('isChecked')) {
                $el.find('#radio-rule-icon' + type)
                    .attr('src', 'tempclearbaoxianshi/images/button_ok.png').removeClass('isChecked');
            }
            else {

                /*$el.find('#radio-rule-icon' + type).attr('src', 'tempclearbaoxianshi/images/button_ok_c.png').addClass('isChecked');*/
                $el.find('#radio-rule-icon' + type).attr('src', agreeImgSrc).addClass('isChecked');
            }
            isCheckedConsulting(type);
        });
        $el.find('.rulePA').on('click', function () {
            window.top.location.href = 'rule_clearbaoxianshi';
        });
        $el.find('.tab-content__close').on('click', function () {
            $(this).parent().parent().removeClass().addClass('tab-pane');
            flg = 0;
        });
        $el.find('.media').on('click', function (event) {
            console.log($(this).data('href'));
            tabHref = $(this).data('href');
            $el.find('#' + $(this).data('href')).removeClass().addClass('tab-pane active');
            flg = 1;
            event.preventDefault();
        });

        /*新版操作end*/
        document.addEventListener('touchmove', function (event) {
            // 监听滚动事件
            if (flg === 1) {
                // 判断是遮罩显示时执行，禁止滚屏
                // 最关键的一句，禁止浏览器默认行为
                event.preventDefault();
            }

        });
        $el.find('.media').click(function () {
            questionType = $(this).data('type');
            // 百度统计
            // window._hmt && window._hmt.push(['_trackEvent', questionType, 'click']);
        });

        $el.find('.link_btn_uncheckErrConfirm').click(function () {
            $el.find('.popUP_err').hide();
        });

        // 调用接口显示访问人数
        $.ajax({
            type: 'GET',
            url: 'getOrderCount',
            dataType: 'json',
            success: function (a) {
                console.log(a);
                var rvFlg = false;
                if (!a) {
                    return;
                }

                var b;
                if (a.RQ) {
                    b = a.RQ;

                    /*slogon部位内容start*/
                    lawyerId = b.lawyerId;
                    questionType = b.questionType;
                    var pathnamePage = location.pathname;
                    var timestamp3;

                    if (a.RV) {
                        rvFlg = true;
                        timestamp3 = a.RV.reservationTimeString;
                    }

                    if (pathnamePage.indexOf('articleNav') < 1) {
                        // 首页加载视频时
                        if (b.countAll && b.countToday && !b.payState && !rvFlg) {
                            // 未咨询过、未预约过的用户
                            var tempMoreHtml = '';
                            tempMoreHtml += '<li><div class="total_user">'
                                + '<mip-img src="tempclearbaoxianshi/images/laba.png"></mip-img>'
                                + '累积服务人数&nbsp;<i class="userTotalNum">'
                                + numtransform(b.countAll) + '人</i> </div></li>';
                            tempMoreHtml += '<li><div class="total_user">'
                                + '<mip-img src="tempclearbaoxianshi/images/laba.png"></mip-img>'
                                + '今日咨询人数&nbsp;<i class="userTodayNum">'
                                + numtransform(b.countToday) + '人</i> </div></li>';
                            showSlogonMsg(tempMoreHtml, 2000);
                        }
                        else if (!b.payState && rvFlg) {
                            // 未咨询过、有预约的用户
                            var tempHtml = '<ul>';
                            tempHtml += '<li><div class="tocheckreservation">您预约了'
                                + timestamp3 + '的咨询&nbsp;<p id="tocheckreservation">查看预约&nbsp;&#9658</p></div></li>';
                            tempHtml += '</ul>';
                            $el.find('.slogonMsg').addClass('slogonMsg_new');
                            $el.find('.slogonMsg').html(tempHtml);
                        }
                        else {
                            if (b.payState === 6) {
                                // 咨询过，欠费的用户
                                var tempHtml = '<ul>';
                                tempHtml += '<li><div class="topay"><mip-img src="tempclearbaoxianshi/images/laba.png">'
                                    + '</mip-img>'
                                    + '您有一个未支付订单&nbsp;<p id="topay">去支付&nbsp;&#9658</p></div></li>';
                                if (rvFlg) {
                                    tempHtml += '<li><div class="tocheckreservation">您预约了' + timestamp3
                                        + '的咨询&nbsp;<p id="tocheckreservation">查看预约&nbsp;&#9658</p></div></li>';
                                }

                                tempHtml += '</ul>';
                                $el.find('.slogonMsg').addClass('slogonMsg_new');
                                if (rvFlg) {
                                    showSlogonMsg(tempHtml, 4000);
                                }
                                else {
                                    $el.find('.slogonMsg').html(tempHtml);
                                }
                                haveNoPaidOrder(b);
                            }
                            else if (b.payState === 8) {
                                // 咨询过、未欠费的用户
                                var a = +b.starLevle;
                                var lawyerName;
                                if (!a || a >= 3) {
                                    var j = '';
                                    if (b.name) {
                                        j = b.name.substring(0, 1);
                                        lawyerName = b.name.substring(0, 1);
                                    }

                                    var tempHtml = '<ul>';
                                    tempHtml += '<li><div class="toask">'
                                        + '<mip-img src="tempclearbaoxianshi/images/laba.png"></mip-img>'
                                        + '温馨提示：向上次咨询' + j + '律师提问&nbsp;<p id="toask">'
                                        + '继续问&nbsp;&#9658</p></div></li>';
                                    if (rvFlg) {
                                        tempHtml += '<li><div class="tocheckreservation">您预约了'
                                            + timestamp3 + '的咨询&nbsp;<p id="tocheckreservation">'
                                            + '查看预约&nbsp;&#9658</p></div></li>';
                                    }

                                    tempHtml += '</ul>';
                                    $el.find('.slogonMsg').addClass('slogonMsg_new');
                                    if (rvFlg) {
                                        showSlogonMsg(tempHtml, 4000);
                                    }
                                    else {
                                        $el.find('.slogonMsg').html(tempHtml);
                                    }

                                    var csrfToken = $el.find('#_csrf').val();
                                    var askingType = '01';
                                    var continueAskPage = 'index';
                                    $el.find('#toask').click(function () {
                                        $el.find('.loadingArea').show();
                                        continueAskNew(b.lawyerId, b.questionType, askingType,
                                            csrfToken, continueAskPage);
                                    });
                                }
                                else {
                                    var tempMoreHtml = '';
                                    tempMoreHtml += '<li><div class="total_user">'
                                        + '<mip-img src="tempclearbaoxianshi/images/laba.png"></mip-img>'
                                        + '累积服务人数&nbsp;<i class="userTotalNum">'
                                        + numtransform(b.countAll) + '人</i> </div></li>';
                                    tempMoreHtml += '<li><div class="total_user">'
                                        + '<mip-img src="tempclearbaoxianshi/images/laba.png"></mip-img>'
                                        + '今日咨询人数&nbsp;<i class="userTodayNum">'
                                        + numtransform(b.countToday) + '人</i> </div></li>';
                                    showSlogonMsg(tempMoreHtml, 2000);
                                }
                            }
                        }
                        $el.find('#tocheckreservation').click(function () {
                            checkReservationExpired();
                        });
                    }
                }

                /*slogon部位内容end*/
            },
            error: function (a) {
                console.log('获取访问人数：' + a.countAll);
            }
        });

        function numtransform(str) {
            var newStr = new Array(str.length + parseInt(str.length / 3, 16));
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

        /*首页送卡状态判断+弹层信息start*/
        // 从url获取frompage属性，true存在时表示支付成功，可查看卡券状态；false不存在时调用接口，判断是否谈遮罩层
        var pagefrom = getQueryString('pagefrom');
        console.log(flg);
        if (pagefrom === 'buyServiceCard' && flg === 0) {
            // 从支付成功页面过来，可查看卡券状态
            $el.find('.checkcardstatus-bg').show();
            $el.find('.sendcardstatus-bg').hide();
        }
        else {
            // 调用接口显示赠送卡券的信息
            $.ajax({
                url: 'card/getIfHasGift?_csrf=' + $el.find('#_csrf').val(),
                type: 'POST',
                success: function (data) {
                    console.log(data);
                    if (data.length === 0) {
                        $el.find('.sendcardstatus-bg').hide();
                        $el.find('.checkcardstatus-bg').hide();
                    }
                    else {
                        // 赠送者手机号
                        var phonenum = (data[0].sendPhone).substr((data[0].sendPhone).length - 4, 4);
                        // T02年卡；T01畅聊卡；Coupon优惠券
                        var sendtype = data[0].type;
                        // 该卡在用户关联
                        var usercardid = data[0].userCardId;
                        // 有赠送卡券时，显示赠送信息
                        $el.find('#phonenum').html(phonenum);
                        if (sendtype === 'T02') {
                            // 赠送的是年卡
                            $el.find('#sendcardstatus').removeClass().addClass('sendcardstatus yearcard');
                            $el.find('#cardtype').html('问律师包年卡');
                        }
                        else if (sendtype === 'T01') {
                            // 赠送的是畅聊卡
                            $el.find('#sendcardstatus').removeClass().addClass('sendcardstatus chatingcard');
                            $el.find('#cardtype').html('问律师畅聊卡');
                        }
                        else if (sendtype === 'Coupon') {
                            // 赠送的是优惠券
                            $el.find('#sendcardstatus').removeClass().addClass('sendcardstatus coupons');
                            $el.find('#cardtype').html('问律师优惠券');
                        }
                        else if (sendtype === 'T0201') {
                            // 赠送的是无忧卡
                            $el.find('#sendcardstatus').removeClass().addClass('sendcardstatus card');
                            $el.find('#cardtype').html('无忧卡');
                        }
                        else if (sendtype === 'T0401') {
                            // 赠送的是法律文书卡
                            $el.find('#sendcardstatus').removeClass().addClass('sendcardstatus card');
                            $el.find('#cardtype').html('法律文书卡');
                        }
                        else if (sendtype === 'T0402') {
                            // 赠送的是律师约见卡
                            $el.find('#sendcardstatus').removeClass().addClass('sendcardstatus card');
                            $el.find('#cardtype').html('律师约见卡');
                        }

                        if (flg === 1) {
                            $el.find('.sendcardstatus-bg').css('display', '-webkit-box');
                            $el.find('.checkcardstatus-bg').hide();
                        }
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                    var loadStatus = 'error';
                }
            });
        }

        // 点击x关闭
        $el.find('.sendcardstatus-close').on('touchend', function (event) {
            $el.find('.sendcardstatus-bg').fadeOut();
            $el.find('.checkcardstatus-bg').fadeOut();
            event.stopPropagation();
        });

        // 点击白底区域跳转
        $el.find('.sendcardstatus').on('touchend', function (event) {
            window.top.location.href = 'mycardandcoupons';
            event.stopPropagation();
        });

        // 从支付成功页面过来，可查看卡券---跳转
        $el.find('.checkcardstatus-go').on('touchend', function (event) {
            window.top.location.href = 'mycardandcoupons';
            event.stopPropagation();
        });

        // 点击白底以外区域关闭
        $el.find(window).on('touchend', function (event) {
            $el.find('.sendcardstatus-bg').fadeOut();
            $el.find('.checkcardstatus-bg').fadeOut();
            var tar = $el.find(event.target);
            if (tar.parents('.myRelative-bg').length === 0) {
                $el.find('.myRelative-bg').fadeOut();
            }

            event.stopPropagation();
        });

        /*首页送卡状态判断+弹层信息end*/

        /*新版(首页+开始咨询页合并)操作start*/
        var PopUpModal = document.getElementById('popUP');
        var linkUndo = document.getElementById('link_undo');
        var linkDone = document.getElementById('link_done');
        // 非服务时间提示框取消按钮事件
        linkUndo.addEventListener('click', function () {
            PopUpModal.style.display = 'none';
        });

        // 非服务时间提示框确定按钮事件
        linkDone.addEventListener('click', function () {
            PopUpModal.style.display = 'none';
            startConsulting(questionType);
        });

        /*暂挪去支付继续问弹窗*/
        $el.find('.link_btn_sysErrConfirm').click(function () {
            $el.find('.popUP_sysErr').hide();
        });

        $el.find('.link_btn_unFinishedBillErrConfirm').click(function () {
            $el.find('.popUP_unFinishedBillErr').hide();
        });

        $el.find('.link_btn_unpaidErrConfirm').click(function () {
            window.top.location.href = 'mip_orderlist';
        });

        $el.find('.link_btn_uncheckErrConfirm').click(function () {
            $el.find('.popUP_uncheckErr').hide();
            $el.find('.popUP_confirm').hide();
        });

        /*暂挪去支付继续问弹窗*/

        //  希望重试
        $el.find('#still_reAsk').click(function () {
            $el.find('.popUP_confirm').hide();
            $el.find('.loadingArea').show();
            continueAsk2(lawyerId, questionType, '01', $el.find('#_csrf').val());
        });
        // 咨询其他律师时
        $el.find('.link_others').click(function () {
            $el.find('.popUP_confirm').hide();
            startConsulting(questionType);
        });

        /*首页送卡状态判断+弹层信息end*/

        $el.find('.media').click(function () {
            questionType = $(this).data('type');
            var num = $(this).data('num');
            // 百度统计
            window._hmt
            && window._hmt.push(['_trackEvent', questionType, 'click']);
            window._hmt
            && window._hmt.push(['_trackEvent', questionType + '_' + $el.find('#channel').val() + '_' + num, 'click']);
        });
        // 触屏时底色变更
        var timeOutEvent = 0;
        $el.find('.media').on({
            touchstart: function (e) {
                // 点击效果
                timeOutEvent = setTimeout(longPress, 300);
                $(this).attr('class', 'media').css('background', 'rgba(218,209,204, 1)');
            }
        });
        $el.find('.media').on({
            touchmove: function (e) {
                longPress();
            }
        });
        // 滚动时恢复白色底
        $el.find(window).scroll(function (event) {
            longPress();
            event.stopPropagation();
        });

        $el.find('.media-otherservice').click(function () {
            questionType = $(this).data('type');
            if (questionType === 'ST002') {
                // 百度统计
                window._hmt
                && window._hmt.push(['_trackEvent', $el.find('#channel').val() + '_falvvip', 'click']);
                window.top.location.href = 'consulting_testament';
            }
            else if (questionType === 'ST003') {
                // 百度统计
                window._hmt
                && window._hmt.push(['_trackEvent', $el.find('#channel').val() + '_tehui', 'click']);
                window.top.location.href = 'preferential?serviceType=' + questionType;
            }
            else {
                $el.find('.popUP_uncheckErr').fadeIn();
            }
        });

        $el.find('.consulting').on('click', function () {
            if (!$(this).hasClass('noChecked')) {
                var questionType = $(this).data('type');
                directOrOrder(questionType);
            //  window.top.location.href = 'request?questionType=' + questionType;
            }
            else if ($(this).hasClass('noChecked')
                && !$el.find('#js-radio-rule').hasClass('rule-checked')) {
                alert('请阅读并同意《问律师用户服务协议》');
            }

        });

        function longPress() {
            timeOutEvent = 0;
            $el.find('.media').css('background', '#fff');
        }

        function showSlogonMsg(tempMoreHtml, delayTime) {
            var tempHtml = '<ul  id="slogonMsgId">';
            tempHtml += tempMoreHtml;
            tempHtml += '</ul>';
            $el.find('.slogonMsg').html(tempHtml);
            startmarquee(20, 2000);
        }
        // 上下轮播
        function startmarquee(speed, delay) {
            // 获取行高
            var lineH = $el.find('#slogonMsgId').find('li:first').height();
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
                    o.style.marginTop = parseInt(o.style.marginTop, 16) - 1 + 'px';
                }
            }

            function scrolling() {
                if (parseInt(o.style.marginTop, 10) % lineH !== 0) {
                    o.style.marginTop = parseInt(o.style.marginTop, 16) - 1 + 'px';
                    if (Math.abs(parseInt(o.style.marginTop, 16)) >= o.scrollHeight / 2) {
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

        //  开始咨询调用接口
        function startConsulting(questionType) {
            $.ajax({
                url: 'greeting?questionType=' + questionType + '&_csrf=' + $el.find('#_csrf').val(),
                type: 'POST',
                success: function (data) {
                    console.log(data);
                    if (data === 'ERROR' || data === 'ERROR1') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        $el.find('.popUP_sysErr').show();
                    }
                    else if (data === 'ERROR2') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        $el.find('.popUP_unpaidErr').show();
                    }
                    else if (data === 'ERROR3') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        $el.find('.popUP_unFinishedBillErr').show();
                    }
                    else if (data === 'ERROR4') {
                        //  toastOr('您今日取消咨询已达3次，请明天再来');
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        alert('您今日取消咨询已达3次，请明天再来');
                    }
                    else {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        window.top.location.href = 'mip_request?data=' + data + '&questionType=' + questionType;
                    }
                },
                error: function () {
                    window.location.reload();
                }
            });
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
        // 解析url参数值
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
        }

        /*新版(首页+开始咨询页合并)操作start*/
        var PopUpModal = document.getElementById('popUP');
        var linkUndo = document.getElementById('link_undo');
        var linkDone = document.getElementById('link_done');
        function isCheckedConsulting(type) {
            //  判断开始咨询按钮状态
            if ($el.find('#js-radio-rule' + type).hasClass('rule-checked')) {
                $el.find('#js-consulting' + type).removeClass('noChecked');
            }
            else {
                $el.find('#js-consulting' + type).addClass('noChecked');
            }
        }

        // 判断是否是服务时间
        function ifServiceTime() {
            return (new Date().getHours() >= 8 && new Date().getHours() <= 22);
        }

        function checkReservationExpired() {
            $.ajax({
                type: 'GET',
                url: 'reservation/findRequestReservationByUserId',
                success: function (data) {
                    console.log(data);
                    if (data.info) {
                        window.top.location.href = 'mip_myreservation';
                    }
                    else {
                        toastOr(data.message);
                    }
                },
                error: function (a) {
                    alert('系统异常，请稍后再试');
                    window.location.reload();
                }
            });
        }

        var flg = 0;
        // 滚屏控制 有弹出层出现 不可滚动
        function controlScroll() {
            flg = $el.find('.background_kuang').css('display') !== 'none' ? 1 : 0;
        }
        $el.find(window).scroll(function (a) {
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
                        requestIdList: b.requestId
                    },
                    url: 'checkFreeBill',
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
                    toastOr(d);
                    setTimeout(function () {
                        window.location.reload();
                    },
                        2e3);
                }
                else {
                    $.ajax({
                        type: 'get',
                        url: 'getRequestId',
                        data: {
                            requestId: b.requestId
                        },
                        async: false,
                        success: function (data) {
                            console.log('是否合并支付单号：' + data);
                            window.top.location.href = 'mip_couponPay?requestId='
                            + data + '&questionType=' + b.questionType;
                        },
                        error: function () {
                            window.location.reload();
                        }
                    });
                }
            });
        }
        // 开始咨询前check是否登录函数
        function directOrOrder(questionType) {
            if ($el.find('#userId').val()) {
                startConsulting(questionType);
            }
            else {
                window.top.location.href = 'mip_blank?questionType='
                    + questionType + '&channel=' + channel;
            }
        }

        function startConsulting(questionType) {
            $.ajax({
                url: 'greeting?questionType=' + questionType
                    + '&_csrf=' + $el.find('#_csrf').val(),
                type: 'POST',
                success: function (data) {
                    console.log(data);
                    if (data === 'ERROR' || data === 'ERROR1') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        $el.find('.popUP_sysErr').show();
                    }
                    else if (data === 'ERROR2') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        $el.find('.popUP_unpaidErr').show();
                    }
                    else if (data === 'ERROR3') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        $el.find('.popUP_unFinishedBillErr').show();
                    }
                    else if (data === 'ERROR4') {
                        //  toastOr('您今日取消咨询已达3次，请明天再来');
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        alert('您今日取消咨询已达3次，请明天再来');
                    }
                    else {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        window.top.location.href = 'mip_request?data=' + data + '&questionType=' + questionType;
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
