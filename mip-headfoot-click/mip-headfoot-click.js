/**
 * @file mip-head-foot 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var element = '';

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element2 = this.element;
        element = element2;
    };
    if (window.top.location.protocol !== 'https:') {
        window.top.location.href = window.top.location.href.replace('http:', 'https:');
    };
    function openbuy() {
        var u = navigator.userAgent;
        if (!! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
            || u.indexOf('Android') > -1
            || u.indexOf('Linux') > -1
            || u.indexOf('iPhone') > -1
            || u.indexOf('iPad') > -1) {
            window.top.location.href = 'https://m.taoguba.com.cn/checkFromMstgb';
        } else {
            alert('请使用app或掌上淘股吧购买产品');
        }
    }
    function alterAtarget() {

    }

    /**
 		 *头部js
 		 **/
    var userID = $('.div_head_data', element).attr('data-type');
    var ssoPath = $('.div_head_data', element).attr('name');
    // 活跃度统计
    var domainUrl = document.domain;
    var rootDomain = domainUrl.substring(domainUrl.indexOf('taoguba'));
    var summaryUrl = 'https://bi.' + rootDomain + '/register/summaryUserActive';
    // 搜索状态下导航栏不变
    var searchStatus = 'true';
    $('#Msearch', element).focus(function () {
        searchStatus = 'false';
    });

    $.ajax({
        type: 'GET',
        url: summaryUrl,
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function () {},
        error: function () {}
    });
    // 消息中心区域外隐藏
    var xLstatus1 = 0;
    var xLstatus2 = 0;
    $(document).click(function () {
        $('.content_sortXL', element).hide();
    });
    $('.Mhead_userbtn', element).click(function (event) {
        if (xLstatus2 % 2 === 0) {
            $('.MheadXL2', element).show();
            $('.Mhead_userbtn', element).find('.Mhimg3').attr('src', 'https://css.taoguba.com.cn/images/mNew/guanbi.png');
        } else {
            $('.MheadXL2', element).hide();
            var img2 = $('.Mhead_userbtn', element).find('.Mhimg3').attr('data-img');
            $('.Mhead_userbtn', element).find('.Mhimg3').attr('src', img2);
        }
        xLstatus2++;
        event = event || window.event;
        event.stopPropagation();
    });
    // 上拉与下拉切换头部
    var HstartY;
    var HendY;
    document.addEventListener('touchstart',
    function (event) {
        HstartY = event.touches[0].pageY;
    },
    false);
    document.addEventListener('touchend',
    function (event) {
        HendY = event.changedTouches[0].pageY;
        var isOver = HendY - HstartY;
        if (isOver > 0 && searchStatus === 'true') {
            // 下滑状态
            $('#openApp', element).show();
        } else if (isOver < 0) {
            $('#openApp', element).hide();
        }
    },
    false);
    appInfo();
    function appInfo() {
        var url = 'appUserInfo?userID=' + userID;
        var localImg = localStorage.getItem('local_img' + userID);
        if (localImg) {
            $('.Mheader_user', element).css('background-image', 'url(' + localImg + ')');
        } else {
            $.getJSON(url,
            function (obj) {
                var jsonObj = obj.dto;
                if (jsonObj.pr === 'img/user_icon_60.png') {
                    var Himg = 'https://image.taoguba.com.cn/img/user_icon_60.png';
                } else {
                    var Himg = 'https://image.taoguba.com.cn/img/' + jsonObj.pr;
                }
                $('.Mheader_user', element).css('background-image', 'url(' + localImg + ')');
                // console.log('5656');
                localStorage.setItem('local_img' + userID, Himg);
            });
        }
    }
    // 切换状态栏
    var qhUrl = window.location.href;
    if (qhUrl.indexOf('/mNewCenter') > -1) {
        $('.zyPage', element).css({
            'border-bottom': '0.8vw solid #5A97C1',
            'padding-bottom': '1vw'
        });
    } else if (qhUrl.indexOf('/mUseful') > -1) {
        $('.tjPage', element).css({
            'border-bottom': '0.8vw solid #5A97C1',
            'padding-bottom': '1vw'
        });
    } else if (qhUrl.indexOf('/mIndex') > -1) {
        $('.ltPage', element).css({
            'border-bottom': '0.8vw solid #5A97C1',
            'padding-bottom': '1vw'
        });
    } else if (qhUrl.indexOf('/quotes') > -1) {
        $('.hqPage', element).css({
            'border-bottom': '0.8vw solid #5A97C1',
            'padding-bottom': '1vw'
        });
    }
    function mopenAPP(topicID, replyID) {
        // 判断当前位Android 还是iOS
        var u = navigator.userAgent;
        var app = navigator.appVersion;
        // g
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        // ios终端
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.top.location.href = 'https://m.taoguba.com.cn/downloadApp';
                } else {
                    window.close();
                }
            },
            25);

            if (topicID === 0) {
                window.location.href = 'taoguba://taoguba.com.cn';
            } else {
                isLogin();
                if (replyID === 0) {
                    window.top.location.href = 'taoguba://app.topic/openTopic?topicId=' + topicID;
                } else {
                    window.top.location.href = 'taoguba://app.topic/openTopic?topicId=' + topicID + '&replyId=' + replyID;
                }
            }

        }
        if (isIOS) {
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.top.location.href = 'https://m.taoguba.com.cn/downloadApp';
                } else {
                    window.close();
                }
            },
            25);

            if (topicID === 0) {
                window.top.location.href = 'tgbiosapp://';
            } else {
                isLogin();
                window.top.location.href = 'tgbiosapp://?type=openTopic&topicId=' + topicID + '&replyId=' + replyID;
            }
        }

    }
    // 判断是否登录
    function isLogin() {
        var isLogin = userID;
        if (isLogin === 0) {
            window.top.location.href = ssoPath + '/m/login/index';
        } else {
            return;
        }
    }
    function openArticle() {
        isLogin();
        // 判断当前位Android 还是iOS
        var u = navigator.userAgent;
        var app = navigator.appVersion;
        // g
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        // ios终端
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            var state = null;
            try {
                state = window.open('taoguba://app.topic/openAddTopic');
            } catch (e) {}
            if (state) {
            } else {
                window.top.location.href = 'https://m.taoguba.com.cn/downloadApp';
            }
        }
        if (isIOS) {
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.location = 'https://m.taoguba.com.cn/downloadApp';
                } else {

                }
            },
            25);
            window.top.location.href = 'tgbiosapp://?type=addTopic';
        }
    }
    $('#openApp', element).click(function () {
        mopenAPP(0, 0);
    });
    return customElement;
});