/**
 * @file mip-jzbga 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ga;
        var EDUU_GKEY;
        var List = '';
        var ua = navigator.userAgent.toLowerCase();
        if (/micromessenger/.test(ua)) {
            List = '_wechat';
        }
        if (/patriarch/.test(ua)) {
            List = '_patriarch';
        }
        if (/qq/.test(ua)) {
            List = '_qq';
        }
        (function (i, s, o, g, r, a, m) {
            i['Google-Analytics-Object'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments);
            },
            i[r].l = 1 * new Date();
            a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-25393064-2', 'auto');
        ga('create', 'UA-25393064-3', 'auto', 'ADTracker');
        ga('set', 'title', (typeof EDUU_GKEY === 'undefined' ? '' : EDUU_GKEY + List));
        ga('send', 'pageview');
        (function () {
            var hm = document.createElement('script');
            hm.src = '//hm.baidu.com/hm.js?bdbcf2456ef01cf5400acb08575a5c7a';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(hm, s);
        })();
    };
    return customElement;
});
