/**
 * @file mip-bkmy-anchor 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('jquery');
    customElement.prototype.firstInviewCallback = function () {

        var anchor = window.location.hash;
        if (anchor !== '') {
            var strs = anchor.split('&');
            var id = $(strs[0]).parent().prev().attr('id');
            $('#' + id).click();
            setTimeout(function () {
                location.href = strs[0];
            }, 300);
        }
    };
    return customElement;
});
