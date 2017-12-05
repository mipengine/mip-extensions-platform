/**
 * @file ZOL私有业务--签到
 * @author  mulianju
 * @time  2017-12-03 20:42:29
 * @version 1.0.0
 */
define(function (require, exports, module) {
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var customElement = require('customElement').create();
    var mipToast = require('./mip-zol-toast');
    var toast = function (msg, t) {
        mipToast('<div class="mip-zol-toast-container">' + msg + '</div>', t);
    };

    function signIn(options, callback) {
        var url = options.signUrl;
        var data = typeof options.data === 'string' ? JSON.parse(options.data) : {};
        typeof ZOL_USER_INFO !== 'undefined' && (data.userId = window.ZOL_USER_INFO.userid);
        if (!data.userId) {
            location.href = '//service.zol.com.cn/user/mlogin.php?backurl=' + encodeURIComponent(location.href);
            return;
        }

        if (signIn.posting) {
            toast('\u60a8\u7684\u624b\u901f\u592a\u5feb\uff0c\u4f11\u606f\u4e00\u4e0b\u518d\u8bd5\u5427~');
            return;
        }
        signIn.posting = true;
        data.t = (new Date()).getTime();

        fetchJsonp(makeUrl(url, data), {}).then(function (res) {
            return res.json();
        }).then(function (request) {
            signIn.posting = false;
            callback && callback(request);
        });
    }

    function makeUrl(url, data) {
        var str = url.indexOf('?') > 0 ? '&' : '?';
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (str.length > 1) {
                    str += '&';
                }
                str += key + '=' + data[key];
            }
        }

        return url + str;
    }
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var options = util.fn.extend({}, element.dataset);

        element.addEventListener('click', function () {
            signIn(options, function (request) {
                if (request.info === 'ok') {
                    element.remove();
                    toast('<p>\u7b7e\u5230\u6210\u529f</p><p style="font-size:0.75em;color:#ff5a00">\u7ecf\u9a8c+'
                        + request.signjinyan + '  \u91d1\u8c46+' + request.signScore + '</p>');
                } else {
                    request.msg && toast(request.msg);
                }
            });
        });

        fetchJsonp(options.checkUrl, {}).then(function (res) {
            return res.json();
        }).then(function (request) {
            if (parseInt(request.code, 10) === 1) {
                element.remove();
            }
        });
    };
    return customElement;
});