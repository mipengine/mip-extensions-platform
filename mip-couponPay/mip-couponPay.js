/**
 * @file mip-couponPay 组件
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
        var couponUnitPrice;
        var defaultAlipay = true; // 默认为支付宝支付
        var firstEnterPop = true;
        var channel = localStorage.getItem('channel');
        var questionType = getQueryString('questionType');
        var fromChannel = localStorage.getItem('fromChannel');
        var chanelKind = $el.find('#channel').val();
        var AllinpayParam;
        var RUN_ON_BOCOMM_APP = localStorage.getItem('RUN_ON_BOCOMM_APP');
        var fromChannelVal = localStorage.getItem('fromChannelVal');

        $(function () {
            /*if (window.appBridge && appBridge.checkAppFeature('CHANGE_WEBVIEW_TITLE')) {
                appBridge.changeWebviewTitle('我的订单');
            }*/
            // 各项目区分顶部颜色
            if (channel === 'eleme') {
                $el.find('.header_block').css('background', '#089EFF');
                $el.find('footer #js-pay-button').css('background', '#089EFF');
            }
            else if (channel === 'mmbang' || channel === 'hers' || channel === 'hers') {
                $el.find('.header_block').css('background', '#ff6191');
                $el.find('footer #js-pay-button').css('background', '#ff6191');
            }
            else if (channel === 'weixin' || channel === 'onstar' || channel === 'falv' || channel === 'jbh') {
                $el.find('.header_block').css('background', '#ff6100');
                $el.find('footer #js-pay-button').css('background', '#fe6100');
                $el.find('.header_block').css('color', '#fff');
                $el.find('.glyphicon-menu-left').css('color', '#fff');
            }
            else if (channel === 'WxiaoApp' || channel === 'fengniao' || channel === 'fengniaozb') {
                $el.find('footer #js-pay-button').css('background', '#0CBE9F');
                if (channel === 'WxiaoApp') {
                    $el.find('.header_block').hide();
                }
                else {
                    $el.find('.header_block').css('background', '#5C7DC0');
                }
            }
            else if (channel === 'dayima') {
                $el.find('.top_header,.header_block').css('background', '#fff');
                $el.find('.div_header,.glyphicon-menu-left:before,.glyphicon,.header_block').css('color', '#000');
                $el.find('footer #js-pay-button').css('background', '#fe6100');
            }
            else if (channel !== 'cmbc') {
                $el.find('.header_block').css('background', '#ff6100');
                $el.find('footer #js-pay-button').css('background', '#fe6100');
            }

            if (channel === 'winbaoxian') {
                $el.find('.header_block').hide();
            }

            /*大翻牌活动获取标记start*/
            var gameFlg = localStorage.getItem('msActivity');
            // if (gameFlg && gameFlg === "1") {
            //     // $el.find(".orderlist-layout__order").css("height", "4.43rem");
            //     $el.find(".game_div").show();
            // }

            /*大翻牌活动获取标记end*/
        });

        var data = {
            beatles: [
                {firstName: 'John', lastName: 'Lennon'},
                {firstName: 'Paul', lastName: 'McCartney'},
                {firstName: 'George', lastName: 'Harrison'},
                {firstName: 'Ringo', lastName: 'Starr'}
            ],
            name: function () {
                return this.firstName + ' ' + this.lastName;
            }
        };

        var templates = require('templates');
        templates.render(document.getElementById('sky'), data).then(function (html) {
            document.getElementById('sky').innerHTML = html;
        });
        // 加载获取requestId
        var requestId = getQueryString('requestId');

        $el.find('#requestId').val(requestId);

        // 如果是微信登入,获取微信验证code
        var code = getQueryString('code');

        $el.find('.glyphicon-menu-left').on('click', function () {
            $el.find('.back__pop').show();
            // “狠心离开”按钮回到首页
            $el.find('#js-back-leave').on('click', function () {
                window.top.location.href = './';
            });
            // “继续支付”按钮事件
            $el.find('#js-back-continue').on('click', function () {
                $el.find('#back__pop').hide();
            });
        });

        showPayType();

        load();

        // 判断是否是通联支付下
        if (chanelKind === 'allinpay') {
            $el.find('.payType_cash:not(.payType_tonglian)').hide();
            $el.find('.payType_tonglian').show();

            /*$el.find(".payType_tonglian .cash_allowed1").hide();
            $el.find(".payType_tonglian .cash_allowed2").show();*/
            $el.find('input[name=\'paytype\']').val(6);
        }

        // 现金支付的按钮选中效果
        $el.find('.sel_pay').click(function () {
            var no = $el.find(this).data('no');
            $el.find('.payType_cash .allow_icon2').show();
            $el.find('.payType_cash .allow_icon1').hide();

            /*$el.find(this).css({ "background": "none" })
                .siblings(".sel_pay")
                .css({ "background": "rgba(0,0,0,0.02)" });*/
            $el.find(this).children('.allow_icon2').hide();
            $el.find(this).children('.allow_icon1').show();
            $el.find(this).children('.allow_icon1').css('display', '-webkit-box');
            // 将所选的支付方式放入隐藏表单
            $el.find('input[name=\'paytype\']').val(no);
            console.log($el.find('input[name=\'paytype\']').val());
        });

        // 支付订单详情页，点击刷新
        $el.find('.freshOrder').on('click', function () {
            checkTalking(requestId);
        });

        // 使用卡券时卡券弹窗列表的动态生成
        $el.find('.payType_coupon_use').on('click', function () {
            var idOfCard = $el.find('#cardId').val();
            var idOfCoupon = $el.find('#couponId').val();

            $.ajax({
                type: 'GET',
                url: 'getUserCoupons',
                success: function (data) {
                    console.log('卡券', data);
                    $el.find('.popLayer').empty();
                    $el.find('.popLayer').append('<div class="pop_close" id="js-pop_close"></div>'
                        + '<div class="pop_no_coupon payType_coupon_use_pop" id="js-couponUse">不使用卡券</div>');

                    if (data.T03) {
                        $el.find('.popLayer').append('<div class="pop_zhanye popLayer_item" data-zhanyeId="'
                            + (data.T03)['0'].id + '">'
                            + '<span class="pop_icon"></span>' + '<span class="popLayer_item_title">问律师展业卡</span>'
                            + '<span class="popLayer_item_title_detail " id="zhanye_single">剩余1张</span>'
                            + '<span class="popLayer_item_title_detail " id="zhanye_more" style="display: none">剩余'
                            + '<i class="popLayer_item_title_detail_num_zhanye" style="font-style:normal;">N'
                            + '</i>张,每次使用1张</span>'
                            + '</div>');
                        if (data.T03.length === 1) {
                            $el.find('#zhanye_single').show();
                            $el.find('#zhanye_more').hide();
                            $el.find('.pop_zhanye').on('click', function () {
                                $el.find('.payType_cash .cash_allowed1').show();
                                $el.find('.payType_cash .cash_allowed2').hide();
                                $el.find('.payType_cash').off('click');
                                $el.find('#pay__pop').hide();
                                var cardId = $el.find(this).attr('data-zhanyeId');
                                $el.find('#cardId').val(cardId);
                                $el.find('#cardType').val('T03');
                                $el.find('#card_pop_name').text('展业卡');
                                load();
                            });
                        }
                        else {
                            $el.find('#zhanye_single').hide();
                            $el.find('#zhanye_more').show();
                            var zhanyeCardNum = data.T03.length;
                            $el.find('.popLayer_item_title_detail_num_zhanye').text(zhanyeCardNum);
                            $el.find('.pop_zhanye').on('click', function () {
                                console.log(111);
                                $el.find('.payType_cash .cash_allowed1').show();
                                $el.find('.payType_cash .cash_allowed2').hide();
                                $el.find('.payType_cash').off('click');
                                $el.find('#pay__pop').hide();
                                var cardId = $el.find(this).attr('data-zhanyeId');
                                $el.find('#cardId').val(cardId);
                                $el.find('#cardType').val('T03');
                                $el.find('#card_pop_name').text('展业卡');

                                load();
                            });
                        }
                    }
                    else {
                        $el.find('.pop_zhanye').hide();
                    }

                    if (data.T01) {
                        var cardId = (data.T01)['0'].id; // 获取用户所选卡的id
                        $el.find('.popLayer').append('<div class="pop_changliao popLayer_item" >'
                            + '<span class="pop_icon">'
                            + '</span><span class="popLayer_item_title">问律师畅聊卡</span>'
                            + '<span class="popLayer_item_title_detail " id="changliao_single">剩余1张</span>'
                            + '<span class="popLayer_item_title_detail " id="changliao_more" style="display: none">剩余'
                            + '<i class="popLayer_item_title_detail_num">N</i>张,每次使用1张</span>'
                            + '</div>');
                        if (data.T01.length === 1) {
                            $el.find('#changliao_single').show();
                            $el.find('#changliao_more').hide();
                            $el.find('.pop_changliao').on('click', function () {
                                $el.find('.payType_cash .cash_allowed1').show();
                                $el.find('.payType_cash .cash_allowed2').hide();
                                $el.find('.payType_cash').off('click');

                                $el.find('#pay__pop').hide();
                                $el.find('#cardId').val(cardId);
                                $el.find('#cardType').val('T01');
                                $el.find('#card_pop_name').text('畅聊卡');
                                load();
                            });
                        }
                        else {
                            $el.find('#changliao_single').hide();
                            $el.find('#changliao_more').show();
                            var changliaoCardNum = data.T01.length;
                            $el.find('.popLayer_item_title_detail_num').text(changliaoCardNum);
                            $el.find('.pop_changliao').on('click', function () {
                                console.log(111);
                                $el.find('.payType_cash .cash_allowed1').show();
                                $el.find('.payType_cash .cash_allowed2').hide();
                                $el.find('.payType_cash').off('click');
                                $el.find('#pay__pop').hide();
                                $el.find('#cardId').val(cardId);
                                $el.find('#cardType').val('T01');
                                $el.find('#card_pop_name').text('畅聊卡');

                                load();
                            });
                        }
                    }
                    else {
                        $el.find('.pop_changliao').hide();
                    }

                    popT02Style(data, 'T0201', '法律咨询服务无忧卡');
                    popT02Style(data, 'T0202', '问律师帮女郎卡');
                    popT02Style(data, 'T0203', '问律师商务精英卡');
                    popT02Style(data, 'T0205', '问律师时长特惠券');
                    popT02Style(data, 'T0206', '法律服务白金卡');
                    popT02Style(data, 'T0207', '私人律师卡');
                    popT02Style(data, 'T0208', '5分钟律师咨询卡');
                    popT02Style(data, 'T0209', '10分钟律师咨询卡');
                    popT02Style(data, 'T0210', '20分钟律师咨询卡');
                    popT02Style(data, 'T0211', '30分钟律师咨询卡');
                    popT02Style(data, 'T0212', '60分钟律师咨询卡');
                    popT02Style(data, 'T0213', '200分钟律师咨询卡');
                    popT02Style(data, 'T0214', '15分钟律师咨询卡');
                    popT02Style(data, 'T0215', '18分钟律师咨询卡');
                    popT02Style(data, 'T0216', '25分钟律师咨询卡');
                    popT02Style(data, 'T0217', '100分钟律师咨询卡');
                    popT02Style(data, 'T0218', '120分钟律师咨询卡');
                    popT02Style(data, 'T0219', '不限时律师咨询年卡');
                    popT02Style(data, 'T0401', '法律文书卡');
                    popT02Style(data, 'T02', '包年卡');
                    popT02Style(data, 'T0204', '女神卡');
                    popT02Style(data, 'T0403', '律师函');

                    if (data.Coupon) {
                        var couponArr = data.Coupon;
                        for (var i = 0; i < couponArr.length; i++) {
                            console.log(data);
                            var item = couponArr[i];
                            var couponId = item.id;
                            var validTime = item.validTime;
                            var couponAmount = item.couponAmount;
                            var minConsumption = item.minConsumption;
                            var time = formatvalidTime(validTime, 'yyyy-MM-dd');
                            var totalAmountVal = $el.find('#totalAmountCon').val(); // 订单金额
                            console.log(totalAmountVal);
                            if (minConsumption <= totalAmountVal) {
                                $el.find('.popLayer').append('<div class="pop_coupon popLayer_item" data-couponId="'
                                    + couponId + '"><span class="pop_icon"></span><span class="popLayer_item_title">'
                                    + item.name + '</span><span class="popLayer_item_title_detail">有效期至<b>'
                                    + time + '</b></span>');
                            }
                            else {
                                $el.find('.popLayer').append('<div class="pop_coupon"'
                                    + '"popLayer_item noUseCoupon" data-couponId="'
                                    + couponId + '"><span class="pop_icon"></span><span class="popLayer_item_title">'
                                    + item.name + '</span><span class="popLayer_item_title_detail">有效期至<b>'
                                    + time + '</b></span>');
                            }
                        }
                        $el.find('.pop_coupon').on('click', function () {
                            if (!$el.find(this).hasClass('noUseCoupon')) {
                                $el.find('.payType_cash .cash_allowed1').show();
                                $el.find('.payType_cash .cash_allowed2').hide();
                                $el.find('.payType_cash').off('click');
                                $el.find('#pay__pop').hide();

                                /*  var cardId = $el.find(this).attr("data-couponId");*/
                                var couponId = $el.find(this).attr('data-couponId');
                                $el.find('#couponId').val(couponId);
                                $el.find('#cardType').val('Coupon');
                                $el.find('#card_pop_name').text('代金券');
                                load();
                            }

                            console.log(couponId);
                        });
                    }
                    else {
                        $el.find('.pop_coupon').hide();
                    }

                    // 添加默认选中卡片的样式事件
                    console.log(idOfCoupon);
                    if (idOfCoupon === '-1') {
                        if (data.T01) {
                            for (var i = 0; i < data.T01.length; i++) {
                                var item = (data.T01)[i];
                                if (item.id === idOfCard) {
                                    $el.find('.pop_changliao').css({
                                        border: '0.01rem solid #FF6100'
                                    });
                                }

                            }
                        }

                        if (data.T02) {
                            for (var i = 0; i < data.T02.length; i++) {
                                var item = (data.T02)[i];
                                if (item.id === idOfCard) {
                                    $el.find('[data-baonianId = ' + idOfCard + ']').css({
                                        border: '0.01rem solid #FF6100'
                                    });
                                }

                            }
                        }

                        if (data.T0204) {
                            for (var i = 0; i < data.T0204.length; i++) {
                                var item = (data.T0204)[i];
                                if (item.id === idOfCard) {
                                    $el.find('[data-nvshenId = ' + idOfCard + ']').css({
                                        border: '0.01rem solid #FF6100'
                                    });
                                }

                            }
                        }

                        if (data.T03) {
                            for (var i = 0; i < data.T03.length; i++) {
                                var item = (data.T03)[i];
                                if (item.id === idOfCard) {
                                    $el.find('.pop_zhanye').css({
                                        border: '0.01rem solid #FF6100'
                                    });
                                }

                            }
                        }

                        $el.find('#couponId').val('-1'); // 选中后置空为初始状态，初始状态即为couponId==-1;
                    }
                    else {
                        for (var i = 0; i < data.Coupon.length; i++) {
                            var item = (data.Coupon)[i];
                            if (item.id === idOfCoupon) {
                                $el.find('[data-couponId = ' + idOfCoupon + ']').css({
                                    border: '0.01rem solid #FF6100'
                                });
                            }

                        }
                        // 选中后置空为初始状态，初始状态即为couponId==-1;

                        var typeOfCard = $el.find('#cardType').val();
                        if (typeOfCard !== 'Coupon' && typeOfCard !== '') {
                            $el.find('#couponId').val('-1');
                        }
                    }
                }
            });
        });

        // 不使用卡券时
        $el.find('.popLayer').on('click', '#js-couponUse', function () {
            $el.find('#cardId').val('');
            $el.find('#couponId').val('');
            $el.find('#pay__pop').hide();
            $el.find('.payType_coupon_use .coupon_icon').css({
                'background-image': 'url(images/icon_kaquan.png)'
            });
            $el.find('.payType_coupon_use span:nth-of-type(2)').text('不使用卡券');
            $el.find('.payType_coupon_use span:nth-of-type(3)').hide();
            $el.find('#ifUseCard').val('-1');
            load();
        });

        // 立即支付
        $el.find('#js-pay-button').click(function () {
            var freeFlg = '0'; // 没有订单免单
            var freeMessage = '';
            $.ajax({
                async: false,
                type: 'GET',
                data: {
                    requestIdList: getQueryString('requestId')
                },
                url: 'checkFreeBill',
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
                    window.top.location.href = 'orderlist';
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
                var CouponPaytype = document.getElementById('CouponPaytype').value;
                var data = {};
                if ($el.find('#requestId').val().indexOf(',') > 0) {
                    data.requestId = -1;
                }
                else {
                    data.requestId = $el.find('#requestId').val();
                }
                data._csrf = $el.find('#_csrf').val();
                data.questionType = $el.find('#questionType').val();
                data.userCouponId = $el.find('#couponId').val();

                if (CouponPaytype === 3) { // 支付宝支付
                    if ($el.find('#cardId').val()) {
                        data.cardId = $el.find('#cardId').val();
                    }

                    data.returnUrl = window.location.origin + '/jasmine/comment?requestId='
                    + $el.find('#requestId').val() + '&questionType=' + $el.find('#questionType').val();
                    $.ajax({
                        type: 'POST',
                        url: 'pay/alipay_wap',
                        data: data,
                        success: function (data) {
                            if (data === 'ERROR') {
                                alert('连接异常');
                            }
                            else if (data === 'ERROR1') {
                                alert('用户不欠款，不需要支付');
                            }
                            else if (data === 'ERROR2') {
                                alert('支付接口异常');
                            }
                            else if (data === 'ERROR3') {
                                alert('无效的优惠券');
                            }
                            else {
                                $el.find('#couponPay_body').html(data);
                            }
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status === 403) {
                                window.location.reload();
                            }

                        }

                    });
                }
                else if (CouponPaytype === 2) { // 微信支付
                    if ($el.find('#cardId').val()) {
                        data.cardId = $el.find('#cardId').val();
                    }

                    if (isWeiXin()) {
                        data.code = code;

                        $.ajax({
                            type: 'POST',
                            url: 'weCatPay',
                            data: data,
                            success: function (data) {
                                if (data === 'ERROR') {
                                    alert('连接异常');
                                }
                                else if (data === 'ERROR1') {
                                    alert('用户不欠款，不需要支付');
                                }
                                else if (data === 'ERROR2') {
                                    alert('支付接口异常');
                                }
                                else if (data === 'ERROR3') {
                                    alert('无效的优惠券');
                                }
                                else {
                                    var json = JSON.parse(data);
                                    weCatPay(data);
                                }
                            },
                            error: function (jqXHR) {
                                // hideLoader();
                                if (jqXHR.status === 403) {
                                    window.location.reload();
                                }

                            }
                        });
                    }
                    else {
                        sessionStorage.setItem('clearWeiXinPay', 1);
                        setTimeout(function () {
                            checkWXOrder();
                        }, 1500);
                        data.payUrl = window.window.top.location.href;
                        data.title = $el.find(document).attr('title');

                        $.ajax({
                            type: 'POST',
                            url: 'pay/wxpay_mweb',
                            data: data,
                            success: function (data) {
                                var url = data.mweb_url;
                                var referLink = document.createElement('a');
                                referLink.href = url;
                                document.body.appendChild(referLink);
                                referLink.click();
                                // window.top.location.href = data.mweb_url;
                            },
                            error: function (jqXHR) {
                                if (jqXHR.status === 403) {
                                    // window.location.reload();
                                    console.log(jqXHR);
                                }

                            }

                        });
                    }
                }
                else if (CouponPaytype === 4) { // 银联支付
                    if ($el.find('#cardId').val()) {
                        data.cardId = $el.find('#cardId').val();
                    }

                    var tourl = window.location.origin + '/jasmine/comment?requestId=' + $el.find('#requestId').val()
                    + '&questionType=' + $el.find('#questionType').val();

                    data.returnUrl = window.location.origin + '/jasmine/toComment?toUrl=' + tourl;
                    $.ajax({
                        type: 'POST',
                        url: 'pay/chinapay',
                        data: data,
                        success: function (data) {
                            $el.find('#couponPay_body').html(data.resp);
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status === 403) {
                                window.location.reload();
                            }

                        }
                    });
                }
                else if (CouponPaytype === 7) { // 京东支付
                    if ($el.find('#cardId').val()) {
                        data.cardId = $el.find('#cardId').val();
                    }

                    $.ajax({
                        type: 'POST',
                        url: 'jd_pay',
                        data: data,
                        success: function (data) {
                            // $el.find("#couponPay_body").html(data);
                            $el.find('#version').val(data.version);
                            $el.find('#merchant').val(data.merchant);
                            $el.find('#device').val(data.device);
                            $el.find('#tradeNum').val(data.tradeNum);
                            $el.find('#tradeName').val(data.tradeName);
                            $el.find('#tradeDesc').val(data.tradeDesc);
                            $el.find('#tradeTime').val(data.tradeTime);
                            $el.find('#amount').val(data.amount);
                            $el.find('#currency').val(data.currency);
                            $el.find('#note').val(data.note);
                            $el.find('#callbackUrl').val(data.callbackUrl);
                            $el.find('#notifyUrl').val(data.notifyUrl);
                            $el.find('#ip').val(data.ip);
                            $el.find('#userType').val(data.userType);
                            $el.find('#userId').val(data.userId);
                            $el.find('#expireTime').val(data.expireTime);
                            $el.find('#orderType').val(data.orderType);
                            $el.find('#industryCategoryCode').val(data.industryCategoryCode);
                            $el.find('#specCardNo').val(data.specCardNo);
                            $el.find('#specId').val(data.specId);
                            $el.find('#specName').val(data.specName);
                            $el.find('#payChannel').val(data.payChannel);
                            $el.find('#sign').val(data.sign);
                            $el.find('#cert').val(data.cert);
                            $el.find('#vendorId').val(data.vendorId);
                            $el.find('#goodsInfo').val(data.goodsInfo);
                            $el.find('#orderGoodsNum').val(data.orderGoodsNum);
                            $el.find('#receiverInfo').val(data.receiverInfo);
                            $el.find('#termInfo').val(data.termInfo);
                            $el.find('#riskInfo').val(data.riskInfo);
                            document.getElementById('batchForm').submit();
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status === 403) {
                                window.location.reload();
                            }

                        }
                    });
                }
                else if (CouponPaytype === 5) { // 交通银行支付

                }
                else if (CouponPaytype === 1) { // 民生银行支付
                    var data = {};
                    data._csrf = $el.find('#_csrf').val();
                    data.questionType = $el.find('#questionType').val();
                    if ($el.find('#requestId').val().indexOf(',') > 0) {
                        data.requestId = -1;
                    }
                    else {
                        data.requestId = $el.find('#requestId').val();
                    }
                    data.userCouponId = $el.find('#couponId').val();
                    if ($el.find('#cardId').val()) {
                        data.cardId = $el.find('#cardId').val();
                    }

                    $.ajax({
                        type: 'POST',
                        url: 'cmbcPay/request',
                        data: data,
                        success: function (data) {

                            /*                            submitOrderForCash(data);*/
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status === 403) {
                                window.location.reload();
                            }

                        }

                    });
                }
                else if (CouponPaytype === 6) { // 通联支付
                    var Sysid = AllinpayParam.sysid;
                    var Timestamp = AllinpayParam.timestamp;
                    var V = '1.0';
                    var Req = AllinpayParam.req;
                    var Sign = AllinpayParam.sign;
                    window.allinpaywallet.awPay(Sysid, Timestamp, V, Req, Sign); // H5页面通过JavaScript调用native支付

                }
                else if (CouponPaytype === 8) { // 百度支付
                    var data = {};
                    data._csrf = $el.find('#_csrf').val();
                    data.questionType = $el.find('#questionType').val();
                    data.requestId = $el.find('#requestId').val();
                    data.userCouponId = $el.find('#couponId').val();
                    if ($el.find('#cardId').val()) {
                        data.cardId = $el.find('#cardId').val();
                    }

                    $.ajax({
                        type: 'POST',
                        url: 'pay/baidupay',
                        data: data,
                        success: function (data) {
                            if (data && data.cashier_url) {
                                window.top.location.href = data.cashier_url;
                            }
                            else {
                                //                              toastOr('报错了，请稍后尝试，或者联系客服');
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
            else {
                $el.find('.couponUse__popUp').show();
                var nameOfCard = $el.find('.nameOfCard').text();
                $el.find('#card_pop_name').text(nameOfCard);

                /*            console.log($el.find("input[name='paytype']").val());
                            if($el.find("input[name='paytype']").val()== "" || null || underfind){
                                alert("请选择支付方式");
                            }*/
            }
        });

        function load() {

            // 用户手动操作 cardId:卡券Id cardType:卡券类型 ifUseCard:是否使用卡
            var cardId = $el.find('#cardId').val();

            var cardType = $el.find('#cardType').val();
            var ifUseCard = $el.find('#ifUseCard').val();
            var requestId = $el.find('#requestId').val();
            // 因为合并支付时跳转过来的url中requestId会用逗号分隔
            if (requestId.indexOf(',') > 0) {
                requestId = -1;
            }

            var savedMoneyflag = $el.find('#savedMoneyflag').val();
            var couponId = $el.find('#couponId').val();
            if ('WeiXinApp' === getQueryString('from') && 1 === sessionStorage.getItem('clearWeiXinPay')) {
                checkWXOrder();
            }

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
            if (cardType === 'T01') {
                cardCss('changliao', '问律师畅聊卡');
            }
            else if (cardType === 'T02') {
                cardCss(cardType, '问律师包年卡');
            }
            else if (cardType === 'T03') {
                cardCss('zhanye', '问律师展业卡');
            }
            else if (cardType === 'Coupon') {
                cardCss('youhuiquan', '优惠券');
            }
            else if (cardType === 'T0204') {
                cardCss(cardType, '女神卡');
            }
            else if (cardType === 'T0208') {
                cardCss(cardType, '5分钟律师咨询卡');
            }
            else if (cardType === 'T0202') {
                cardCss(cardType, '问律师帮女郎卡');
            }
            else if (cardType === 'T0203') {
                cardCss(cardType, '问律师商务精英卡');
            }
            else if (cardType === 'T0206') {
                cardCss(cardType, '法律服务白金卡');
            }
            else if (cardType === 'T0205') {
                cardCss(cardType, '问律师时长特惠券');
            }
            else if (cardType === 'T0207') {
                cardCss(cardType, '私人律师卡');
            }
            else if (cardType === 'T0209') {
                cardCss(cardType, '10分钟律师咨询卡');
            }
            else if (cardType === 'T0210') {
                cardCss(cardType, '20分钟律师咨询卡');
            }
            else if (cardType === 'T0211') {
                cardCss(cardType, '30分钟律师咨询卡');
            }
            else if (cardType === 'T0212') {
                cardCss(cardType, '60分钟律师咨询卡');
            }
            else if (cardType === 'T0213') {
                cardCss(cardType, '200分钟律师咨询卡');
            }
            else if (cardType === 'T0214') {
                cardCss(cardType, '15分钟律师咨询卡');
            }
            else if (cardType === 'T0215') {
                cardCss(cardType, '18分钟律师咨询卡');
            }
            else if (cardType === 'T0216') {
                cardCss(cardType, '25分钟律师咨询卡');
            }
            else if (cardType === 'T0217') {
                cardCss(cardType, '100分钟律师咨询卡');
            }
            else if (cardType === 'T0218') {
                cardCss(cardType, '120分钟律师咨询卡');
            }
            else if (cardType === 'T0201') {
                cardCss(cardType, '问律师无忧卡');
            }
            else if (cardType === 'T0401') {
                cardCss(cardType, '法律文书卡');
            }
            else if (cardType === 'T0403') {
                cardCss(cardType, '律师函');
            }
            else if (cardType === 'T0219') {
                cardCss(cardType, '不限时律师咨询年卡');
            }

            console.log(url);
            $.ajax({
                type: 'GET',
                url: url,
                success: function (data) {
                    var totalAmount = data.totalAmount;
                    var duration = data.duration;
                    var lawyerName = data.lawyerName;
                    var questionType = data.questionType;
                    var price = data.price;
                    var unpaidAmount = data.unpaidAmount;
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
                        $el.find('.callList').show();
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
                    console.log(data);
                    switch (cardCount) {
                        case 0:
                            $el.find('.payType_coupon_use .coupon_icon').css({
                                'background-image': 'url(images/icon_kaquan.png)'
                            });
                            $el.find('.payType_coupon_use span:nth-of-type(2)').text('不使用卡券');
                            $el.find('.payType_coupon_use span:nth-of-type(3)').hide();
                            showPayType();

                            /*if (isWeiXin()) {
                                $el.find("#questionType").val(getQueryString("state"));
                                $el.find("#code").val(getQueryString("code"));
                                $el.find(".payType_apply").hide();
                                $el.find(".payType_weixin").show();
                                $el.find(".payType_weixin .cash_allowed2").show();
                                $el.find(".payType_weixin .cash_allowed1").hide();
                                $el.find("input[name='paytype']").val(2);
                            }  else if(channel === "bcm" || fromChannel === "bocomm" ){
                                $el.find(".payType_cash").not(".payType_bcm").hide();
                                $el.find(".payType_bcm").show();
                                $el.find("input[name='paytype']").val(5);
                                $el.find(".payType_bcm .cash_allowed2").show();
                                $el.find(".payType_bcm .cash_allowed1").hide();
                                $el.find("#questionType").val(getQueryString("questionType"));
                            }else {
                                $el.find(".payType_weixin").hide();
                                $el.find(".payType_apply").show();
                                $el.find("input[name='paytype']").val(3);
                                $el.find(".payType_apply .cash_allowed2").show();
                                $el.find(".payType_apply .cash_allowed1").hide();
                                $el.find("#questionType").val(getQueryString("questionType"));
                            }

                            // 判断是否是通联支付下
                            if (chanelKind === "allinpay") {
                                $el.find(".payType_cash:not(.payType_tonglian)").hide();
                                $el.find(".payType_tonglian").show();
                                $el.find(".payType_tonglian .cash_allowed1").hide();
                                $el.find(".payType_tonglian .cash_allowed2").show();
                                $el.find("input[name='paytype']").val(6);


                            }*/
                            // 判断是否是通联支付下
                            if (chanelKind === 'allinpay') {
                                $el.find('.payType_cash:not(.payType_tonglian)').hide();
                                $el.find('.payType_tonglian').show();
                                $el.find('.payType_tonglian .cash_allowed1').hide();
                                $el.find('.payType_tonglian .cash_allowed2').show();
                                $el.find('input[name=\'paytype\']').val(6);
                            }

                            break;
                        case 1:
                            var cardType = cardInfo.type;
                            couponUnitPrice = cardInfo.price;
                            var savedMoney = cardInfo.savedMoney;
                            $el.find('#savedMoneyflag').val(savedMoney);
                            $el.find('#savedMoney').text(savedMoney);
                            if (cardType === 'T01') {
                                cardCss('changliao', '问律师畅聊卡');
                            }
                            else if (cardType === 'T02') {
                                cardCss(cardType, '包年卡');
                            }
                            else if (cardType === 'T03') {
                                cardCss('zhanye', '展业卡');
                            }
                            else if (cardType === 'T0204') {
                                cardCss(cardType, '女神卡');
                            }
                            else if (cardType === 'T0202') {
                                cardCss(cardType, '问律师帮女郎卡');
                            }
                            else if (cardType === 'T0203') {
                                cardCss(cardType, '问律师商务精英卡');
                            }
                            else if (cardType === 'T0206') {
                                cardCss(cardType, '法律服务白金卡');
                            }
                            else if (cardType === 'T0205') {
                                cardCss(cardType, '问律师时长特惠券');
                            }
                            else if (cardType === 'T0207') {
                                cardCss(cardType, '私人律师卡');
                            }
                            else if (cardType === 'T0208') {
                                cardCss(cardType, '5分钟律师咨询卡');
                            }
                            else if (cardType === 'T0209') {
                                cardCss(cardType, '10分钟律师咨询卡');
                            }
                            else if (cardType === 'T0210') {
                                cardCss(cardType, '20分钟律师咨询卡');
                            }
                            else if (cardType === 'T0211') {
                                cardCss(cardType, '30分钟律师咨询卡');
                            }
                            else if (cardType === 'T0212') {
                                cardCss(cardType, '60分钟律师咨询卡');
                            }
                            else if (cardType === 'T0213') {
                                cardCss(cardType, '200分钟律师咨询卡');
                            }
                            else if (cardType === 'T0201') {
                                cardCss(cardType, '问律师无忧卡');
                            }
                            else if (cardType === 'Coupon') {
                                cardCss('youhuiquan', couponUnitPrice + '元代金券');
                            }
                            else if (cardType === 'T0214') {
                                cardCss(cardType, '15分钟律师咨询卡');
                            }
                            else if (cardType === 'T0215') {
                                cardCss(cardType, '18分钟律师咨询卡');
                            }
                            else if (cardType === 'T0216') {
                                cardCss(cardType, '25分钟律师咨询卡');
                            }
                            else if (cardType === 'T0217') {
                                cardCss(cardType, '100分钟律师咨询卡');
                            }
                            else if (cardType === 'T0218') {
                                cardCss(cardType, '120分钟律师咨询卡');
                            }
                            else if (cardType === 'T0401') {
                                cardCss(cardType, '法律文书卡');
                            }
                            else if (cardType === 'T0403') {
                                cardCss(cardType, '律师函');
                            }
                            else if (cardType === 'T0219') {
                                cardCss(cardType, '不限时律师咨询年卡');
                            }

                            var couponId = cardInfo.couponId;
                            $el.find('#couponId').val(couponId);
                            $el.find('#cardId').val(cardInfo.id);

                            showPayType();
                            // 判断是否是通联支付下
                            if (chanelKind === 'allinpay') {
                                $el.find('.payType_cash:not(.payType_tonglian)').hide();
                                $el.find('.payType_tonglian').show();
                                $el.find('.payType_tonglian .cash_allowed1').hide();
                                $el.find('.payType_tonglian .cash_allowed2').show();
                                $el.find('input[name=\'paytype\']').val(6);
                            }

                            break;
                        case -1:
                            $el.find('#ifUseCard').val('');
                            $el.find('#cardId').val('');
                            $el.find('#couponId').val('');
                            $el.find('.payType_coupon_use .coupon_icon').css({
                                'background-image': 'url(images/icon_kaquan.png)'
                            });
                            $el.find('.payType_coupon_use span:nth-of-type(2)').text('不使用卡券');
                            $el.find('.payType_coupon_use span:nth-of-type(3)').hide();
                            // 判断是否是通联支付下
                            if (chanelKind === 'allinpay') {
                                $el.find('.payType_cash:not(.payType_tonglian)').hide();
                                $el.find('.payType_tonglian').show();
                                $el.find('.payType_tonglian .cash_allowed1').hide();
                                $el.find('.payType_tonglian .cash_allowed2').show();
                                $el.find('input[name=\'paytype\']').val(6);
                            }
                            else if (fromChannelVal === 'cmbc') {
                                $el.find('.payType_cash').not('.payType_cmbc').hide();
                                $el.find('.payType_cmbc').show();
                                if ($el.find('#unpaidAmount').text() === 0) {
                                    $el.find('input[name=\'paytype\']').val(1);
                                    $el.find('.payType_cmbc .allow_icon1').show();
                                    $el.find('.payType_cmbc .allow_icon2').hide();
                                    $el.find('#questionType').val(getQueryString('questionType'));
                                }

                                cmbcColorChange();
                            }
                            else if (isWeiXin()) {
                                $el.find('#questionType').val(getQueryString('state'));
                                $el.find('#code').val(getQueryString('code'));
                                $el.find('.payType_apply').hide();
                                $el.find('.payType_weixin').show();
                                $el.find('.payType_weixin .cash_allowed2').show();
                                $el.find('.payType_weixin .cash_allowed1').hide();
                                $el.find('input[name=\'paytype\']').val(2);
                            }
                            else if (channel === 'bcm' || fromChannel === 'bocomm') {
                                $el.find('.payType_cash').not('.payType_bcm').hide();
                                $el.find('.payType_bcm').show();
                                $el.find('input[name=\'paytype\']').val(5);

                                /*$el.find(".payType_bcm .cash_allowed2").show();
                                $el.find(".payType_bcm .cash_allowed1").hide();*/
                                $el.find('#questionType').val(getQueryString('questionType'));
                            }
                            else if (channel === 'baidu_xzh') {
                                $el.find('.payType_cash:not(.payType_yinlian)').hide();
                                $el.find('.payType_yinlian').show();
                                $el.find('.payType_baidu').show();
                                $el.find('.payType_yinlian .cash_allowed1').hide();
                                $el.find('.payType_yinlian .cash_allowed2').show();
                                $el.find('input[name=\'paytype\']').val(4);
                                $el.find('#questionType').val(getQueryString('questionType'));
                            }
                            else if (channel === 'winbaoxian') {
                                $el.find('.payType_cash:not(.payType_yinlian)').hide();
                                $el.find('.payType_yinlian').show();
                                $el.find('.payType_apply').show();
                                $el.find('.payType_weixin').show();
                                $el.find('.payType_yinlian .cash_allowed1').hide();
                                $el.find('.payType_yinlian .cash_allowed2').show();
                                $el.find('input[name=\'paytype\']').val(4);
                                $el.find('#questionType').val(getQueryString('questionType'));
                            }
                            else {
                                $el.find('.payType_apply').show();
                                $el.find('.payType_yinlian').show();
                                $el.find('input[name=\'paytype\']').val(3);
                                $el.find('.payType_apply .cash_allowed2').show();
                                $el.find('.payType_apply .cash_allowed1').hide();
                                $el.find('#questionType').val(getQueryString('questionType'));
                            }
                            break;
                    }
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
                            if (isWeiXin()) {
                                $el.find('.payType_weixin .cash_allowed2').show();
                                $el.find('input[name=\'paytype\']').val(2);
                            }
                            else {
                                $el.find('.payType_apply .cash_allowed2').show();
                                $el.find('input[name=\'paytype\']').val(3);
                            }
                        }
                    }
                    else {
                        if (unpaidAmount !== 0) {
                            // 民生银行
                            if (fromChannelVal === 'cmbc') {
                                $el.find('.payType_cash').not('.payType_cmbc').hide();
                                $el.find('.payType_cmbc').show();
                                $el.find('input[name=\'paytype\']').val(1);
                                $el.find('.payType_cmbc .cash_allowed1').hide();
                                $el.find('.payType_cmbc .pay_icon').show();
                                $el.find('#questionType').val(getQueryString('questionType'));
                                cmbcColorChange();
                            }
                            else {
                                $el.find('[data-no=' + paytypeOfcoupon + '] span:nth-of-type(3)').hide();
                                $el.find('[data-no=' + paytypeOfcoupon + '] span:nth-of-type(4)').show();
                            }
                        }
                        else {
                            $el.find('.payType_cash').hide();
                            $el.find('.payType_cash').off('click');
                        }
                    }

                    if (chanelKind === 'allinpay') {
                        // 通联支付获取响应参数
                        var data = {};
                        data._csrf = $el.find('#_csrf').val();
                        data.buyerUserId = $el.find('#uuid').val();
                        data.cardId = $el.find('#cardId').val();
                        data.questionType = getQueryString('questionType');
                        data.requestId = getQueryString('requestId');
                        data.userCouponId = $el.find('#couponId').val();
                        $.ajax({
                            type: 'POST',
                            url: 'pay/allinpay',
                            data: data,
                            success: function (data) {
                                AllinpayParam = data;
                            },
                            error: function (jqXHR) {
                                if (jqXHR.status === 403) {
                                    window.location.reload();
                                }

                            }
                        });
                    }

                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }

            });

            // 卡券使用确认弹窗按钮事件
            $el.find('.couponUse__popUp_no').on('click', function () {
                $el.find('.couponUse__popUp').hide();
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

                /*$el.find("#pay__pop").hide();*/
                $.ajax({
                    type: 'POST',
                    url: 'card/updateOrderWithCard',
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

            // 支付方式选择
            $el.find('.payType_cash').on('click', function () {
                var no = $el.find(this).data('no');
                $el.find('.payType_cash .cash_allowed1').show();
                $el.find('.payType_cash .cash_allowed2').hide();
                $el.find(this).children('.cash_allowed1').hide();
                $el.find(this).children('.cash_allowed2').show();
                $el.find(this).children('.cash_allowed2').css('display', '-webkit-box');
                // 将所选的支付方式放入隐藏表单
                $el.find('input[name=\'paytype\']').val(no);
                sessionStorage.setItem('clearWeiXinPay', 0);
            });

            // 卡券支付页面弹窗
            // 点击卡券按钮显示弹窗及遮罩层
            $el.find('.payType_coupon_use').on('click', function () {
                var typeOfCard = $el.find('#cardType').val();
                if (typeOfCard !== 'Coupon' && typeOfCard !== '') {
                    $el.find('#couponId').val('-1');
                }

                $el.find('#pay__pop').show();
            });

            // 点击叉号关闭弹窗及遮罩层
            $el.find('.popLayer').on('click', '#js-pop_close', function () {

                $el.find('#pay__pop').hide();
            });

            // 点击遮罩层关闭弹窗及遮罩层
            $el.find('#js-layer__wrapper').on('click', function () {
                $el.find('#pay__pop').hide();

            });

            // 点击选中效果

            /*    $el.find(".popLayer").on("click", ".popLayer_item", function() {
                    $el.find(this).css({ "border": "0.01rem solid #FF6100" }).siblings().css({ "border": "none" })
                });
            */
            $el.find('.popLayer').on('click', '.popLayer_item', function () {
                if (!$el.find(this).hasClass('noUseCoupon')) {
                    $el.find(this).css({
                        border: '1px solid #FF6100'
                    }).siblings().css({
                        border: 'none'
                    });
                }

            });

            // 点击遮罩层关闭弹窗及遮罩层
            $el.find('.layer__wrapper').on('click', function () {
                $el.find('#back__pop').hide();
            });

            $el.find('#js-pay-btn-success').on('click', function () {
                if (channel === 'cmbc') {
                    $.ajax({
                        type: 'GET',
                        url: 'activity/getLotteryTimes',
                        data: {
                            activityId: 'msfp'
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
            $el.find('#js-pay-btn-fail').on('click', function () {
                $el.find('.pay__popUp_fail').hide();
                window.top.location.href = 'orderlist';
            });

            // 民生银行
            if (fromChannelVal === 'cmbc') {
                $el.find('.payType_cash').not('.payType_cmbc').hide();
                if ($el.find('#unpaidAmount').text() === 0) {
                    $el.find('input[name=\'paytype\']').val(1);
                    $el.find('.payType_cmbc .allow_icon1').show();
                    $el.find('.payType_cmbc .allow_icon2').hide();
                    $el.find('#questionType').val(getQueryString('questionType'));
                }

                cmbcColorChange();
            }
        }
        // 解析url参数值
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$el.find)', 'i');
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
        // 判断是否是微信环境
        function isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) === 'micromessenger') {
                return true;
            }
            else {
                return false;
            }
        }

        // 卡券类型样式加载
        function cardCss(EnglishName, chineseName) {
            $el.find('.payType_coupon_use .coupon_icon').css({
                'background-image': 'url(images/icon_' + EnglishName + '.png)'
            });

            /*$el.find(".payType_coupon_use span:nth-of-type(2)").text("问律师" + chineseName);*/
            if (EnglishName !== 'youhuiquan') {
                $el.find('.payType_coupon_use span:nth-of-type(2)').text(chineseName);
            }
            else {
                $el.find('.payType_coupon_use span:nth-of-type(2)').text(chineseName);
            }
            $el.find('.payType_coupon_use span:nth-of-type(3) b').text(chineseName);
        }
        // 弹框信息
        function showErrPOP(message) {
            $el.find('p').text(message);
            $el.find('.popUp_uncheckErr').fadeIn();
        }

        // 微信支付
        function weCatPay(data) {
            var json = JSON.parse(data);

            /*WeixinJSBridge.invoke('getBrandWCPayRequest', {
                'appId': json.appId,
                'timeStamp': json.timeStamp, // 时间戳，自1970年以来的秒数
                'nonceStr': json.nonceStr, // 随机串
                'package': json.package,
                'signType': json.signType, // 微信签名方
                'paySign': json.paySign // 微信签名
            }, function (res) {
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    // 支付完成后，检测是否支付完成
                    var id = $el.find('#requestId').val();
                    var csrfToken = $el.find('#_csrf').val();
                    var questionType = $el.find('#questionType').val();
                    $.ajax({
                        type: 'POST',
                        url: 'checkWeCatOrder?requestId=' + id + '&code=' + $el.find('#code').val() + '&_csrf=' + csrfToken,
                        success: function (data) {
                            console.log(id);
                            console.log(questionType);
                            console.log(fromChannel);
                            window.top.location.href = 'comment?requestId=' + id + '&questionType='
                                + questionType + '&channel=' + fromChannel + '&frompage=couponPay';
                        },
                        error: function (jqXHR) {
                            console.log(fromChannel);
                            window.top.location.href = 'orderlist?channel=' + fromChannel;
                        }
                    });
                }
                else if (res.err_msg === 'get_brand_wcpay_request:cancel'
                    || res.err_msg === 'get_brand_wcpay_request:fail') {
                    window.top.location.href = 'orderlist?channel=' + fromChannel;
                }

            }
            );*/
        }

        function cmbcColorChange() {
            $el.find('.couponUse__popUp__popLayer div:nth-of-type(1)').css({
                color: '#4196ea',
                border: '1px solid #4196ea'
            });
            $el.find('.couponUse__popUp__popLayer div:nth-of-type(2)').css({
                color: '#fff',
                background: '#4196ea',
                border: '1px solid #4196ea'
            });
            $el.find('.pay__popUp_success .pay__popLayer>div').css({
                color: '#fff',
                background: '#4196ea',
                border: '1px solid #4196ea'
            });
            $el.find('.pay__popUp_fail .pay__popLayer>div').css({
                color: '#fff',
                background: '#4196ea',
                border: '1px solid #4196ea'
            });
            $el.find('.back__pop .back-leave').css({
                color: '#4196ea',
                border: '1px solid #4196ea'
            });
            $el.find('.back__pop .back-continue').css({
                color: '#fff',
                background: '#4196ea',
                border: '1px solid #4196ea'
            });
        }

        // 通联支付回调测试
        function awPayFinish(sysid, timestamp, v, rps, sign) {
            var rpsJson = JSON.parse(rps);
            if (rpsJson.status === 'OK') {
                window.top.location.href = 'orderlist';
            }
            else {
                window.top.location.href = './';
            }
        }

        function checkWXOrder() {
            var title = '';
            var main = '请确认微信支付是否已完成';
            var yes = '重新支付';
            var no = '已完成支付';
            var id = $el.find('#requestId').val();
            var requestIdArr = id.split(',');
            var tempRequestId = 0;
            for (var i = 0; i < requestIdArr.length; i++) {
                if (tempRequestId < requestIdArr[i]) {
                    tempRequestId = requestIdArr[i];
                }

            }
            id = tempRequestId;
            //          backOr(title, main, yes, no, function () {
            //              getCheckPay(id, questionType);
            //          }, function () {
            //              getCheckPay(id, questionType);
            //          });
        }

        function getCheckPay(id, questionType) {
            $.ajax({
                type: 'get',
                url: 'check/' + id,
                success: function (msg) {
                    if (msg === 'OK') {
                        window.top.location.href = 'comment?requestId=' + id + '&questionType=' + questionType;
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

        // load页面时，显示支付类型
        function showPayType() {
            // 判断是否处于微信环境中
            if (isWeiXin()) {
                $el.find('#questionType').val(getQueryString('state'));
                $el.find('#code').val(getQueryString('code'));
                $el.find('.payType_apply').hide();
                $el.find('.payType_weixin').show();
                $el.find('.payType_weixin .cash_allowed2').show();
                $el.find('.payType_weixin .cash_allowed1').hide();
                $el.find('input[name=\'paytype\']').val(2);
            }
            else if (channel === 'bcm' || fromChannel === 'bocomm') {
                $el.find('.payType_cash').not('.payType_bcm').hide();
                $el.find('.payType_bcm').show();
                $el.find('input[name=\'paytype\']').val(5);

                /*$el.find(".payType_bcm .cash_allowed2").show();
                $el.find(".payType_bcm .cash_allowed1").hide();*/
                $el.find('#questionType').val(getQueryString('questionType'));
            }
            else if (channel === 'winbaoxian') {
                $el.find('.payType_cash:not(.payType_yinlian)').hide();
                $el.find('.payType_yinlian').show();
                $el.find('.payType_apply').show();
                $el.find('.payType_weixin').show();
                $el.find('.payType_yinlian .cash_allowed1').hide();
                $el.find('.payType_yinlian .cash_allowed2').show();
                $el.find('input[name=\'paytype\']').val(4);
                $el.find('#questionType').val(getQueryString('questionType'));
            }
            else if (channel === 'baidu_xzh') {
                $el.find('.payType_cash:not(.payType_yinlian)').hide();
                $el.find('.payType_yinlian').show();
                $el.find('.payType_baidu').show();
                $el.find('.payType_yinlian .cash_allowed1').hide();
                $el.find('.payType_yinlian .cash_allowed2').show();
                $el.find('input[name=\'paytype\']').val(4);
                $el.find('#questionType').val(getQueryString('questionType'));
            }
            else {
                $el.find('.payType_apply').show();
                $el.find('.payType_yinlian').show();
                $el.find('input[name=\'paytype\']').val(3);

                /*        $el.find(".payType_apply .cash_allowed2").show();
                        $el.find(".payType_apply .cash_allowed1").hide();*/
                $el.find('#questionType').val(getQueryString('questionType'));
            }

            // 民生银行
            if (fromChannelVal === 'cmbc') {
                $el.find('.payType_cash').not('.payType_cmbc').hide();
                $el.find('.payType_cmbc').show();
                if ($el.find('#unpaidAmount').text() === 0) {
                    $el.find('input[name=\'paytype\']').val(1);
                    $el.find('.payType_cmbc .allow_icon1').show();
                    $el.find('.payType_cmbc .allow_icon2').hide();
                    $el.find('#questionType').val(getQueryString('questionType'));
                }

                cmbcColorChange();
            }
        }

        function checkTalking(requestId) {
            $.ajax({
                type: 'GET',
                url: 'checkTalkingOrder',
                data: {
                    requestId: requestId
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

        function popT02Style(data, type, content) {
            if (data[type]) {
                var typeArr = data[type];
                for (var i = 0; i < typeArr.length; i++) {
                    var item = typeArr[i];
                    var typeCardId = item.id;
                    var remain = item.remain;
                    $el.find('.popLayer').append('<div class="pop_' + type + ' popLayer_item" data-' + type + 'Id="'
                        + typeCardId + '">' + '<span class="pop_icon"></span>' + '<span class="popLayer_item_title">'
                        + content + '</span>' + '<span class="popLayer_item_title_detail">剩余<b>'
                        + remain + '</b>分钟</span>');
                }
                $el.find('.pop_' + type).on('click', function () {
                    $el.find('.payType_cash .cash_allowed1').show();
                    $el.find('.payType_cash .cash_allowed2').hide();
                    $el.find('.payType_cash').off('click');
                    $el.find('#pay__pop').hide();
                    var cardId = $el.find(this).attr('data-' + type + 'Id');
                    $el.find('#cardId').val(cardId);
                    $el.find('#cardType').val(type);
                    $el.find('#card_pop_name').text(content);
                    $el.find('.payType_cash').off('click');
                    load();
                    sessionStorage.setItem('clearWeiXinPay', 0);
                });
            }
            else {
                $el.find('.pop_' + type).hide();
            }
        }

    };

    return customElement;
});
