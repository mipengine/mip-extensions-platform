/**
 * @file 妈妈帮移动端适配方案----flexible
 * @author dengzehua
 * @time 2017.5.23
 */
define(function (require) {
    var customElement = require('customElement').create();

    function b(J, I) {
        var G;
        var F = J.document;
        var E = F.documentElement;
        var D = F.querySelector('meta[name="viewport"]');
        var C = F.querySelector('meta[name="flexible"]');
        var B = 0;
        var A = 0;
        var z = I.flexible || (I.flexible = {});
        function h() {
            var a = E.getBoundingClientRect().width;
            a / B > 540 && (a = 540 * B);
            var d = a / 10;
            E.style.fontSize = d + 'px',
            z.rem = J.rem = d;
        }
        if (D) {
            var y = D.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
            y && (A = parseFloat(y[1]),
            B = parseInt(1 / A, 10));
        }
		else {
            if (C) {
                var x = C.getAttribute('content');
                if (x) {
                    var w = x.match(/initial\-dpr=([\d\.]+)/);
                    var v = x.match(/maximum\-dpr=([\d\.]+)/);
                    w && (B = parseFloat(w[1]),
                    A = parseFloat((1 / B).toFixed(2))),
                    v && (B = parseFloat(v[1]),
                    A = parseFloat((1 / B).toFixed(2)));
                }
            }
        }
        if (!B && !A) {
            var u = (J.navigator.appVersion.match(/android/gi),
            J.navigator.appVersion.match(/iphone/gi));
            var t = J.devicePixelRatio;
            B = u ? t >= 3 && (!B || B >= 3) ? 3 : t >= 2 && (!B || B >= 2) ? 2 : 1 : 1,
            A = 1 / B;
        }
        if (E.setAttribute('data-dpr', B),
        !D) {
            if (D = F.createElement('meta'),
            D.setAttribute('name', 'viewport'),
            D.setAttribute('content', 'initial-scale=' + A + ', maximum-scale=' + A + ', minimum-scale=' + A
			+ ', user-scalable=no'),
            E.firstElementChild) {
                E.firstElementChild.appendChild(D);
            }
            else {
                var s = F.createElement('div');
                s.appendChild(D),
                F.write(s.innerHTML);
            }
        }
        J.addEventListener('resize', function () {
            clearTimeout(G),
            G = setTimeout(h, 300);
        }, !1),
        J.addEventListener('pageshow', function (b) {
            b.persisted && (clearTimeout(G),
            G = setTimeout(h, 300));
        }, !1),
        'complete' === F.readyState ? F.body.style.fontSize = 12 * B
            + 'px' : F.addEventListener('DOMContentLoaded', function () {
                F.body.style.fontSize = 12 * B + 'px';
            }, !1),
        h(),
        z.dpr = J.dpr = B,
        z.refreshRem = h,
        z.rem2px = function (d) {
            var c = parseFloat(d) * this.rem;
            return 'string' === typeof d && d.match(/rem$/) && (c += 'px'),
            c;
        }
        ,
        z.px2rem = function (d) {
            var c = parseFloat(d) / this.rem;
            return 'string' === typeof d && d.match(/px$/) && (c += 'rem'),
            c;
        };
    }
    b(window, window.lib || (window.lib = {}));


    return customElement;
});
