/**
 * @file mip-downlink 组件
 * @author cc
 */

define(function (require) {

    var customElement = require('customElement').create();

    customElement.prototype.build = function () {

        var $ = require('jquery');
        var element = this.element;
        var iurl = element.getAttribute('iurl');
        var id = element.getAttribute('tag');
        if (iurl && id) {
            window.gourl = function (url) {
                window.location.href = url;
            };
            element.onclick = function () {
                $.getScript(iurl + '?id=' + id + '&callback=gourl');
            };
        }
    };

    return customElement;
});
