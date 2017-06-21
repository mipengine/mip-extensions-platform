/**
 * @file mip-cd-source 全站来源控制
 * @author cnkang
 */

define(function (require) {
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        ((function (d) {
            var r = d.referrer;
            if (!r) {
                localStorage.removeItem('referrer');
            } else if (r.indexOf('baidu.com') > -1) {
                localStorage.setItem('referrer', 'baidu.com');
            }
        })(window.document));
    };
    return customElement;
});
