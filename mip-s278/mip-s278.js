/**
 * @file mip-s278 组件
 * @author  s278作者
 */

define(function (e) {

    var n = e('zepto');
    var stui = {
            Cookie: {
                set: function (name, value, days) {
                    var exp = new Date();
                    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
                    document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toUTCString();
                },
                get: function (name) {
                    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
                    if (arr != null) {
                        return unescape(arr[2]);
                    }

                },
                del: function (name) {
                    var exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    var cval = this.get(name);
                    if (cval != null) {
                        document.cookie = name + '=' + escape(cval) + ';path=/;expires=' + exp.toUTCString();
                    }

                }
            },
            common: {
                history: function () {
                    if (stui.Cookie.get('recente')) {
                        var json =  n.parseJSON(stui.Cookie.get('recente'));

                        for (var i = 0; i < json.length; i++) {
                            var li = document.createElement('li');
                            li.innerHTML = '<a href=\'' + json[i].vodurl + '\' title=\'' + json[i].vodname + '\'>';
                            li.innerHTML += '<span class=\'pull-right text-red\'>' + json[i].vodpart;
                            li.innerHTML += '</span>' + json[i].vodname + '</a>';
                            n('#stui_history').append(li);
                        }
                    }
                    else {
                        var p = document.createElement('p');
                        p.innerHTML = '您还没有看过影片哦';
                        p.style.textAlign = 'center';
                        p.style.padding = '80px 0';
                        n('#stui_history').append(p);
                    }
                    n('.historyclean').first().click(function () {
                        stui.Cookie.del('recente');
                    });
                }
            }
        };
    var his = n('.stui-his').first();
    var drop = n('.dropdown').first();
    his.onmouseover = function () {
                drop.style.display = 'block';
            };
    his.onmouseout = function () {
                drop.style.display = 'none';
            };
    his.onclick = function () {
                if (drop.style.display === 'none') {
                    drop.style.display = 'block';
                }
                else {
                    drop.style.display = 'none';
                }
            };
    stui.common.history();
    if (window.location.href.indexOf('play') > -1) {
        var vodname = n('vodname').html();
        var vodpart = n('playname').html();
        var vodurl = window.location.href;
        var recente = stui.Cookie.get('recente');
        var len = 0;
        var canadd = true;
        if (recente) {
            recente = n.parseJSON(recente);
            len = recente.length;
            $(recente).each(function () {
                        if (vodname === this.vodName) { // 已记录则修改
                            canadd = false;
                            var json = '[';
                            $(recente).each(function (i) {
                                var tempname;
                                var tempurl;
                                var temppart;
                                if (this.vodname === vodname) {
                                    tempname = vodname;
                                    tempurl = vodurl;
                                    temppart = vodpart;
                                }
                                else {
                                    tempname = this.vodname;
                                    tempurl = this.vodurl;
                                    temppart = this.vodpart;
                                }
                                json += '{\"vodname\":\"' + tempname + '\",\"vodurl\":\"' + tempurl;
                                json += '\",\"vodpart\":\"' + temppart + '\"}';
                                if (i !== len - 1) {
                                    json += ',';
                                }

                            });
                            json += ']';
                            stui.Cookie.set('recente', json, {
                                path: '/',
                                expires: (2)
                            });
                            return false;
                        }

                    });
        }
        if (canadd) { // 无记录则添加
            var json = '[';
            var isfirst = ']';
            isfirst = !len ? ']' : ',';
            json += '{"vodname":"' + vodname + '","vodurl":"' + vodurl;
            json += '","vodpart":"' + vodpart + '"}' + isfirst;
            if (len > 9) {
                len -= 1;
            }
            for (var i = 0; i < len - 1; i++) {
                json += '{"vodname":"' + recente[i].vodname + '","vodurl":"' + recente[i].vodurl;
                json += '","vodpart":"' + recente[i].vodpart + '"},';
            }
            if (len > 0) {
                json += '{"vodname":"' + recente[len - 1].vodname + '","vodurl":"' + recente[len - 1].vodurl;
                json += '","vodpart":"' + recente[len - 1].vodpart + '"}]';
            }
            stui.Cookie.set('recente', json, {
                path: '/',
                expires: (2)
            });
        }
    }

});
