/**
 * @file mip-jt-openapp 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        // 创建iframe
        var createIframe = (function () {
                var iframe;
                return function () {
                    if (iframe) {
                        return iframe;
                    }
                    iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);
                    return iframe;
                };
            })();
            // 创建baseScheme
        var baseSchemeAdr = 'jtw://com.jijinhao.jtw/startapp?startapp=0';
        var baseSchemeIOS = 'jtw://com.jijinhao.jtw/';
        var downLoadUrl = 'https://tg.cngold.org/jtw/download/m/share_m.html';
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
        var isChrome = window.navigator.userAgent.indexOf('Chrome') !== -1;
        // 打开APP
        var openApp = function () {
            var openIframe = createIframe();
            var loadDateTime = Date.now();
            if (isiOS) {
                // 判断是否是ios,具体的判断函数自行百度
                window.location.href = baseSchemeIOS;
                setTimeout(function () {
                    var timeOutDateTime = Date.now();
                    if (timeOutDateTime - loadDateTime < 4000) {
                        window.location.href = downLoadUrl;
                    }
                }, 3000);
            }
            else if (isAndroid) {
                // 判断是否是android，具体的判断函数自行百度
                if (isChrome) {
                    // chrome浏览器用iframe打不开得直接去打开，算一个坑
                    window.location.href = baseSchemeAdr;
                }
                else {
                    // 抛出你的scheme
                    openIframe.src = baseSchemeAdr;
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
                openIframe.src = baseSchemeIOS;
                setTimeout(function () {
                    window.location.href = downLoadUrl;
                }, 500);
            }
        };
        document.getElementById('openapp').onclick = function () {
            openApp();
        };
    };

    return customElement;
});
