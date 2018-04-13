/**
 * @file mip-cgcep-shipei 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    var adapter = function (win) {
            var dpr = 0;
            var scale = 0;
            var devicePixelRatio = 1;
            var bodyFontSize = 14;
            var timer = null;
            var doc = win.document;
            var htmlEle = doc.documentElement;
            var viewportEle = doc.querySelector('meta[name="viewport"]');
            var calcDprAndScale = function () {
                devicePixelRatio = win.devicePixelRatio;
                var iphone = win.navigator.appVersion.match(/iphone/gi);
                var android = win.navigator.appVersion.match(/android/gi);
                if (iphone) {
                    if (devicePixelRatio >= 3) {
                        dpr = 3;
                    } else {
                        if (devicePixelRatio >= 2) {
                            dpr = 2;
                        } else {
                            dpr = 1;
                        }
                    }
                } else {
                    dpr = 1;
                }
                scale = (1 / dpr).toFixed(6);
            };
            var refresh = function () {
                var docWidth = htmlEle.clientWidth;
                var rootFontSize;
                calcDprAndScale();
                if (docWidth / dpr > 540) {
                    docWidth = 540 * dpr;
                }
                htmlEle.setAttribute('data-dpr', dpr);
                rootFontSize = docWidth / 16;
                htmlEle.style.fontSize = rootFontSize + 'px';
                if (doc.body) {
                    doc.body.style.fontSize = bodyFontSize * dpr + 'px';
                }
            };
            if (viewportEle) {
                var matchArray = viewportEle
                    .getAttribute('content')
                    .match(/initial-scale=([\d\.]+)/);
                scale = matchArray[1];
                dpr = parseInt(1 / scale, 16);
            }
            if (dpr === 0 && scale === 0) {
                calcDprAndScale();
            }
            htmlEle.setAttribute('data-dpr', dpr);
            if (!viewportEle) {
                var meta = document.createElement('meta');
                meta.setAttribute('name', 'viewport');
                meta.setAttribute(
                    'content',
                    'width=device-width, initial-scale='
                    + scale
                    + ', maximum-scale='
                    + scale
                    + ', minimum-scale='
                    + scale
                    + ', user-scalable=no'
                );
                if (htmlEle.firstElementChild) {
                    htmlEle.firstElementChild.appendChild(meta);
                } else {
                    console.warn('这个页面没有内容吖...');
                }
            } else {
                viewportEle.setAttribute(
                    'content',
                    'width=device-width, initial-scale='
                    + scale
                    + ', maximum-scale='
                    + scale
                    + ', minimum-scale='
                    + scale
                    + ', user-scalable=no'
                );
            }
            if (doc.readyState === 'complete') {
                doc.body.style.fontSize = bodyFontSize * dpr + 'px';
            } else {
                doc.addEventListener(
                    'DOMContentLoaded',
                    function (e) {
                        doc.body.style.fontSize = bodyFontSize * dpr + 'px';
                    },
                    false
                );
            }
            refresh();
            win.addEventListener(
                'resize',
                function () {
                    clearTimeout(timer);
                    timer = setTimeout(refresh, 300);
                },
                false
            );
            win.addEventListener(
                'pageshow',
                function (e) {
                    if (e.persisted) {
                        clearTimeout(timer);
                        timer = setTimeout(refresh, 300);
                    }
                },
                false
            );
        };

    /**
     * 构建元素，只会执行一次
     * 构建元素时立即执行，减少页面重绘
     */
    customElement.prototype.build = function () {
        adapter(window);
    };

    return customElement;
});
