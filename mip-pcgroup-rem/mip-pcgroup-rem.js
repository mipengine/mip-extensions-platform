/**
 * @file mip-pcgroup-rem 组件
 * @author xuhuanlin
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO

        (function (designWidth, maxWidth) {
            var doc = document;
            var win = window;
            var docEl = doc.documentElement;
            var metaEl;
            var metaElCon;
            var remStyle = document.createElement('style');
            var tid;
            var wrap;

            function refreshRem() {
                // var width = parseInt(window.screen.width); // uc有bug
                var width = docEl.getBoundingClientRect().width;
                if (!maxWidth) {
                    maxWidth = 540;
                }
                if (width > maxWidth) { // 淘宝做法：限制在540的屏幕下，这样100%就跟10rem不一样了
                    width = maxWidth;
                }

                var rem = width * 100 / designWidth;
                // var rem = width / 10; // 如果要兼容vw的话分成10份 淘宝做法
                // docEl.style.fontSize = rem + "px"; 旧的做法，在uc浏览器下面会有切换横竖屏时定义了font-size的标签不起作用的bug
                remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
            }

            // 设置 viewport ，有的话修改 没有的话设置
            metaEl = doc.querySelector('meta[name="viewport"]');
            // 20171219修改：增加 viewport-fit=cover ，用于适配iphoneX
            metaElCon = 'width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no,viewport-fit=cover';
            if (metaEl) {
                metaEl.setAttribute('content', metaElCon);
            }
            else {
                metaEl = doc.createElement('meta');
                metaEl.setAttribute('name', 'viewport');
                metaEl.setAttribute('content', metaElCon);
                if (docEl.firstElementChild) {
                    docEl.firstElementChild.appendChild(metaEl);
                }
                else {
                    wrap = doc.createElement('div');
                    wrap.appendChild(metaEl);
                    doc.write(wrap.innerHTML);
                    wrap = null;
                }
            }

            // 要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
            refreshRem();

            if (docEl.firstElementChild) {
                docEl.firstElementChild.appendChild(remStyle);
            }
            else {
                wrap = doc.createElement('div');
                wrap.appendChild(remStyle);
                doc.write(wrap.innerHTML);
                wrap = null;
            }

            win.addEventListener('resize', function () {
                clearTimeout(tid); // 防止执行两次
                tid = setTimeout(refreshRem, 300);
            }, false);

            win.addEventListener('pageshow', function (e) {
                if (e.persisted) { // 浏览器后退的时候重新计算
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }
            }, false);

            if (doc.readyState === 'complete') {
                doc.body.style.fontSize = '16px';
            }
            else {
                doc.addEventListener('DOMContentLoaded', function (e) {
                    doc.body.style.fontSize = '16px';
                }, false);
            }
        })(750, 750);
    };

    return customElement;
});
