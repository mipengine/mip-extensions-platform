/**
 * @file css3 rem单位
 * @author 海飞
 * @time 2018.10.
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function (N, M) {
        var K;
        var J = N.document;
        var I = J.documentElement;
        var H = J.querySelector('meta[name="viewport"]');
        var G = J.querySelector('meta[name="flexible"]');
        var F = 0;
        var E = 0;
        var D = M.flexible || (M.flexible = {});
        function calculateRem() {
            var a = I.getBoundingClientRect().width;
            a / F > 750 && (a = 750 * F);
            var d = a / 7.5;
            I.style.fontSize = d + 'px',
            D.rem = N.rem = d;
        }
        if (H) {
            var C = H.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
            C && (E = parseFloat(C[1]), F = parseInt(1 / E, 10));
        }
        else if (G) {
            var B = G.getAttribute('content');
            if (B) {
                var A = B.match(/initial\-dpr=([\d\.]+)/);
                var z = B.match(/maximum\-dpr=([\d\.]+)/);
                A && (F = parseFloat(A[1]), E = parseFloat((1 / F).toFixed(2)));
                z && (F = parseFloat(z[1]), E = parseFloat((1 / F).toFixed(2)));
            }
        }
        if (!F && !E) {
            var y = N.navigator.userAgent;
            var x = (y.match(/android/gi), !!y.match(/iphone/gi));
            var w = x && !!y.match(/OS 9_3/);
            var v = N.devicePixelRatio;
            E = 1 / (F = x && !w ? v >= 3 && (!F || F >= 3) ? 3 : v >= 2 && (!F || F >= 2) ? 2 : 1 : 1);
        }
        if (I.setAttribute('data-dpr', F), !H) {
            var k1 = (H = J.createElement('meta')).setAttribute('name', 'viewport');
            var tx = 'initial-scale=' + E + ', maximum-scale=' + E + ', minimum-scale=' + E + ', user-scalable=no';
            var k2 = H.setAttribute('content', tx);
            if (k1, k2, I.firstElementChild) {
                I.firstElementChild.appendChild(H);
            }
            else {
                var u = J.createElement('div');
                u.appendChild(H);
                J.write(u.innerHTML);
            }
        }
        N.addEventListener('resize', function () {
            clearTimeout(K);
            K = setTimeout(calculateRem(), 300);
        }, !1);
        N.addEventListener('pageshow', function (b) {
            b.persisted && (clearTimeout(K), K = setTimeout(calculateRem(), 300));
        }, !1);
        'complete' === J.readyState ? J.body.style.fontSize = 12 * F + 'px' : J.addEventListener('DOMContentLoaded',
            function () {
                J.body.style.fontSize = 12 * F + 'px';
            }, !1);
        calculateRem();
        D.dpr = N.dpr = F;
        D.refreshRem = calculateRem();
        D.rem2px = function (d) {
            var c = parseFloat(d) * this.rem;
            return 'string' === typeof d && d.match(/rem$/) && (c += 'px'), c;
        };
        D.px2rem = function (d) {
            var c = parseFloat(d) / this.rem;
            return 'string' === typeof d && d.match(/px$/) && (c += 'rem'), c;
        };
    };
    return customElement;
});
