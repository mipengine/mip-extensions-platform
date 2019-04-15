/**
 * @file mip-qbaobei-ad 组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var templates = require('templates');
        var jsonp = require('fetch-jsonp');
        var $ = require('jquery');
        jsonp($(element).data('src'), {
            jsonpCallback: 'callback',
            timeout: 5e3
        }).then(function (t) {
            return t.json();
        }).then(function (o) {
            templates.render(element, o.data.items).then(function (html) {
                element.innerHTML = html;
            });
        });
    };
    return customElement;
});