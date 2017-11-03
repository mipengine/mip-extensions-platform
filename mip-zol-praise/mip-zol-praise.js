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
    var toast = require('./mip-zol-toast');

    function praise(options, callback) {
        var url = options.url;
        var data = options.data ? JSON.parse(options.data) : {};
        typeof ZOL_USER_INFO !== 'undefined' && (data.userId = window.ZOL_USER_INFO.userid);
        if (data.userId) {
            location.href = '//service.zol.com.cn/user/login.php?backurl=' + encodeURIComponent(location.href);
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

        element.addEventListener('click', function () {
            if (element.classList.add(options.likedclass)) {
                toast('\u8bf7\u52ff\u91cd\u590d\u70b9\u8d5e~');
                return;
            }
            praise(options, function (request) {
                if (parseInt(request.state, 10) === 1) {
                    toast('\u70b9\u8d5e\u6210\u529f~');
                    options.likedclass && element.classList.add(options.likedclass);
                    element.html = (element.html ? element.html : 0) + 1;
                } else {
                    toast(request.msg);
                }
            });
        });
    };
    return customElement;
});
