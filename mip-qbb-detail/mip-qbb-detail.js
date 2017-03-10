/**
 * @file  详情页逻辑脚本
 * @author yml
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var viewport = require('viewport');
    var util = require('util');
    var platform = util.platform;

    var detail = {
        scrollFlagt: false,
        init: function () {
            this.setDownUrl();
            this.setNavBar();
            if ($('.tab1').length > 0) {
                this.tabFix();
            }

        },
        isWeiXin: function () {
            var uaa = navigator.userAgent.toLowerCase();
            var kg = true;
            if (uaa.indexOf('micromessenger') > 0) {
                if (platform.isIos()) { // if ios
                    $('body').append('<div class="mask main-bg">'
                        + '<mip-img src="http://m.qbaobei.com/Public/Down/qbaobeimobile/image/pgwx.png"></mip-img></div>');
                }

                if (platform.isAndroid()) { // if android
                    $('body').append('<div class="mask main-bg">'
                        + '<mip-img src="http://m.qbaobei.com/Public/Down/qbaobeimobile/image/tipwx.png"></mip-img></div>');
                }

                $('.mask img').css({position: 'fixed', right: '22px', top: '15px'});
                document.addEventListener('touchmove', function (e) { // 清除底层文档默认滑动；
                    if (kg) {
                        e.preventDefault();
                        e.stopPropagation();
                    }

                }, false);
                $('.mask').click(function () {
                    $('.mask').remove();
                    kg = false;
                });
                return false;
            }

        },
        setDownUrl: function () {
            var u = navigator.userAgent;
            var that = this;
            if (platform.isAndroid() || u.indexOf('Linux') > -1) {
                $('a.down').attr('href', $('#android-down').val());
                $('a.downscroll').attr('href', $('#android-down').val());
                that.scrollFlagt = true;
            }
            else if (u.indexOf('iPhone') > -1) {
                $('a.down').attr('href', $('#iphone-down').val());
                $('a.downscroll').attr('href', $('#iphone-down').val());
                that.scrollFlagt = true;
            }
            else if (u.indexOf('iPad') > -1) {
                $('a.down').attr('href', $('#ipad-down').val());
                $('a.downscroll').attr('href', $('#ipad-down').val());
                that.scrollFlagt = true;
            }
            else {
                $('a.down').replaceWith('<span class="down sc">正在上架...</span>');
            }
            if (u.indexOf('MicroMessenger') > -1) {
                that.scrollFlagt = false;
                $('a.down').on('click', function () {
                    that.isWeiXin();
                });
            }

            var url = $('a.down').attr('href');
            if (url === '') {
                that.scrollFlagt = false;
                $('a.down').replaceWith('<span class="down sc">正在上架...</span>');
            }

            $('a.down').show();
        },
        setNavBar: function () {
            var that = this;
            if (that.scrollFlagt) { // 如果是安装
                $('.navbar').append('<mip-semi-fixed id="semi-fixed"'
                    + ' fixedClassNames="fixedStyle" threshold="49" class="tab1">'
                    + '<div mip-semi-fixed-container class="absoluteStyle articulo-titulo2" id="list">'
                    + '<div class="li"><span class="type">详情</span></div>'
                    + '<div class="li"><span class="type">相关</span></div>'
                    + '<div class="li last"><span class="type">评论</span></div>'
                    + '</div></mip-semi-fixed>');
            }
            else {
                $('.navbar').append('<mip-semi-fixed id="semi-fixed"'
                    + ' fixedClassNames="fixedStyle" threshold="39" class="tab1">'
                    + '<div mip-semi-fixed-container class="absoluteStyle articulo-titulo2" id="list">'
                    + '<div class="li"><span class="type">详情</span></div>'
                    + '<div class="li"><span class="type">相关</span></div>'
                    + '<div class="li last"><span class="type">评论</span></div>'
                    + '</div></mip-semi-fixed>');
            }
        },
        tabFix: function () {
            var sofftop = $('.tab1').offset().top;
            var flag = false;
            var that = this;
            $('.tab1 .li').on('click', function () {
                var index = $(this).index();
                $(this).addClass('cur').siblings().removeClass('cur');
                $('.dtbox').eq(index).addClass('cur').siblings().removeClass('cur');
                if (flag) {
                    if (that.scrollFlagt) {
                        viewport.setScrollTop($('.dtbox').eq(index).offset().top
                            - $('.tab1').height() - $('.show-detail .list1').height());
                    }
                    else {
                        viewport.setScrollTop($('.dtbox').eq(index).offset().top
                            - $('.tab1').height() - $('header').height());
                    }
                }

            });

            viewport.on('scroll', function (e) {
                var sofftop = $('.tab1').offset().top;
                var dtiltop = $('.show-detail .list2').offset().top;
                var sctop = viewport.getScrollTop();
                var tab1 = $('.tab1 div');
                if (that.scrollFlagt) { // 如果是安装
                    sctop > sofftop ? flag = true : flag = false;
                    sctop > dtiltop ? $('.show-detail .list1').fadeIn() : $('.show-detail .list1').fadeOut();
                }
                else {
                    sctop > sofftop ? flag = true : flag = false;
                }

            });
        }

    };

    customElem.prototype.build = function () {
        detail.init();
    };
    return customElem;
});
