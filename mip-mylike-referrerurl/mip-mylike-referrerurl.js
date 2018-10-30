/**
 * @file mip-mylike-referrerurl 组件
 * @author 55555
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);


    function getKeyWord(refurl) {
        var keys = ['&wd=', '&keyword=', '&word=', '?q=', '&rqwd=', '?wd=', '?word=', '?rqwd='];
        var wd = null;
        for (var i = 0, length = keys.length; i < length; i++) {
            var start = refurl.indexOf(keys[i]);
            if (start > 0) {
                var end = refurl.indexOf('&', start + 1);
                if (end < 0) {
                    end = refurl.length;
                }
                wd = refurl.substring(start + keys[i].length, end);
                return decodeURIComponent(wd);
            }
        }
    }

    function isSearch(refurl) {
        var search = ['.baidu.', '.sogou.', '.sm.', '.so.'];
        for (var i = 0, length = search.length; i < length; i++) {
            var start = refurl.indexOf(search[i]);
            if (start > 0) {
                return true;
            }
        }
        return false;
    }

    // build说明: 统计来源功能，需首屏获取相关信息。
    customElement.prototype.build = function () {
        if (!storage.get('firstEnterUrl')) {
            var refurl = document.referrer;
            if (isSearch(refurl)) {
                var wd = getKeyWord(refurl);
                storage.set('sKeyWord', wd);
            }
            storage.set('firstEnterUrl', document.URL);
            storage.set('referrerUrl', refurl);
        }
        storage.set('enterUrl', document.URL);
    };
    return customElement;
});
