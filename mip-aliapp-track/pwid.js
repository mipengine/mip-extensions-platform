/**
 * @file mip 统计方法 pwid
 * @author tfguys<tfguys@alibaba-inc.com>
 *
 */
define(function (require) {

    var cookie = {
        set: function (key, value, opt) {
            if (!opt || typeof opt !== 'object') {
                opt = {};
            }
            var cookie = key + '=' + encodeURIComponent(value);

            if (opt && opt.seconds) {
                var exp = new Date();
                exp.setTime(exp.getTime() + opt.seconds * 1000);
                cookie += ';expires=' + exp.toGMTString();
            }
            if (opt && opt.path) {
                cookie += ';path=' + opt.path;
            }
            if (opt && opt.domain) {
                cookie += ';domain=' + opt.domain;
            }

            document.cookie = cookie;
        },

        get: function (key) {
            var arr;
            var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');

            if (document.cookie.match(reg)) {
                arr = document.cookie.match(reg);
                return decodeURIComponent(arr[2]);
            } else {
                return null;
            }
        }
    };

    var storage = {
        set: function (key, value) {
            if (!key) {
                return;
            }
            localStorage[key] = value;
            cookie.set(key, value, {
                seconds: 60 * 24 * 30
            });
        },

        get: function (key) {
            if (!key) {
                return null;
            }
            return (localStorage[key] || cookie.get(key) || '');
        }

    };

    var selfE = {};

    var selfPwidKey = '_pwid';

    var selfLength = 32;

    var selfKey = [23, 11, 29, 12, 27, 15, 18];

    selfE.generatePWID = function () {
        var arr = ('00000000' + new Date().getTime() + (Math.random() + '00000000').substr(2, 10)).split('');

        for (var i in selfKey) {
            arr[i] = arr[selfKey[i]];
        }

        return arr.join('') + '3';
    };

    selfE.checkPWID = function (pwid) {
        if (!pwid || pwid.length !== selfLength || pwid[selfLength - 1] !== '3') {
            return false;
        }

        var arr = pwid.split('');

        for (var i in selfKey) {
            if (arr.hasOwnProperty(i) && arr[i] !== arr[selfKey[i]]) {
                return false;
            }
        }

        return true;
    };
    selfE.getPWID = function () {
        if (typeof window !== 'object') {
            return selfE.generatePWID();
        }

        var pwid = storage.get(selfPwidKey);

        if (!selfE.checkPWID(pwid)) {
            pwid = selfE.generatePWID();
            savePWID(pwid);
        }

        return pwid;
    };

    function savePWID(pwid) {
        storage.set(selfPwidKey, pwid);
    }

    return selfE;
});