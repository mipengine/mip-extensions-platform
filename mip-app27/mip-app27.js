/**
 * @file mip-app27.js
 * @author kesan
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var util = require('util');
    var platform = util.platform;
    function browserChoose() {
        if (platform.isIos()) {
            if ($('.down-os-other').length > 0) {
                $('.down-os-other').remove();
            }
        }
        else {
            if ($('.down-os-ios').length > 0) {
                $('.down-os-ios').remove();
            }
        }
    }
    customElement.prototype.build = function () {
        browserChoose();
    };

    return customElement;
});
