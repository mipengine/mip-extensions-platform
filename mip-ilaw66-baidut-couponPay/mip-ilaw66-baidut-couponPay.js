/**
 * @file mip-ilaw66-baidut-couponPay 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('jquery');

    /**
     * 因有些方法zepto不支持故使用jquery
     */

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var readyToPayAmountflg = true; // 默认true，指有支付金额的时候
        var channel = localStorage.getItem('channel');
        var questionType = getQueryString('questionType');
        var ordermount = 0;
        var RUN_ON_BOCOMM_APP = localStorage.getItem('RUN_ON_BOCOMM_APP');
        // 加载获取requestId
        var MIP = window.MIP;
        var requestId = getQueryString('requestId');
        var sessionId = getQueryString('sessionId');
        var seidtime;
        var paystarts = 0;
        setTimeout(function () {
            var htsesi = $el.find('#sesiid').html();
            if (htsesi) {
                sessionId = htsesi;
            }
            else {
                seidtime = setInterval(function () {
                    var htsesis = $el.find('#sesiid').html();
                    if (htsesis) {
                        sessionId = htsesis;
                        clearInterval(seidtime);
                    }

                }, 800);
            }
        }, 1000);

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
            else {
                hosturl = 'https://' + hostname + '/jasmine/';
            }
        }
        returhostname();
        console.log(hosturl);
        function locahost(topsurl, toptitle) {
            if (topsurl === './') {
                topsurl = 'baidusearch';
            }

            var topurl = hosturl + topsurl;
            if (MIP.viewer.isIframed) {
                if (topsurl === 'baidusearch') {
                    window.top.location.href = 'https://m.baidu.com/mip/c/s/www.ilaw66.com/jasmine/baidusearch';
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
        $el.find('#requestId').val(requestId);

        // 如果是微信登入,获取微信验证code
        var code = getQueryString('code');

        $el.find('.glyphicon-menu-left').click(function () {
            $el.find('.back__pop').show();
            // “狠心离开”按钮回到首页
            $el.find('#js-back-leave').click(function () {
                //              window.top.location.href = './';
                locahost('./', '电话咨询');
            });
            // “继续支付”按钮事件
            $el.find('#js-back-continue').click(function () {
                $el.find('#back__pop').hide();
            });
        });
        load();
        // 现金支付的按钮选中效果
        $el.find('.sel_pay').click(function () {
            var no = $(this).data('no');
            $el.find('.payType_cash .allow_icon2').show();
            $el.find('.payType_cash .allow_icon1').hide();

            /*$(this).css({ "background": "none" })
                .siblings(".sel_pay")
                .css({ "background": "rgba(0,0,0,0.02)" });*/
            $(this).children('.allow_icon2').hide();
            $(this).children('.allow_icon1').show();
            $(this).children('.allow_icon1').css('display', '-webkit-box');
            // 将所选的支付方式放入隐藏表单
            $el.find('input[name=\'paytype\']').val(no);
            console.log($el.find('input[name=\'paytype\']').val());
        });

        // 支付订单详情页，点击刷新
        $el.find('.freshOrder').click(function () {
            checkTalking(requestId);
        });

        $el.find('#err_confirm').click(function () {
            $el.find('.popUp_sysErr').hide();
        });

        // 立即支付
        $el.find('#js-pay-button').click(function () {
            if (!paystarts) {
                payload();
            }

        });

        function payload() {

            var freeFlg = '0'; // 没有订单免单
            var freeMessage = '';
            //          var htsesisf = $el.find('#sesiid').html();
            //          if (htsesisf) {
            //              sessionId = htsesi;
            //          }else{
            //          	  $el.find('.pay__popUp_success .pay__popLayer span').text('请稍等');
            //          	  return;
            //          }
            $.ajax({
                async: false,
                type: 'GET',
                data: {
                    requestIdList: getQueryString('requestId'),
                    sessionId: sessionId
                },
                url: hosturl + 'checkFreeBill',
                success: function (data) {
                    if (data.result === '2') {
                        freeFlg = '2';
                    }
                    else if (data.result === '1') {
                        freeFlg = '1';
                    }

                    freeMessage = data.message;
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
            if (freeFlg === '2') {
                //              toastOr(freeMessage);
                setTimeout(function () {
                    //                  window.top.location.href = 'orderlist';
                    locahost('./', '电话咨询');
                }, 2000);
                return;
            }
            else if (freeFlg === '1') {
                //              toastOr(freeMessage);
                setTimeout(function () {
                    window.location.reload(); // 重新刷新页面，获取是否已成免单
                }, 2000);
                return;
            }

            if ($el.find('#unpaidAmount').text() && $el.find('#unpaidAmount').text() > 0) {
                console.log('现金支付');
                // 调用接口
                var CouponPaytype = document.getElementById('coupon_paytype').value;
                var data = {};
                if ($el.find('#requestId').val().indexOf(',') > 0) {
                    data.requestId = -1;
                }
                else {
                    data.requestId = $el.find('#requestId').val();
                }
                data._csrf = $el.find('#_csrf').val();
                data.questionType = questionType;
                //              data.questionType = 'CT001';
                data.userCouponId = $el.find('#couponId').val();
                var hostnames = location.hostname;
                var payhosturl;
                if (hostnames === 'www-ilaw66-com.mipcdn.com') {
                    payhosturl = 'https://m.baidu.com/mip/c/s/www.ilaw66.com/jasmine/';
                }
                else {
                    payhosturl = hosturl;
                }
                var encodeurl = encodeURIComponent('mipilaw66baidu_order?requestId='
                    + $el.find('#requestId').val() + '&questionType=' + questionType
                    + '&sessionId=' + sessionId + '&paystart=1');
                data.returnUrl = payhosturl + encodeurl;
                if ($el.find('#cardId').val()) {
                    data.cardId = $el.find('#cardId').val();
                }

                data.sessionId = sessionId;
                if (!sessionId) {
                    return;
                }

                //                				debugger
                $.ajax({
                    type: 'POST',
                    url: hosturl + 'pay/baidupay',
                    data: data,
                    success: function (data) {
                        paystarts = 1;
                        //                  	debugger
                        // {"cashier_url":"https"}
                        if (data && data.cashier_url) {
                            //                          window.top.location.href = data.cashier_url;
                            //							$el.find('.callList').show()
                            $el.find('#js-pay-button').html('<a data-type="mip" href="' + data.cashier_url
                                + '">立即支付 ¥ <i id="unpaidAmount">' + ordermount + '</i></a>');
                        }
                        else if (data.message === 'ERROR1') {
                            $el.find('.popUp_sysErr').fadeIn();
                            $el.find('#err_msg').html('您无需支付该笔订单');
                            $el.find('#err_confirm').click(function () {
                                locahost('./', '电话咨询');
                            });
                        }
                        else {
                            $el.find('.popUp_sysErr').fadeIn();
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

        function load() {
            // 用户手动操作 cardId:卡券Id cardType:卡券类型 ifUseCard:是否使用卡
            var cardId = $el.find('#cardId').val();

            var cardType = $el.find('#cardType').val();
            var ifUseCard = '-1';
            var requestId = $el.find('#requestId').val();
            // 因为合并支付时跳转过来的url中requestId会用逗号分隔
            if (requestId.indexOf(',') > 0) {
                requestId = -1;
            }

            var savedMoneyflag = $el.find('#savedMoneyflag').val();
            var couponId = $el.find('#couponId').val();

            $el.find('.getOrderSuccess').show();
            $el.find('.getOrderFail').hide();
            var pageFromFlg = localStorage.getItem('linkingOrding');
            if (pageFromFlg === 'linkingOrding') {
                // 从下单linking页面支付按钮，4的状态跳转过来的，为未获取订单状态
                $el.find('.layerAsk__callMinutes span:nth-child(2)').text('--');
                $el.find('.layerAsk__callPrice span:nth-child(2)').text('--');
                $el.find('.getOrderSuccess').hide();
                $el.find('.getOrderFail').show();
                localStorage.setItem('linkingOrding', 'linkingOrdingGone');
            }

            var url = 'card/getMyUnpaidOrders?requestId=' + requestId;
            if (ifUseCard) {
                url = 'card/getMyUnpaidOrders?requestId=' + requestId + '&ifUseCard=' + ifUseCard;
            }
            else if (cardType !== 'Coupon') {
                if (getQueryString('togetherOrderFlg') === 1) {
                    url = 'card/getMyUnpaidOrders?cardId=' + cardId + '&cardType=' + cardType;
                }
                else {
                    url = 'card/getMyUnpaidOrders?requestId=' + requestId + '&cardId='
                        + cardId + '&cardType=' + cardType;
                }
            }
            else {
                url = 'card/getMyUnpaidOrders?requestId=' + requestId + '&couponId='
                    + couponId + '&cardType=' + cardType;
            }

            $el.find('.payType_coupon_use span:nth-of-type(3)').show(); // 重新load之后再加载
            $el.find('#savedMoney').text(savedMoneyflag);

            $.ajax({
                type: 'GET',
                url: hosturl + url + '&sessionId=' + sessionId,
                success: function (data) {

                    var totalAmount = data.totalAmount;
                    var duration = data.duration;
                    var lawyerName = data.lawyerName;
                    var questionType = data.questionType;
                    var price = data.price;
                    var unpaidAmount = data.unpaidAmount;
                    ordermount = data.unpaidAmount;
                    var cardInfo = data.cardInfo;

                    var unpaidOrderList = data.unpaidOrderList; // 获取多个订单详情数组
                    if (unpaidOrderList && unpaidOrderList.length > 1) {
                        var listStr = '';
                        for (var i = 0; i < unpaidOrderList.length; i++) {
                            listStr += '<div class="callList__each">'
                                + '<span>' + unpaidOrderList[i].consultingTimeString + '</span>'
                                + '<span>' + unpaidOrderList[i].duration + '分钟</span>'
                                + '<span>' + unpaidOrderList[i].totalAmount + '元</span>'
                                + '</div>';
                        }
                        $el.find('.callList').html(listStr);
                        // $el.find('.callList').show();
                    }

                    $el.find('#questionOfType').text(questionType);
                    $el.find('.layerAsk__Type span:nth-of-type(3)').text(lawyerName);
                    $el.find('#duration').text(duration);
                    $el.find('#price').text(price);
                    $el.find('#totalAmount').text(totalAmount);
                    $el.find('#unpaidAmount').text(unpaidAmount);

                    if (unpaidAmount <= 0) {
                        readyToPayAmountflg = false;
                    }
                    else {
                        readyToPayAmountflg = true;
                    }

                    // 判断用户是否有卡券
                    // 0：用户没有可用卡券
                    // 1：用户有可用卡券
                    // -1：用户自己选择不使用卡券
                    var cardCount = data.cardCount;
                    var paytypeOfcoupon = $el.find('#CouponPaytype').val();

                    if (paytypeOfcoupon === '') {
                        // 判断待支付金额是否为零，非零则默认选中支付宝
                        if (unpaidAmount === 0) {
                            $el.find('.payType_cash .cash_allowed1').show();
                            $el.find('.payType_cash .cash_allowed2').hide();
                            $el.find('.payType_cash').off('click');
                            $el.find('.payType_cash').css({
                                background: 'rgba(0,0,0,0.02)'
                            });
                            $el.find('.payType_cash').hide();
                        }
                        else {
                            $el.find('.payType_apply .cash_allowed2').show();
                            $el.find('input[name=\'paytype\']').val(3);
                        }
                    }
                    else {
                        if (unpaidAmount !== 0) {
                            $el.find('[data-no=' + paytypeOfcoupon + '] span:nth-of-type(3)').hide();
                            $el.find('[data-no=' + paytypeOfcoupon + '] span:nth-of-type(4)').show();
                        }
                        else {
                            $el.find('.payType_cash').hide();
                            $el.find('.payType_cash').off('click');
                        }
                    }
                    payload();

                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }

            });

            $el.find('.couponUse__popUp_yes').unbind('click').on('click', function () {
                $el.find('.couponUse__popUp').hide();
                var data = {};
                data._csrf = $el.find('#_csrf').val();
                data.cardId = $el.find('#cardId').val();
                data.cardType = $el.find('#cardType').val();
                if ($el.find('#couponId').val()) {
                    data.couponId = $el.find('#couponId').val();
                }

                // 获取订单orderId
                data.orderId = requestId;
                data.sessionId = sessionId;

                /*$el.find("#pay__pop").hide();*/
                $.ajax({
                    url: hosturl + 'card/updateOrderWithCard',
                    type: 'POST',
                    data: data,
                    success: function (data) {
                        // -1:连接异常，
                        // 0：更新失败，
                        // 1：表示成功，
                        // 2：卡券失效，
                        // 3：您已经支付过该订单！
                        // 4：请选择一张卡券，
                        // 5：支付成功，本次消耗时长XXX分钟，剩余XXX分钟。
                        // 6：支付成功，剩余时长不足。请续卡，咨询更划算。
                        // 7：支付成功，剩余XXX张畅聊卡。
                        // 8：支付成功，用卡咨询更划算，再买一张？
                        if (data.code === 1 || data.code === 5 || data.code === 6
                            || data.code === 7 || data.code === 8) {
                            $el.find('.pay__popUp_success').show();
                            $el.find('.pay__popUp_success .pay__popLayer span').text(data.msg);
                        }
                        else {
                            $el.find('.pay__popUp_fail').show();
                            $el.find('.pay__popUp_fail .pay__popLayer span').text(data.msg);
                        }
                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }

                    }
                });
            });
            // 点击遮罩层关闭弹窗及遮罩层
            $el.find('#js-layer__wrapper').click(function () {
                $el.find('#pay__pop').hide();

            });

            // 点击遮罩层关闭弹窗及遮罩层
            $el.find('.layer__wrapper').click(function () {
                $el.find('#back__pop').hide();
            });

            $el.find('#js-pay-btn-success').click(function () {
                if (channel === 'cmbc') {
                    $.ajax({
                        type: 'GET',
                        url: hosturl + 'activity/getLotteryTimes',
                        data: {
                            activityId: 'msfp',
                            sessionId: sessionId
                        },
                        success: function (data) {
                            var chanceNum = data.data.times;
                            if (parseInt(chanceNum, 10) > 0) {
                                window.top.location.href = 'activity_flop';
                            }
                            else {
                                window.top.location.href = 'comment?requestId='
                                    + $el.find('#requestId').val() + '&questionType=' + questionType;
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
                    window.top.location.href = 'comment?requestId='
                        + $el.find('#requestId').val() + '&questionType=' + questionType;
                }

            });
            $el.find('#js-pay-btn-fail').click(function () {
                $el.find('.pay__popUp_fail').hide();
                window.top.location.href = 'orderlist';
            });
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

        // 时间 毫秒转固定格式
        function formatvalidTime(time, format) {
            if (time === null) {
                return null;
            }

            var t = new Date(time);
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i;
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            });
        }

        function getCheckPay(id, questionType) {
            $.ajax({
                type: 'get',
                url: hosturl + 'check/' + id + '&sessionId=' + sessionId,
                success: function (msg) {
                    if (msg === 'OK') {
                        window.top.location.href = 'comment?requestId=' + id
                            + '&questionType=' + questionType + '&sessionId=' + sessionId;
                    }
                    else {
                        //                      toastOr('支付失败，请重新支付');
                        sessionStorage.setItem('clearWeiXinPay', 0);
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        console.log(jqXHR);
                    }

                }

            });
        }

        function checkTalking(requestId) {
            $.ajax({
                type: 'GET',
                url: hosturl + 'checkTalkingOrder',
                data: {
                    requestId: requestId,
                    sessionId: sessionId
                },
                success: function (data) {
                    console.log(data);
                    // 如果订单未生成，显示[未获取订单状态]模块，点击[点击刷新]按钮，重新加载调用load()方法/reload()
                    // 否则显示[支付订单详情]
                    // data.status = 2;//for test need delete
                    if (data.status === 1) {
                        $el.find('.layerAsk__callMinutes span:nth-child(2)').text('--');
                        $el.find('.layerAsk__callPrice span:nth-child(2)').text('--');
                        $el.find('.getOrderSuccess').hide();
                        $el.find('.getOrderFail').show();
                        localStorage.setItem('linkingOrding', 'linkingOrding');
                    }
                    else {
                        var biu = '<span><i id="duration"></i>分钟</span>';
                        var biu1 = '<span><i id="totalAmount"></i>元</span>';
                        $el.find('.layerAsk__callMinutes span:nth-child(2)').html(biu);
                        $el.find('.layerAsk__callPrice span:nth-child(2)').html(biu1);
                        load();
                        $el.find('.getOrderSuccess').show();
                        $el.find('.getOrderFail').hide();
                        localStorage.setItem('linkingOrding', 'linkingOrdingGone');
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
