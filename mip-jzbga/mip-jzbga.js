/**
 * @file mip-jzbga 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments);
            };
            i[r].l = 1 * new Date();
            a = s.createElement(o);
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
            var ga = i[r];
            ga('create', this.element.getAttribute('data-gaid'), 'auto');
            ga('send', 'pageview');
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    };
    return customElement;
});
