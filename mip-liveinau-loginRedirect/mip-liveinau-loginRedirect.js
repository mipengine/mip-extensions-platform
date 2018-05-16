/**
 * @file mip-liveinau-loginRedirect 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        this.addEventAction('rediret', function (object, str) {
            var parmArray = str.split(',');
            var status = parmArray [0];
            var urlStr = parmArray[1];
            if (status === '1') {
                window.top.location.href = urlStr;
            }
        });
    };
    return customElement;
});
