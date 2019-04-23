/**
 * @file mip-s278 组件
 * @author  s278作者
 */

define(function (e) {

    var v = e('zepto');
    var x = {
            Cookie: {
                set: function (a, b, c) {
                    var exp = new Date();
                    exp.setTime(exp.getTime() + c * 24 * 60 * 60 * 1000);
                    document.cookie = a + '=' + escape(b) + ';path=/;expires=' + exp.toUTCString();
                },
                get: function (a) {
                    var arr = document.cookie.match(new RegExp('(^| )' + a + '=([^;]*)(;|$)'));
                    if (arr != null) {
                        return unescape(arr[2]);
                    }

                },
                del: function (a) {
                    var k = new Date();
                    k.setTime(k.getTime() - 1);
                    var u = this.get(a);
                    if (u != null) {
                        document.cookie = a + '=' + escape(u) + ';path=/;expires=' + k.toUTCString();
                    }

                }
            },
            common: {
                history: function () {
                    if (x.Cookie.get('recente')) {
                        var j =  v.parseJSON(x.Cookie.get('recente'));

                        for (var l = 0; l < j.length; l++) {
                            var h = document.createElement('li');
                            h.innerHTML = '<a href=\'' + j[l].vodurl + '\' title=\'' + j[l].vodname + '\'>';
                            h.innerHTML += '<span class=\'pull-right text-red\'>' + j[l].vodpart;
                            h.innerHTML += '</span>' + j[l].vodname + '</a>';
                            v('#stui_history').append(h);
                        }
                    }
                    else {
                        var p = document.createElement('p');
                        p.innerHTML = '您还没有看过影片哦';
                        p.style.textAlign = 'center';
                        p.style.padding = '80px 0';
                        v('#stui_history').append(p);
                    }
                    v('.historyclean').first().click(function () {
                        x.Cookie.del('recente');
                    });
                }
            }
        };
    var s = v('.stui-his').first();
    var f = v('.dropdown').first();
    s.onmouseover = function () {
                f.style.display = 'block';
            };
    s.onmouseout = function () {
        f.style.display = 'none';
    };
    s.onclick = function () {
                if (f.style.display === 'none') {
                    f.style.display = 'block';
                }
                else {
                    f.style.display = 'none';
                }
            };
    x.common.history();
    if (window.location.href.indexOf('play') > -1) {
        var m = v('vodname').html();
        var y = v('playname').html();
        var u = window.location.href;
        var z = x.Cookie.get('recente');
        var q = 0;
        var d = true;
        if (z) {
            z = v.parseJSON(z);
            q = z.length;
            v(z).each(function () {
                        if (m === this.m) { // 已记录则修改
                            d = false;
                            var o = '[';
                            v(z).each(function (i) {
                                var h;
                                var w;
                                var p;
                                if (this.vodname === m) {
                                    h = m;
                                    w = u;
                                    p = y;
                                }
                                else {
                                    h = this.vodname;
                                    w = this.vodurl;
                                    p = this.vodpart;
                                }
                                o += '{\"vodname\":\"' + h + '\",\"vodurl\":\"' + w;
                                o += '\",\"vodpart\":\"' + p + '\"}';
                                if (i !== q - 1) {
                                    o += ',';
                                }

                            });
                            o += ']';
                            x.Cookie.set('recente', o, {
                                path: '/',
                                expires: (2)
                            });
                            return false;
                        }

                    });
        }
        if (d) { // 无记录则添加
            var o = '[';
            var r = ']';
            r = !q ? ']' : ',';
            o += '{"vodname":"' + m + '","vodurl":"' + u;
            o += '","vodpart":"' + y + '"}' + r;
            if (q > 9) {
                q -= 1;
            }
            for (var i = 0; i < q - 1; i++) {
                o += '{"vodname":"' + z[i].vodname + '","vodurl":"' + z[i].vodurl;
                o += '","vodpart":"' + z[i].vodpart + '"},';
            }
            if (q > 0) {
                o += '{"vodname":"' + z[q - 1].vodname + '","vodurl":"' + z[q - 1].vodurl;
                o += '","vodpart":"' + z[q - 1].vodpart + '"}]';
            }
            x.Cookie.set('recente', o, {
                path: '/',
                expires: (2)
            });
        }
    }

});
