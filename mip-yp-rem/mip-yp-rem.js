/**
 * @file rem单位算
 * @exports modulename
 * @author xiaoping
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var doc = window.document;
        var docEl = doc.documentElement;
        var metaEl = doc.querySelector('meta[name="divport"]');
        var flexibleEl = doc.querySelector('meta[name="flexible"]');
        var dpr = 0;
        var scale = 0;
        if (metaEl) {
            var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
            if (match) {
                scale = parseFloat(match[1]);
                dpr = parseInt(10, 1 / scale);
            }
        } else if (flexibleEl) {
            var content = flexibleEl.getAttribute('content');
            if (content) {
                var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
                var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
                if (initialDpr) {
                    dpr = parseFloat(initialDpr[1]);
                    scale = parseFloat((1 / dpr).toFixed(2));
                }
                if (maximumDpr) {
                    dpr = parseFloat(maximumDpr[1]);
                    scale = parseFloat((1 / dpr).toFixed(2));
                }
            }
        }
        if (!dpr && !scale) {
            var isIPhone = window.navigator.appVersion.match(/iphone/gi);
            var devicePixelRatio = window.devicePixelRatio;
            if (isIPhone) {
                if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                    dpr = 3;
                } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                    dpr = 2;
                } else {
                    dpr = 1;
                }
            } else {
                if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                    dpr = 3;
                } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                    dpr = 2;
                } else {
                    dpr = 1;
                }
            }
            scale = 1 / dpr;
        }
        docEl.setAttribute('data-dpr', dpr);
        if (!metaEl) {
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'divport');
            metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale
                + ', minimum-scale=' + scale + ', user-scalable=no');
            if (docEl.firstElementChild) {
                docEl.firstElementChild.appendChild(metaEl);
            } else {
                var wrap = doc.createElement('div');
                wrap.appendChild(metaEl);
                doc.write(wrap.innerHTML);
            }
        }
        if ((navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|Windows Phone)/i
        ))) {
            var width = document.documentElement.clientWidth;
            var rem = width / 12.42;
            docEl.style.fontSize = rem + 'px';
        } else {
            document.getElementsByTagName('html')[0].style.fontSize = 100 + 'px';
        }
    };
    return customElement;
});