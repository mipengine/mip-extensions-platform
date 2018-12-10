/**
 * @file mip-stat-wulinbang 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();

    function bindEle() {
        var statTarBox = document.getElementsByTagName('mip-stat-wulinbang');
        var i = 0;
        var n = location.href;
        var statLen = statTarBox.length;
        var url = null;
        var el = null;
        var code = null;
        var uid = null;
        var agt = navigator.userAgent;
        var r = encodeURIComponent(n);
        var lg = navigator.systemLanguage || window.navigator.language;
        var OS = navigator.platform;
        var aV = navigator.appVersion;
        var fBL = screen.width + '*' + screen.height;
        var aN = navigator.appName;
        for (; i < statLen; i++) {
            el = statTarBox[i];
            code = el.getAttribute('stat-code') || '';
            uid = el.getAttribute('stat-uid') || '';
            url = '//union2.50bang.org/web/' + code
            + '?uId2=SPTNPQRLSX&uId=' + uid + '&agt=' + agt
            + '&r=' + r + '&aN=' + aN + '&lg=' + lg
            + '&OS=' + OS + '&aV=' + aV + '&fBL=' + fBL;
            el.addEventListener('click', function () {
                createScript(url);
            });
        }
    }
    // 此处引入的js代码为第三方统计JS。
    // 用途：实现点击统计和访问统计
    // 服务提供商：50bang
    function createScript(t) {
        if (t && void 0 !== t) {
            var i = document.createElement('script');
            return i.setAttribute('type', 'text/javascript'),
                i.setAttribute('src', t),
                document.getElementsByTagName('head')[0].appendChild(i),
                !0;
        }
    }

    customElement.prototype.build = function () {
        var srcVisit = 'http://union2.50bang.org/js/tongji';
        createScript(srcVisit);
        bindEle();
    };

    return customElement;

});
