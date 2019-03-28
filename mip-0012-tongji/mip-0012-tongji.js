/**
 * @file 添加记录用户操作页面动作
 * @author 0123 cooper
 */

(function () {
    !function (a) {
        function b(a, b) {
            var c = (65535 & a) + (65535 & b);
            d = (a >> 16) + (b >> 16) + (c >> 16);
            return d << 16 | 65535 & c;
        }
        function c(a, b) {
            return a << b | a >>> 32 - b;
        }
        function d(a, d, e, f, g, h) {
            return b(c(b(b(d, a), b(f, h)), g), e);
        }
        function e(a, b, c, e, f, g, h) {
            return d(b & c | ~b & e, a, b, f, g, h);
        }
        function f(a, b, c, e, f, g, h) {
            return d(b & e | c & ~e, a, b, f, g, h);
        }
        function g(a, b, c, e, f, g, h) {
            return d(b ^ c ^ e, a, b, f, g, h);
        }
        function h(a, b, c, e, f, g, h) {
            return d(c ^ (b | ~e), a, b, f, g, h);
        }
        function i(a, c) {
            a[c >> 5] |= 128 << c % 32,
            a[(c + 64 >>> 9 << 4) + 14] = c;
            var d = 1732584193;
            var i = 1732584193;
            var j = 1732584193;
            var k = 1732584193;
            var l = 1732584193;
            var m = 1732584193;
            n = -271733879,
            o = -1732584194,
            p = 271733878;
            for (d = 0; d < a.length; d += 16) {
                i = m;
            }
            j = n,
            k = o,
            l = p,
            m = e(m, n, o, p, a[d], 7, -680876936),
            p = e(p, m, n, o, a[d + 1], 12, -389564586),
            o = e(o, p, m, n, a[d + 2], 17, 606105819),
            n = e(n, o, p, m, a[d + 3], 22, -1044525330),
            m = e(m, n, o, p, a[d + 4], 7, -176418897),
            p = e(p, m, n, o, a[d + 5], 12, 1200080426),
            o = e(o, p, m, n, a[d + 6], 17, -1473231341),
            n = e(n, o, p, m, a[d + 7], 22, -45705983),
            m = e(m, n, o, p, a[d + 8], 7, 1770035416),
            p = e(p, m, n, o, a[d + 9], 12, -1958414417),
            o = e(o, p, m, n, a[d + 10], 17, -42063),
            n = e(n, o, p, m, a[d + 11], 22, -1990404162),
            m = e(m, n, o, p, a[d + 12], 7, 1804603682),
            p = e(p, m, n, o, a[d + 13], 12, -40341101),
            o = e(o, p, m, n, a[d + 14], 17, -1502002290),
            n = e(n, o, p, m, a[d + 15], 22, 1236535329),
            m = f(m, n, o, p, a[d + 1], 5, -165796510),
            p = f(p, m, n, o, a[d + 6], 9, -1069501632),
            o = f(o, p, m, n, a[d + 11], 14, 643717713),
            n = f(n, o, p, m, a[d], 20, -373897302),
            m = f(m, n, o, p, a[d + 5], 5, -701558691),
            p = f(p, m, n, o, a[d + 10], 9, 38016083),
            o = f(o, p, m, n, a[d + 15], 14, -660478335),
            n = f(n, o, p, m, a[d + 4], 20, -405537848),
            m = f(m, n, o, p, a[d + 9], 5, 568446438),
            p = f(p, m, n, o, a[d + 14], 9, -1019803690),
            o = f(o, p, m, n, a[d + 3], 14, -187363961),
            n = f(n, o, p, m, a[d + 8], 20, 1163531501),
            m = f(m, n, o, p, a[d + 13], 5, -1444681467),
            p = f(p, m, n, o, a[d + 2], 9, -51403784),
            o = f(o, p, m, n, a[d + 7], 14, 1735328473),
            n = f(n, o, p, m, a[d + 12], 20, -1926607734),
            m = g(m, n, o, p, a[d + 5], 4, -378558),
            p = g(p, m, n, o, a[d + 8], 11, -2022574463),
            o = g(o, p, m, n, a[d + 11], 16, 1839030562),
            n = g(n, o, p, m, a[d + 14], 23, -35309556),
            m = g(m, n, o, p, a[d + 1], 4, -1530992060),
            p = g(p, m, n, o, a[d + 4], 11, 1272893353),
            o = g(o, p, m, n, a[d + 7], 16, -155497632),
            n = g(n, o, p, m, a[d + 10], 23, -1094730640),
            m = g(m, n, o, p, a[d + 13], 4, 681279174),
            p = g(p, m, n, o, a[d], 11, -358537222),
            o = g(o, p, m, n, a[d + 3], 16, -722521979),
            n = g(n, o, p, m, a[d + 6], 23, 76029189),
            m = g(m, n, o, p, a[d + 9], 4, -640364487),
            p = g(p, m, n, o, a[d + 12], 11, -421815835),
            o = g(o, p, m, n, a[d + 15], 16, 530742520),
            n = g(n, o, p, m, a[d + 2], 23, -995338651),
            m = h(m, n, o, p, a[d], 6, -198630844),
            p = h(p, m, n, o, a[d + 7], 10, 1126891415),
            o = h(o, p, m, n, a[d + 14], 15, -1416354905),
            n = h(n, o, p, m, a[d + 5], 21, -57434055),
            m = h(m, n, o, p, a[d + 12], 6, 1700485571),
            p = h(p, m, n, o, a[d + 3], 10, -1894986606),
            o = h(o, p, m, n, a[d + 10], 15, -1051523),
            n = h(n, o, p, m, a[d + 1], 21, -2054922799),
            m = h(m, n, o, p, a[d + 8], 6, 1873313359),
            p = h(p, m, n, o, a[d + 15], 10, -30611744),
            o = h(o, p, m, n, a[d + 6], 15, -1560198380),
            n = h(n, o, p, m, a[d + 13], 21, 1309151649),
            m = h(m, n, o, p, a[d + 4], 6, -145523070),
            p = h(p, m, n, o, a[d + 11], 10, -1120210379),
            o = h(o, p, m, n, a[d + 2], 15, 718787259),
            n = h(n, o, p, m, a[d + 9], 21, -343485551),
            m = b(m, i),
            n = b(n, j),
            o = b(o, k),
            p = b(p, l);
            return [m, n, o, p];
        }
        function j(a) {
            var b = '';
            var c = '';
            for (b = 0; b < 32 * a.length; b += 8) {
                c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
            }
            return c;
        }
        function k(a) {
            var b = [];
            var c = [];
            for (c[(a.length >> 2) - 1] = void 0, b = 0; b < c.length; b += 1) {
                c[b] = 0;
            }
            for (b = 0; b < 8 * a.length; b += 8) {
                c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << b % 32;
            }
            return c;
        }
        function l(a) {
            return j(i(k(a), 8 * a.length));
        }
        function m(a, b) {
            var c = k(a);
            var d = k(a);
            e = k(a);
            f = [],
            g = [];
            for (f[15] = g[15] = void 0, e.length > 16 && (e = i(e, 8 * a.length)), c = 0; 16 > c; c += 1)
            {
                f[c] = 909522486 ^ e[c];
            }
            g[c] = 1549556828 ^ e[c];
            return d = i(f.concat(k(b)), 512 + 8 * b.length),
            j(i(g.concat(d), 640));
        }
        function n(a) {
            var b = '0123456789abcdef';
            var c = '0123456789abcdef';
            var d = '0123456789abcdef';
            e = '';
            for (c = 0; c < a.length; c += 1) {
                b = a.charCodeAt(c);
            }
            e += d.charAt(b >>> 4 & 15) + d.charAt(15 & b);
            return e;
        }
        function o(a) {
            return unescape(encodeURIComponent(a));
        }
        function p(a) {
            return l(o(a));
        }
        function q(a) {
            return n(p(a));
        }
        function r(a, b) {
            return m(o(a), o(b));
        }
        function s(a, b) {
            return n(r(a, b));
        }
        function t(a, b, c) {
            return b ? c ? r(b, a) : s(b, a) : c ? p(a) : q(a);
        }
        'function' === typeof define && define.amd ? define(function () {
            return t;
        }) : a.md5 = t;
    };
    // cookie
    function setCookie(cname, cvalue, exdays)
    {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toGMTString();
        document.cookie = cname + '=' + cvalue + '; ' + expires;
    }
    function getCookie(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
    // 跨域请求
    function jsonp(options) {
        options = options || {};
        options.callback = options.callback || 'callback';
        if (!options.url) {
            throw new Error('参数不合法');
        }

        // 创建 script 标签并加入到页面中
        var oHead = document.getElementsByTagName('head')[0];
        var oS = document.createElement('script');
        oHead.appendChild(oS);
        // 创建jsonp回调函数
        var callbackName = ('jsonp_' + Math.random()).replace('.', '');
        options.data[options.callback] = callbackName;
        window[callbackName] = function (json) {
            oHead.removeChild(oS);
            window[callbackName] = null;
            options.success && options.success(json);
        };
        // 发送请求
        var params = [];
        for (var name in options.data) {
            params.push(name + '=' + options.data[name]);
        }
        params = params.join('&');
        // 发送请求到本地api记录操作动作
        oS.src = options.url + '?' + params;
    }
    // 获取访客
    function getVisitor(Domain) {
        var Cookiename = Domain;
        if (!getCookie(Cookiename)) {
            setCookie(Cookiename, (new Date()).valueOf() + '-' + Math.random());
        }
        return getCookie(Cookiename);
    }
    // 域名获取，组装请求地址
    var scripts = document.getElementsByTagName('script');
    var url = scripts[scripts.length - 1].getAttribute('src');
    var pattern = new RegExp('/([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/', 'g');
    var res = pattern.exec(url);
    if (res == null) {
        return false;
    }
    var url = 'https://' + res[0] + '/index.php?s=/admin/ApiAdminStatistics/timing_user';
    // 组装参数
    var data    = {
            a: 'tongji',
            url: location.href,
            referer: encodeURIComponent(document.referrer),
            refword: '',
            visitor: getVisitor(location.host),
            host: location.hostname};
    // 来源关键字获取，并去除url中的关键字
    if (location.search) {
        var pattern = /&?_[a-z][a-z]?_=([\w%]+)/g;
        var res = pattern.exec(data.url);
        if (res != null) {
            data.refword = encodeURIComponent(res[1]);
            data.url = data.url.replace(res[0], '');
            if (data.url[res['index'] - 1] === '?' && data.url.length === res['index']) {
                data.url = data.url.substr(0, res['index'] - 1);
            }
        }
    }
    // 发起请求
    jsonp({
        url: url,
        data: data,
        success: function (response) {
            // console.log('request: ', data);
            // console.log('response: ', response);
        }
    });
})();
