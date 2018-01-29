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
        var downLoadUrl = 'https://tg.cngold.org/jtw/download/m/open_app.html';
        if (docFlag === 'true') {
            var docId = ele.getAttribute('docId');
            var baseSchemeDoc = 'jtw://com.jijinhao.jtw/news/detail?sourceType=1&id=' + docId;
        }
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
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
                    document.getElementById('openapp').href = baseSchemeDoc;
                    document.getElementById('openapp').click();
                }
                else {
                    document.getElementById('openapp').href = baseSchemeAdr;
                    document.getElementById('openapp').click();
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
        document.getElementById('openapp').onclick = function () {
            openApp();
        };
    };

    return customElement;
});
