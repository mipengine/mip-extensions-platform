/**
 * @file 统计模块核心
 * @author zhangyiding@corp.netease.com
 */

/* global define */
define(function (require) {
    var core;
    var util = require('util');
    var storage = util.customStorage(0);
    var trackerCache = {
        nvid: 'VISITOR_CLIENT_NO_COOKIE_SUPPORT',
        nvtm: 0,
        nvfi: 0,
        nvsf: 1,
        nstm: 0,
        nurl: '',
        ntit: '',
        nref: '',
        nres: '',
        nlag: '',
        nscd: '',
        nlmf: 0,
        nfla: '',
        nssn: ''
    };
    var hostUrl = '//analytics.163.com';
    var rand = function () {
        return Math.random().toString(16).slice(2);
    };
    (function () {
        var info = self.screen ? {
            size: screen.width + 'x' + screen.height,
            color: screen.colorDepth + '-bit'
        } : self.java ? {
            size: function () {
                var j = window.java.awt.Toolkit.getDefaultToolkit();
                var s = j.getScreenSize();
                return (s.width + 'x' + s.height);
            }
        } : {};
        info.lan = (navigator.language || navigator.browserLanguage || '').toLowerCase();
        info.lastMod = (new Date(document.lastModified)).getTime() / 1000;
        trackerCache.nres = info.size || '-';
        trackerCache.nscd = info.color || '';
        trackerCache.nlag = info.lan || '-';
        trackerCache.nlmf = info.lastMod || '-';
    })();
    (function () {
        var f = '';
        var ii;
        var n = navigator;
        if (n.plugins && n.plugins.length) {
            for (ii = 0; ii < n.plugins.length; ii++) {
                if (n.plugins[ii].name.indexOf('Shockwave Flash') !== -1) {
                    f = n.plugins[ii].description.split('Shockwave Flash')[1];
                    break;
                }
            }
        } else {
            if (window.ActiveXObject) {
                for (ii = 10; ii >= 2; ii--) {
                    try {
                        var fl = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + ii);
                        if (fl) {
                            f = ii + '.0';
                            break;
                        }
                    } catch (e) {}
                }
            }
        }
        trackerCache.nfla = f;
    })();
    var updateSSN = function () {
        var PINFO = storage.get('P_INFO') || '';
        var info = {
            ssn: PINFO.replace(/\|.+$/, ''),
            login: !!storage.get('S_INFO') && !!PINFO
        };
        trackerCache.nssn = info.ssn;
        trackerCache.nstm = info.login ? 1 : 0;
    };
    var uid = storage.get('_ntes_nnid') || storage.get('_ntes_nnid') || (function () {
        var id = rand();
        while (id.length < 32) {
            id += rand();
        }
        trackerCache.nvfi = 1;
        return id.slice(0, 32);
    })();
    storage.set('_ntes_nnid', uid = uid.replace(/\|'+$/, ''));
    trackerCache.nvid = uid.split(',')[0];
    var trackerCore = {
        send: function (key, url, callback) {
            updateSSN();
            var fnKey = key + (+new Date()) + rand();
            var img;
            var fn = callback || function () {};
            img = window[fnKey] = new Image();
            img.onload = function () {
                window[fnKey] = null;
                fn();
            };
            img.onerror = function () {
                window[fnKey] = null;
                fn();
            };
            img.src = hostUrl + url;
            img = null;
        },
        is: (function () {
            var toString = Object.prototype.toString;
            return function (type, data) {
                var str = toString.call(data);
                return {
                    fn: '[object Function]',
                    arr: '[object Array]',
                    obj: '[object Object]'
                }[type] === str;
            };
        })(),
        each: function (obj, fn) {
            var ret;
            if (trackerCore.is('arr', obj)) {
                var n = obj.length;
                var i = 0;
                for (; i < n; i++) {
                    ret = fn(i, obj[i]);
                    if (ret === false) {
                        return;
                    }
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        ret = fn(key, obj[key]);
                        if (ret === false) {
                            return;
                        }
                    }
                }
            }
        },
        contact: function (keyStr, para) {
            var str = [];
            trackerCore.each(keyStr.split(' '), function (i, key) {
                str[i] = '_' + key + '=' + (para[key] || trackerCache[key]);
            });
            str.push('_end');
            return str.join('&');
        }
    };
    var CORE = function (siteId) {
        core.nacc = siteId || core.nacc || window._ntes_nacc;
        return core;
    };
    core = {
        nacc: window._ntes_nacc,
        pageTracker: function (ref, url, title, nacc, callback) {
            var para = {
                nacc: nacc || core.nacc || window._ntes_nacc,
                nurl: escape(url || document.URL),
                ntit: escape(title || document.title),
                nref: ref === true || ref === false ? '' : escape(ref || document.referrer)
            };
            if (para.nacc === 'undefined' || !para.nacc || para.nurl.indexOf('http') !== 0) {
                return;
            }
            para.nxkey = rand();
            var list = [
                'nacc',
                'nvid',
                'nvtm',
                'nvsf',
                'nvfi',
                'nlag',
                'nlmf',
                'nres',
                'nscd',
                'nstm',
                'nurl',
                'ntit',
                'nref',
                'nfla',
                'nssn',
                'nxkey'
            ].join(' ');
            trackerCore.send('base', '/ntes?' + trackerCore.contact(list, para), callback);
            trackerCache.nvsf = 0;
            return core;
        },
        clickTracker: function () {
            return core;
        },
        clickStat: function () {
            return core;
        },
        areaClickStat: function () {
            return core;
        },
        userAction: function () {}
    };
    var apis = [];
    trackerCore.each(core, function (key, fn) {
        if (trackerCore.is('fn', fn)) {
            apis.push(key);
            CORE[key] = fn;
        }
    });
    if (window.NTES && window.NTES.nacc) {
        new CORE(window.NTES.nacc);
        trackerCore.each(apis, function (i, method) {
            var para = window.NTES[method];
            if (para === true) {
                core[method]();
            } else {
                if (trackerCore.is('arr', para)) {
                    core[method].apply(core, para);
                } else {
                    core[method](para);
                }
            }
        });
    }
    return window.NTES = CORE;
});
