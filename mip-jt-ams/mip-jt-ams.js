/**
 * @file mip-jt-ams 金投网广告组件
 * @author jt
 */
define(function (require) {

    var $ = require('jquery');

    var loadJs = function (elem, url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        $(elem).append(script);
        if (typeof callback !== 'function') {
            return false;
        } else {
            script.onload = function () {
                callback();
            };
        }
    };

    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var el = this.element;
        loadJs(el, 'https://res.cngoldres.com/libs/jtams/1.0.0/jtams.js', function () {
            var $el = $(el);
            $el.jtAd($el.attr('spm'));
        });
    };
    return customElement;
});
