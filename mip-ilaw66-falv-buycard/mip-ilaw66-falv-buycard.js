/**
 * @file mip-ilaw66-falv-buycard 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    // zepto不支持一些方法，如is,所以使用jquery
    var customElement = require('customElement').create();

    /**
	 * 第一次进入可视区回调，只会执行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var frompage = getQueryString('frompage');
        // back键处理
        $el.find('.glyphicon-menu-left').on('click', function () {
            if (frompage === 'mip_preferential') {
                window.top.location.href = 'mip_preferential';
            }
            else {
                window.history.go(-1);
            }
        });
        $el.find('.wantbuy').css('background', '#ff6100');
        $el.find('.header_block').hide();
        $el.find('.blackboard').show();

        var typeOfCard = getQueryString('cardType');
        $el.find('#cardPrice').text(localStorage.getItem('typePrice' + typeOfCard));
        $el.find('.yearcard-price').removeClass().addClass('card-price_icon' + typeOfCard);

        switch (typeOfCard) {
            case 'T01':
                // 畅聊卡
                $el.find('.yearcard-price').removeClass().addClass('chatingcard-price');
                $el.find('.topbg img:nth-of-type(1)').attr('src', 'images/T01_bg.jpg');
                break;
            case 'T02':
                // 年卡
                $el.find('.topbg img:nth-of-type(1)').attr('src', 'images/buybaonian.jpg');
                break;

            case 'T0201':
                // 无忧
                $el.find('.yearcard-price').removeClass().addClass('wuyou-price');
                $el.find('.topbg img:nth-of-type(1)').attr('src', 'images/cardInfo_wuyou.png');
                $el.find('.topbg img:nth-of-type(2)').attr('src', 'images/cardInfo_wuyou1.png');
                $el.find('.topbg img:nth-of-type(3)').attr('src', 'images/cardInfo_wuyou2.png');
                $el.find('.topbg img:nth-of-type(4)').attr('src', 'images/cardInfo_wuyou3.png');
                $el.find('.topbg img:nth-of-type(5)').attr('src', 'images/cardInfo_wuyou4.png');
                $el.find('.topbg img:nth-of-type(6)').attr('src', 'images/cardInfo_wuyou5.png');
                break;
            case 'T0208':
            case 'T0209':
            case 'T0210':
            case 'T0211':
            case 'T0212':
            case 'T0213':
            case 'T0214':
            case 'T0215':
            case 'T0216':
            case 'T0217':
            case 'T0218':
            case 'T0401':
            case 'T0402':
            case 'T0403':
                $el.find('.topbg img:nth-of-type(1)').attr('src', 'images/icon' + typeOfCard + '.png');
                break;

        }

        // 获取卡的数量
        var cardnum = $el.find('#wantbuynumber').val();
        console.log(cardnum);
        $el.find('#wantbuynumber').val(parseInt(cardnum, 10));
        showBuystyles(cardnum);
        // 获取卡的id
        var id;
        var id = getQueryString(id);
        // 加的效果
        $el.find('.add').on('touchstart', function () {
            var n = $(this).prev().val();
            if (n === '') {
                n = 0;
            }

            var num = parseInt(n, 10) + 1;
            showBuystyles(num);
            if (num > 99) {
                return;
            }

            $(this).prev().val(num);
        });
        // 减的效果
        $el.find('.jian').on('touchstart', function () {
            var n = $(this).next().val();
            var num = parseInt(n, 10) - 1;
            showBuystyles(num);
            if (num <= 0) {
                return;
            }

            $(this).next().val(num);
        });
        $el.find('#wantbuynumber').on('keyup', function () {
            var cardnum = $el.find('#wantbuynumber').val();
            console.log(cardnum);
            if (isNaN(cardnum)) { // 不是纯数字
                showBuyrules();
                $el.find('#wantbuynumber').val(1);
            }
            else {
                // 判断为00-99的数字---去掉以0开头的数字
                if (cardnum === '') {
                    cardnum = 0;
                    showBuystyles(cardnum);
                }

                cardnum = parseInt(cardnum, 10);
            }
            showBuystyles(cardnum);
        });

        // 去购买
        $el.find('.wantbuy').click(function (event) {
            var cardnum = $el.find('#wantbuynumber').val();
            if (cardnum === '' || cardnum === 0 || isNaN(cardnum)) {
                showBuyrules();
                $el.find('#wantbuynumber').val(1);
                return;
            }
            else {
                cardnum = parseInt(cardnum, 10);
            }

            // 当有未支付时，弹出提示信息
            // 调用接口，返回订单id给支付页
            var cardType = getQueryString('cardType');
            var id = getQueryString('id');
            var price;
            price = localStorage.getItem('typePrice' + typeOfCard);

            var productjson = {
                count: cardnum,
                id: id,
                price: price,
                type: cardType
            };
            var productJsonarr = [];
            productJsonarr.push(productjson);
            if (isWeiXin()) {
                // 微信环境
                $.ajax({
                    url: 'lawyerCard/generateUrl',
                    type: 'GET',
                    data: {
                        productJson: JSON.stringify(productJsonarr)
                    },
                    success: function (data) {
                        window.top.location.href = data;
                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }

                        var loadStatus = 'error';
                    }
                });
            }
            else {
                // 非微信环境
                $.ajax({
                    url: 'lawyerCard/buy',
                    type: 'POST',
                    data: 'productJson=' + JSON.stringify(productJsonarr) + '&_csrf=' + $('#_csrf').val(),
                    success: function (data) {
                        var orderId = data;
                        window.top.location.href = 'mip_cash_pay?orderId=' + orderId + '&id=' + id;
                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }

                        var loadStatus = 'error';
                    }
                });
            }

            $el.find('#js-back-leave').click(function () {
                window.top.location.href = 'mip_orderlist';
            });
            $el.find('#js-back-continue').click(function () {
                $el.find('.back__pop').hide();
            });

            event.preventDefault();
        });

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }

        function showBuyrules() {
            $el.find('#unpaymsg').html('最少购买1张，最多购买99张');
            $el.find('.back-continue').html('确定');
            $el.find('.back-leave').css('display', 'none');
            $el.find('.back__pop .back-continue').css('left', '80px');
            $el.find('.back__pop').show();
            $el.find('#js-back-continue').removeClass().addClass('back-continue paylimit');

            $el.find('.paylimit').click(function () {
                $el.find('.back__pop').hide();
            });
        }

        function showBuystyles(cardnum) {
            if (cardnum === '') {
                $el.find('.add').css('pointer-events', 'auto');
                $el.find('.add').css('color', '#666666');
                $el.find('.jian').css('pointer-events', 'none');
                $el.find('.jian').css('color', '#DDDDDD');
            }
            else if (cardnum === 1) {
                $el.find('.add').css('pointer-events', 'auto');
                $el.find('.add').css('color', '#666666');
                $el.find('.jian').css('pointer-events', 'none');
                $el.find('.jian').css('color', '#DDDDDD');
            }
            else if (cardnum < 99) {
                $el.find('.add').css('pointer-events', 'auto');
                $el.find('.add').css('color', '#666666');
                $el.find('.jian').css('pointer-events', 'auto');
                $el.find('.jian').css('color', '#666666');
            }
            else if (cardnum >= 99) {
                $el.find('.add').css('pointer-events', 'none');
                $el.find('.add').css('color', '#DDDDDD');
                $el.find('.jian').css('pointer-events', 'auto');
                $el.find('.jian').css('color', '#666666');
            }
        }

        // 判断是否是微信环境
        function isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match('/MicroMessenger/i') === 'micromessenger') {
                return true;
            }
            else {
                return false;
            }
        }

        $el.find('#wantbuynumber').keypress(function () {
            return (/[\d.]/.test(String.fromCharCode(event.keyCode)));
        });

    };

    return customElement;
});
