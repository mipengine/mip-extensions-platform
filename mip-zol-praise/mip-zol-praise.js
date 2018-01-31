/**
 * @file ZOL私有业务--点赞
 * @author  mulianju
 * @time  2017-10-25
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
    function praise(options, callback) {
        var url = options.url;
        var data = options.data ? options.data : {};
        typeof ZOL_USER_INFO !== 'undefined' && (data.userId = window.ZOL_USER_INFO.userid);
        if (!window.ZOL_USER_INFO.checkLogState()) {
            return;
        }
        if (praise.posting) {
            toast('\u60a8\u7684\u624b\u901f\u592a\u5feb\uff0c\u4f11\u606f\u4e00\u4e0b\u518d\u8bd5\u5427~');
            return;
        }
        praise.posting = true;
        fetchJsonp(makeUrl(url, data), {}).then(function (res) {
            return res.json();
        }).then(function (request) {
            praise.posting = false;
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
        var me = this;
        var element = this.element;
        var options = util.fn.extend({}, element.dataset);
        var customData;
        try {
            var script = document.querySelector('[data-name="praize-config"]');
            if (script) {
                customData = JSON.parse(script.textContent);
            }
        }
        catch (e) {
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
        }

        for (var key in element.dataset) {
            if (element.dataset.hasOwnProperty(key)) {
                if (/^data([A-Z][\w]+)/.test(key)) {
                    var pkey = key;
                    pkey = pkey.replace(/^data[A-Z]/, pkey.slice(4, 5).toLowerCase());

                    if (customData || (customData = {})) {
                        customData[pkey] = element.dataset[key];
                    }
                }
            }
        }

        customData && (options.data = customData);

        element.addEventListener('click', function () {
            if (element.classList.contains(options.likedclass)) {
                toast('\u8bf7\u52ff\u91cd\u590d\u70b9\u8d5e~');
                return;
            }
            praise(options, function (request) {
                if (parseInt(request.state, 10) === 1) {
                    toast('\u70b9\u8d5e\u6210\u529f~');
                    options.likedclass && element.classList.add(options.likedclass);
                    element.innerHTML = (/(\d+)/.test(element.innerHTML) ? parseInt(RegExp.$1, 10) : 0) + 1;
                } else {
                    request.msg && toast(request.msg);
                }
            });
        });
    };
    return customElement;
});
