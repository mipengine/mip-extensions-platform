/**
 * @file mip-jt-openapp 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var docFlag = ele.getAttribute('doc');
            // 创建baseScheme
        var baseSchemeAdr = 'jtw://com.jijinhao.jtw/startapp?startapp=0';
        var baseSchemeIOS = 'jtw://com.jijinhao.jtw/';

        var downLoadUrl;
        var websiteUrl = window.location.href.split('/')[3];
        if (websiteUrl === '' || websiteUrl === 'gold' || websiteUrl === 'ag') {// 主站、黄金、白银
            downLoadUrl = 'https://tg.cngold.org/jtw/download/m/open_app_gjs.html';
        } else if (websiteUrl === 'forex') {// 外汇
            downLoadUrl = 'https://tg.cngold.org/jtw/download/m/open_app_forex.html';
        } else if (websiteUrl === 'energy') {// 原油
            downLoadUrl = 'https://tg.cngold.org/jtw/download/m/open_app_energy.html';
        } else if (websiteUrl === 'futures') {// 期货
            downLoadUrl = 'https://tg.cngold.org/jtw/download/m/open_app_futures.html';
        } else if (websiteUrl === 'stock' || websiteUrl === 'hkstock' || websiteUrl === 'usstock') {// 股票、港股、美股
            downLoadUrl = 'https://tg.cngold.org/jtw/download/m/open_app_stock.html';
        } else if (websiteUrl === 'jiage') {// 价格
            downLoadUrl = 'https://tg.cngold.org/jtw/download/m/open_app_price.html';
        } else if (websiteUrl === 'xianhuo') {// 现货
            downLoadUrl = 'https://tg.cngold.org/jtw/download/m/open_app_xianhuo.html';
        } else if (websiteUrl === 'credit') {// 信用卡
            downLoadUrl = 'https://tg.cngold.org/jtw/download/m/open_app_credit.html';
        } else {
            downLoadUrl = 'https://tg.cngold.org/jtw/download/m/open_app.html';
        }


        if (docFlag === 'true') {
            var docId = ele.getAttribute('docId');
            var baseSchemeDoc = 'jtw://com.jijinhao.jtw/news/detail?sourceType=1&id=' + docId;
        }
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
        var openapp = document.getElementById('openapp');
        // 打开APP
        var openApp = function () {
            var loadDateTime = Date.now();
            if (isiOS) {
                // 判断是否是ios
                if (docFlag === 'true') {
                    window.location.href = baseSchemeDoc;
                }
                else {
                    window.location.href = baseSchemeIOS;
                }
                setTimeout(function () {
                    var timeOutDateTime = Date.now();
                    if (timeOutDateTime - loadDateTime < 4000) {
                        window.location.href = downLoadUrl;
                    }
                }, 3000);
            }
            else if (isAndroid) {
                // 判断是否是android
                if (docFlag === 'true') {
                    window.location.href = baseSchemeDoc;
                }
                else {
                    window.location.href = baseSchemeAdr;
                }
                setTimeout(function () {
                    var timeOutDateTime = Date.now();
                    if (timeOutDateTime - loadDateTime < 2000) {
                        window.location.href = downLoadUrl;
                    }
                }, 1500);
            }
            else {
                // 主要是给winphone的用户准备的
                window.location.href = baseSchemeIOS;
                setTimeout(function () {
                    window.location.href = downLoadUrl;
                }, 500);
            }
        };
        openapp.onclick = function () {
            openApp();
        };
        // 判断滚动条滚动方向
        function scroll(fn) {
            var beforeScrollTop = document.body.scrollTop;
            fn = fn || function () {};
            window.addEventListener('scroll', function () {
                var afterScrollTop = document.body.scrollTop;
                var delta = afterScrollTop - Math.abs(beforeScrollTop);
                // if( delta === 0 ) return false;
                fn(delta > 0 ? 'down' : 'up');
                beforeScrollTop = afterScrollTop;
            }, false);
        }
        scroll(function (direction) {
            var comHeight = document.getElementById('comment_html_div').clientHeight;
            if (direction === 'down') {
                // 当有评论框时
                if (comHeight > 0) {
                    document.getElementsByClassName('fixed-btn')[0].style.bottom = '.6rem';
                }
            }
            else {
                // 当有评论框时
                if (comHeight > 0) {
                    document.getElementsByClassName('fixed-btn')[0].style.bottom = '1.2rem';
                }
            }
        });
    };

    return customElement;
});
