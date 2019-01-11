/**
 * @file mip-bkmy-anchor 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('jquery');
    customElement.prototype.build = function () {

        var anchor = window.location.hash;
        if (anchor !== '') {
            var strs = anchor.split('&');
            var id = $(strs[0]).parent().prev().attr('id');
            $('#' + id).click();
            setTimeout(function () {
                window.MIP.viewer.page.scrollToHash(strs[0]);
            }, 300);
        }
    };
    return customElement;
});
