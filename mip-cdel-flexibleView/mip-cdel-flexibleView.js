/**
 * @file mip-cdel-flexibleView 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var doc = window.document;
        var docEle = doc.documentElement;
        var metaEle = doc.querySelector('meta[name="viewport"]');
        var flexibleEle = doc.querySelector('meta[name="flexible"]');
        var dpr = 0;
        var scale = 0;
        var tid;
        var flexible = window.flexible || (window.flexible = {});

        if (metaEle) {
            var match = metaEle.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
            if (match) {
                scale = parseFloat(match[1]);
                dpr = parseInt(1 / scale, 10);
            }
        } else if (flexibleEle) {
            var content = flexibleEle.getAttribute('content');
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
            var isAndroid = window.navigator.appVersion.match(/android/gi);
            var isIPhone = window.navigator.appVersion.match(/iphone/gi);
            var devicePixelRatio = window.devicePixelRatio;
            if (isIPhone) {
                // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
                if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                    dpr = 3;
                } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                    dpr = 2;
                } else {
                    dpr = 1;
                }
            } else {
                // 其他设备下，仍旧使用1倍的方案
                dpr = 1;
            }
            scale = 1 / dpr;
        }

        docEle.setAttribute('data-dpr', dpr);
        if (!metaEle) {
            metaEle = doc.createElement('meta');
            metaEle.setAttribute('name', 'viewport');
            var initscale = 'initial-scale=' + scale;
            var maximumscale = ', maximum-scale=' + scale;
            var minimumscale = ', minimum-scale=' + scale;
            metaEle.setAttribute('content', initscale + maximumscale + minimumscale + ', user-scalable=no');
            if (docEle.firstElementChild) {
                docEle.firstElementChild.appendChild(metaEle);
            } else {
                var wrap = doc.createElement('div');
                wrap.appendChild(metaEle);
                doc.write(wrap.innerHTML);
            }
        }

        function refreshRem() {
            var width = docEle.getBoundingClientRect().width;
            if (width / dpr > 768) {
                width = 768 * dpr;
            }
            var rem = width / 10;
            docEle.style.fontSize = rem + 'px';
            flexible.rem = window.rem = rem;
        }

        window.addEventListener('resize', function () {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }, false);
        window.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        }, false);

        if (doc.readyState === 'complete') {
            doc.body.style.fontSize = 12 * dpr + 'px';
        } else {
            doc.addEventListener('DOMContentLoaded', function (e) {
                doc.body.style.fontSize = 12 * dpr + 'px';
            }, false);
        }

        refreshRem();

        flexible.dpr = window.dpr = dpr;
        flexible.refreshRem = refreshRem;
        flexible.rem2px = function (d) {
            var val = parseFloat(d) * this.rem;
            if (typeof d === 'string' && d.match(/rem$/)) {
                val += 'px';
            }
            return val;
        };
        flexible.px2rem = function (d) {
            var val = parseFloat(d) / this.rem;
            if (typeof d === 'string' && d.match(/px$/)) {
                val += 'rem';
            }
            return val;
        };
    };
    return customElement;
});
