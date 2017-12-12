/**
 * @file mip-cnkang-href 有来链接组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    // 页面刷新后执行统计代码。
    customElement.prototype.build = function () {
        var e = /([http|https]:\/\/[a-zA-Z0-9\_\.] + \.baidu\.com)/gi;
        var r = window.location.href;
        var t = document.referrer;
        if (!e.test(r)) {
            var o = 'https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif';
            t ? (o += '?r=' + encodeURIComponent(document.referrer), r && (o += '&l=' + r)) : r && (o += '?l=' + r);
            var i = new Image;
            i.src = o;
        }
    };
    return customElement;
});
