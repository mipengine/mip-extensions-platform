/**
 * @file mip-qqtn-num0
 * 根据设备判断指定ul li下面有无内容隐藏title
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var util = require('util');
        var platform = util.platform;
        var ele = this.element;
        var azid = $(ele).find('.f-tags-box .f-tags-android li').length;
        var iosid = $(ele).find('.f-tags-box .f-tags-ios li').length;
        if (platform.isIos()) {
            if (iosid <= 0) {
                $('.f-xgbb').hide();
            }
        } else {
            if (azid <= 0) {
                $('.f-xgbb').hide();
            }
        }
    };
    return customElement;
});
