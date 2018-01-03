/**
 * @file mip-unique-visitor
 * @author idongde
 */

define(function (require) {
    var $ = require('jquery');
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        // MD5加密源码
        var md5 = (function (r) {
            var t = {};
            function n(o) {
                if (t[o]) {
                    return t[o].exports;
                }

                var e = t[o] = {
                    i: o,
                    l: !1,
                    exports: {}
                };
                return r[o].call(e.exports, e, e.exports, n),
                    e.l = !0,
                    e.exports;
            }
            return n.m = r,
                n.c = t,
                n.i = function (r) {
                    return r;
                },
                n.d = function (r, t, o) {
                    n.o(r, t) || Object.defineProperty(r, t, {
                        configurable: !1,
                        enumerable: !0,
                        get: o
                    });
                },
                n.n = function (r) {
                    var t = r && r.__esModule ? function () {
                        return r.default;
                    } : function () {
                        return r;
                    };
                    return n.d(t, 'a', t),
                        t;
                },
                n.o = function (r, n) {
                    return Object.prototype.hasOwnProperty.call(r, n);
                },
                n.p = '',
                n(n.s = 4);
        })([function (r, n) {
            var t = {
                utf8: {
                    stringToBytes: function (r) {
                        return t.bin.stringToBytes(unescape(encodeURIComponent(r)));
                    },
                    bytesToString: function (r) {
                        return decodeURIComponent(escape(t.bin.bytesToString(r)));
                    }
                },
                bin: {
                    stringToBytes: function (r) {
                        for (var n = [], t = 0; t < r.length; t++) {
                            n.push(255 & r.charCodeAt(t));

                        }
                        return n;
                    },
                    bytesToString: function (r) {
                        for (var n = [], t = 0; t < r.length; t++) {
                            n.push(String.fromCharCode(r[t]));

                        }
                        return n.join('');
                    }
                }
            };
            r.exports = t;
        }, function (r, n, t) {
            (function () {
                var n = t(2);
                var o = t(0).utf8;
                var e = t(3);
                var u = t(0).bin;
                var i = function (r, t) {
                        r.constructor === String
                            ? r = t && 'binary' === t.encoding
                            ? u.stringToBytes(r) : o.stringToBytes(r) : e(r)
                            ? r = Array.prototype.slice.call(r, 0) : Array.isArray(r) || (r = r.toString());
                        for (var f = n.bytesToWords(r), s = 8 * r.length, c = 1732584193, a = -271733879,
                            l = -1732584194, g = 271733878, h = 0; h < f.length; h++) {
                            f[h] = 16711935 & (f[h] << 8 | f[h] >>> 24) | 4278255360 & (f[h] << 24 | f[h] >>> 8);

                        }
                        f[s >>> 5] |= 128 << s % 32,
                        f[14 + (s + 64 >>> 9 << 4)] = s;
                        for (var p = i._ff,
                                y = i._gg,
                                v = i._hh,
                                d = i._ii,
                                h = 0; h < f.length; h += 16) {
                            var b = c;
                            var T = a;
                            var x = l;
                            var B = g;
                            var c = p(c, a, l, g, f[h + 0], 7, -680876936);
                            var g = p(g, c, a, l, f[h + 1], 12, -389564586);
                            var l = p(l, g, c, a, f[h + 2], 17, 606105819);
                            var a = p(a, l, g, c, f[h + 3], 22, -1044525330);
                            var c = p(c, a, l, g, f[h + 4], 7, -176418897);
                            var g = p(g, c, a, l, f[h + 5], 12, 1200080426);
                            var l = p(l, g, c, a, f[h + 6], 17, -1473231341);
                            var a = p(a, l, g, c, f[h + 7], 22, -45705983);
                            var c = p(c, a, l, g, f[h + 8], 7, 1770035416);
                            var g = p(g, c, a, l, f[h + 9], 12, -1958414417);
                            var l = p(l, g, c, a, f[h + 10], 17, -42063);
                            var a = p(a, l, g, c, f[h + 11], 22, -1990404162);
                            var c = p(c, a, l, g, f[h + 12], 7, 1804603682);
                            var g = p(g, c, a, l, f[h + 13], 12, -40341101);
                            var l = p(l, g, c, a, f[h + 14], 17, -1502002290);
                            var a = p(a, l, g, c, f[h + 15], 22, 1236535329);
                            var c = y(c, a, l, g, f[h + 1], 5, -165796510);
                            var g = y(g, c, a, l, f[h + 6], 9, -1069501632);
                            var l = y(l, g, c, a, f[h + 11], 14, 643717713);
                            var a = y(a, l, g, c, f[h + 0], 20, -373897302);
                            var c = y(c, a, l, g, f[h + 5], 5, -701558691);
                            var g = y(g, c, a, l, f[h + 10], 9, 38016083);
                            var l = y(l, g, c, a, f[h + 15], 14, -660478335);
                            var a = y(a, l, g, c, f[h + 4], 20, -405537848);
                            var c = y(c, a, l, g, f[h + 9], 5, 568446438);
                            var g = y(g, c, a, l, f[h + 14], 9, -1019803690);
                            var l = y(l, g, c, a, f[h + 3], 14, -187363961);
                            var a = y(a, l, g, c, f[h + 8], 20, 1163531501);
                            var c = y(c, a, l, g, f[h + 13], 5, -1444681467);
                            var g = y(g, c, a, l, f[h + 2], 9, -51403784);
                            var l = y(l, g, c, a, f[h + 7], 14, 1735328473);
                            var a = y(a, l, g, c, f[h + 12], 20, -1926607734);
                            var c = v(c, a, l, g, f[h + 5], 4, -378558);
                            var g = v(g, c, a, l, f[h + 8], 11, -2022574463);
                            var l = v(l, g, c, a, f[h + 11], 16, 1839030562);
                            var a = v(a, l, g, c, f[h + 14], 23, -35309556);
                            var c = v(c, a, l, g, f[h + 1], 4, -1530992060);
                            var g = v(g, c, a, l, f[h + 4], 11, 1272893353);
                            var l = v(l, g, c, a, f[h + 7], 16, -155497632);
                            var a = v(a, l, g, c, f[h + 10], 23, -1094730640);
                            var c = v(c, a, l, g, f[h + 13], 4, 681279174);
                            var g = v(g, c, a, l, f[h + 0], 11, -358537222);
                            var l = v(l, g, c, a, f[h + 3], 16, -722521979);
                            var a = v(a, l, g, c, f[h + 6], 23, 76029189);
                            var c = v(c, a, l, g, f[h + 9], 4, -640364487);
                            var g = v(g, c, a, l, f[h + 12], 11, -421815835);
                            var l = v(l, g, c, a, f[h + 15], 16, 530742520);
                            var a = v(a, l, g, c, f[h + 2], 23, -995338651);
                            var c = d(c, a, l, g, f[h + 0], 6, -198630844);
                            var g = d(g, c, a, l, f[h + 7], 10, 1126891415);
                            var l = d(l, g, c, a, f[h + 14], 15, -1416354905);
                            var a = d(a, l, g, c, f[h + 5], 21, -57434055);
                            var c = d(c, a, l, g, f[h + 12], 6, 1700485571);
                            var g = d(g, c, a, l, f[h + 3], 10, -1894986606);
                            var l = d(l, g, c, a, f[h + 10], 15, -1051523);
                            var a = d(a, l, g, c, f[h + 1], 21, -2054922799);
                            var c = d(c, a, l, g, f[h + 8], 6, 1873313359);
                            var g = d(g, c, a, l, f[h + 15], 10, -30611744);
                            var l = d(l, g, c, a, f[h + 6], 15, -1560198380);
                            var a = d(a, l, g, c, f[h + 13], 21, 1309151649);
                            var c = d(c, a, l, g, f[h + 4], 6, -145523070);
                            var g = d(g, c, a, l, f[h + 11], 10, -1120210379);
                            var l = d(l, g, c, a, f[h + 2], 15, 718787259);
                            var a = d(a, l, g, c, f[h + 9], 21, -343485551);
                            var c = c + b >>> 0;
                            var a = a + T >>> 0;
                            var l = l + x >>> 0;
                            var g = g + B >>> 0;
                        }
                        return n.endian([c, a, l, g]);
                    };
                i._ff = function (r, n, t, o, e, u, i) {
                    var f = r + (n & t | ~n & o) + (e >>> 0) + i;
                    return (f << u | f >>> 32 - u) + n;
                },
                i._gg = function (r, n, t, o, e, u, i) {
                    var f = r + (n & o | t & ~o) + (e >>> 0) + i;
                    return (f << u | f >>> 32 - u) + n;
                },
                i._hh = function (r, n, t, o, e, u, i) {
                    var f = r + (n ^ t ^ o) + (e >>> 0) + i;
                    return (f << u | f >>> 32 - u) + n;
                },
                i._ii = function (r, n, t, o, e, u, i) {
                    var f = r + (t ^ (n | ~o)) + (e >>> 0) + i;
                    return (f << u | f >>> 32 - u) + n;
                },
                i._blocksize = 16,
                i._digestsize = 16,
                r.exports = function (r, t) {
                    if (void 0 === r || null === r) {
                        throw new Error('Illegal argument ' + r);
                    }

                    var o = n.wordsToBytes(i(r, t));
                    return t && t.asBytes ? o : t && t.asString ? u.bytesToString(o) : n.bytesToHex(o);
                };
            })();
        }, function (r, n) {
            (function () {
                var n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var t = {
                        rotl: function (r, n) {
                            return r << n | r >>> 32 - n;
                        },
                        rotr: function (r, n) {
                            return r << 32 - n | r >>> n;
                        },
                        endian: function (r) {
                            if (r.constructor === Number) {
                                return 16711935 & t.rotl(r, 8) | 4278255360 & t.rotl(r, 24);
                            }

                            for (var n = 0; n < r.length; n++) {
                                r[n] = t.endian(r[n]);

                            }
                            return r;
                        },
                        randomBytes: function (r) {
                            for (var n = []; r > 0; r--) {
                                n.push(Math.floor(256 * Math.random()));

                            }
                            return n;
                        },
                        bytesToWords: function (r) {
                            for (var n = [], t = 0, o = 0; t < r.length; t++, o += 8) {
                                n[o >>> 5] |= r[t] << 24 - o % 32;

                            }
                            return n;
                        },
                        wordsToBytes: function (r) {
                            for (var n = [], t = 0; t < 32 * r.length; t += 8) {
                                n.push(r[t >>> 5] >>> 24 - t % 32 & 255);

                            }
                            return n;
                        },
                        bytesToHex: function (r) {
                            for (var n = [], t = 0; t < r.length; t++) {
                                n.push((r[t] >>> 4).toString(16)),
                                n.push((15 & r[t]).toString(16));

                            }
                            return n.join('');
                        },
                        hexToBytes: function (r) {
                            for (var n = [], t = 0; t < r.length; t += 2) {
                                n.push(parseInt(r.substr(t, 2), 16));

                            }
                            return n;
                        },
                        bytesToBase64: function (r) {
                            for (var t = [], o = 0; o < r.length; o += 3) {
                                for (var e = r[o] << 16 | r[o + 1] << 8 | r[o + 2], u = 0; u < 4; u++) {
                                    8 * o + 6 * u <= 8 * r.length
                                        ? t.push(n.charAt(e >>> 6 * (3 - u) & 63)) : t.push('=');

                                }

                            }
                            return t.join('');
                        },
                        base64ToBytes: function (r) {
                            r = r.replace(/[^A-Z0-9+\/]/gi, '');
                            for (var t = [], o = 0, e = 0; o < r.length; e = ++o % 4) {
                                0 !== e && t.push((n.indexOf(r.charAt(o - 1))
                                    & Math.pow(2, -2 * e + 8) - 1) << 2 * e | n.indexOf(r.charAt(o)) >>> 6 - 2 * e);

                            }
                            return t;
                        }
                    };
                r.exports = t;
            })();
        }, function (r, n) {
            function t(r) {
                return !!r.constructor && 'function' === typeof r.constructor.isBuffer && r.constructor.isBuffer(r);
            }
            function o(r) {
                return 'function' === typeof r.readFloatLE && 'function' === typeof r.slice && t(r.slice(0, 0));
            }

            r.exports = function (r) {
                return null != r && (t(r) || o(r) || !!r._isBuffer);
            };
        }, function (r, n, t) {
            r.exports = t(1);
        }]);
        // this.element 可取到当前实例对应的 dom 元素
        var $element = $(this.element);

        // 统计uv的请求地址
        var requestUrl = $element.attr('requestUrl');

        // 获取当前页面的最后一部分地址
        var url = window.location.href;
        var pathName = url.split('/').pop().split('.')[0];
        // 格式化日期
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1);
        if (month < 10) {
            month = '0' + month.toString();
        } else {
            month = month.toString();
        }
        var day = date.getDate();
        if (day < 10) {
            day = '0' + day.toString();
        } else {
            day = day.toString();
        }
        var formatDate = year + month + day;

        var randomNum;
        var idongdeSign;
        var idongdeId;

        compareStorage();

        // 初次赋值
        function init() {
            // 生成随机MD5值，MD5(MD5（0~100000) + 0~100000)
            randomNum = md5(md5(Math.floor(Math.random() * 100000 + 1))
                + Math.floor(Math.random() * 100000 + 1).toString());
            // md5('idongde' + 当天日期 + md5(URL别名) + 'com')
            idongdeSign = md5('idongde' + formatDate + md5(pathName) + 'com');
            // md5(md5('idongde' + 当天日期 + 'com') + 随机MD5)
            idongdeId = md5(md5('idongde' + formatDate + 'com') + randomNum);
        }

        // 储存信息
        function setStorage() {
            storage.set('idongdeid', idongdeId);
            storage.set('idongdesign', idongdeSign);
            storage.set('curDate', formatDate);
            storage.set('randomNum', randomNum);
        }
        function deleteStorage() {
            storage.rm('idongdeid');
            storage.rm('idongdesign');
            storage.rm('curDate');
            storage.rm('randomNum');
        }
        function compareStorage() {
            if (!storage.get('idongdeid') || !storage.get('idongdesign')) {
                // 二者其中只要有一个没有，就当成当日第一次访问 →_→ 就都生成新的,并发送给后台
                init();
                setStorage();
                sendStorage();
            }
            else {
                idongdeId = md5(md5('idongde' + formatDate + 'com') + storage.get('randomNum'));
                idongdeSign = md5('idongde' + formatDate + md5(pathName) + 'com');
                if (idongdeId !== storage.get('idongdeid')) {
                    // 如果不相等，说明日期或用户变了，发送
                    deleteStorage();
                    init();
                    setStorage();
                    sendStorage();
                }
                else if (idongdeSign !== storage.get('idongdesign')) {
                    // idongdeid相等,但idongdesign不相等，说明是同一用户访问不同页面，发送改变后的idongdesign
                    storage.rm('idongdesign');
                    storage.set('idongdesign', idongdeSign);
                    sendStorage(idongdeSign);
                }
                else {
                    if (!storage.get('curDate')) {
                        // 只是丢失日期，但还是当天同一个用户
                        storage.set('curDate', formatDate);
                    }
                    sendStorage(storage.get('idongdesign'));
                }
            }
        }
        function sendStorage(sign) {
            var options = {
                url: requestUrl,
                type: 'POST',
                data: {
                    url: url,
                    idongdeid: storage.get('idongdeid'),
                    idongdesign: sign || storage.get('idongdesign')
                },
                success: function () {},
                error: function () {}
            };
            $.ajax(options);
        }
    };
    return customElem;
});
