/**
 * @file mip-lc-fsize 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
      * 第一次进入可视区回调，只会执行一次
      */
    customElement.prototype.firstInviewCallback = function () {
		// 这个必须使用全局变量window,要使用navigator,还有要计算屏幕宽度高度等。
        var e = window;
        var t = window.lib || (window.lib = {});
        var a;
        var r = e.document;
        var n = r.documentElement;
        var o = r.querySelector('meta[name="viewport"]');
        var l = r.querySelector('meta[name="flexible"]');
        var m = 0;
        var s = 0;
        var d = t.flexible || (t.flexible = {});
        function i() {
            var t = n.getBoundingClientRect().width;
            if (t / m > 540) {
                t = 540 * m;
            }

            var i = t / 10;
            n.style.fontSize = i + 'px', d.rem = e.rem = i;
        }

        if (o) {
            console.warn('将根据已有的meta标签来设置缩放比例');
            var p = o.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
            p && (s = parseFloat(p[1]), m = parseInt(1 / s, 10));
        }
        else if (l) {
            var c = l.getAttribute('content');
            if (c) {
                var u = c.match(/initial\-dpr=([\d\.]+)/);
                var f = c.match(/maximum\-dpr=([\d\.]+)/);
                u && (m = parseFloat(u[1]), s = parseFloat((1 / m).toFixed(2))),
                f && (m = parseFloat(f[1]), s = parseFloat((1 / m).toFixed(2)));
            }
        }

        if (!m && !s) {
            var v = (e.navigator.appVersion.match(/android/gi), e.navigator.appVersion.match(/iphone/gi));
            var h = e.devicePixelRatio;
            m = v ? h >= 3 && (!m || m >= 3) ? 3 : h >= 2 && (!m || m >= 2) ? 2 : 1 : 1, s = 1 / m;
        }

        if (n.setAttribute('data-dpr', m), !o) {
            if (o = r.createElement('meta'), o.setAttribute('name', 'viewport'),
                o.setAttribute('content', 'initial-scale=' + s + ', maximum-scale=' + s
                    + ', minimum-scale=' + s + ', user-scalable=no'), n.firstElementChild) {
                n.firstElementChild.appendChild(o);
            }
            else {
                var x = r.createElement('div');
                x.appendChild(o), r.write(x.innerHTML);
            }
        }

        e.addEventListener('resize', function () {
            clearTimeout(a), a = setTimeout(i, 300);
        }, !1), e.addEventListener('pageshow', function (e) {
            e.persisted && (clearTimeout(a), a = setTimeout(i, 300));
        }, !1), 'complete' === r.readyState ? r.body.style.fontSize = 12 * m
            + 'px' : r.addEventListener('DOMContentLoaded', function (e) {
                r.body.style.fontSize = 12 * m + 'px';
            }, !1), i(), d.dpr = e.dpr = m, d.refreshRem = i, d.rem2px = function (e) {
                var t = parseFloat(e) * this.rem;
                return 'string' === typeof e && e.match(/rem$/) && (t += 'px'), t;
            }, d.px2rem = function (e) {
                var t = parseFloat(e) / this.rem;
                return 'string' === typeof e && e.match(/px$/) && (t += 'rem'), t;
            };
    };
    return customElement;
});
