/**
 * @file mip-jt-quote-chart 图表组件
 * @author jt
 */
define(function (require) {

    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        window.symbolCode = ele.getAttribute('symbolCode');
        var jsVersion = ele.getAttribute('jsVersion');
        function includeJavaScript(url) {
            var c = document.createElement('script');
            c.async = true;
            c.type = 'text/javascript';
            c.src = url;
            document.getElementsByTagName('head')[0].appendChild(c);
        }
        var sfSdkUrl = 'https://res.cngoldres.com/quote/js/' + jsVersion + '/sf_sdk.js';
        var waplv1Url = 'https://res.cngoldres.com/quote/js/' + jsVersion + '/phoneJs/Astock_waplv1.js';
        includeJavaScript(sfSdkUrl);
        includeJavaScript(waplv1Url);
    };
    return customElement;
});
