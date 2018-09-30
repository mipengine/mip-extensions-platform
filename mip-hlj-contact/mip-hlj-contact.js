/**
 * @file mip-hlj-contact 私信商家
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');
    var viewer = require('viewer');

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.dataset.href;

        $(element).find('a').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var info = JSON.parse($(element).attr('info'));
            if (!info.isLogin) {
                viewer.eventAction.execute('login', e.target, e);
                return;
            }
            window.top.location.href = url;
        });
    };

    return customElement;
});
