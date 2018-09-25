/**
 * @author: sunxiaopeng
 * @date: 2018-09-21
 * @file: mip-fh-browser.js
 * 整理时下流行的浏览器User-Agent大全 http://www.cnblogs.com/langtianya/p/4378801.html
 */

define(function () {
    var ua = window.navigator.userAgent;
    var module = {};
    module.UC = ((function () {
        return /UCBrowser/i.test(ua);
    })());
    module.SE = ((function () {
        return /MetaSr/i.test(ua);
    })());
    module.QQ = ((function () {
        return /MQQBrowser/i.test(ua);
    })());
    module.QQ = ((function () {
        return /QQ/i.test(ua);
    })());
    module.Safari = ((function () {
        return /Safari/i.test(ua);
    })());
    module.browser = (function (me) {
        var name;
        switch (true) {
            case me.UC:
                name = 'UC';
                break;
            case me.SE:
                name = 'SE';
                break;
            case me.QQ:
                name = 'QQ';
                break;
            case me.Safari:
                name = 'SAFARI';
                break;
            default:
                name = '';
                break;
        }
        return name;
    }(module));
    return module;
});
