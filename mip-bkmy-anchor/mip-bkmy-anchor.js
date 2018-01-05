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
            var id = $(anchor).parent().prev().attr('id');
            $('#' + id).click();
            setTimeout(function () {
                location.href = anchor;
            }, 500);
        }
    };
    return customElement;
});
