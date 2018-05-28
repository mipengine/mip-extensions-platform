/**
 * @file mip-shushi100-navigator 组件
 * @author
 */

define(function (require) {
    var customEle = require('customElement').create();
    customEle.prototype.firstInviewCallback = function () {
        this.addEventAction('navigatorTo', function (event, url) {
            window.top.location.href = url;
        });
    };
    return customEle;
});
