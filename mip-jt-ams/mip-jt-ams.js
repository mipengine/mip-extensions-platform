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
        loadJs(this.element, 'https://res.cngoldres.com/libs/jtams/1.0.0/mjtams.js');
    };

    customElement.prototype.firstInviewCallback = function () {
        var el = this.element;
        var $el = $(el);
        $el.jtAd($el.attr('spm'));
    };
    return customElement;
});
