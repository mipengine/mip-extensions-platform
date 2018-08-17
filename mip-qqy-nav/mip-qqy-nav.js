/**
 * @file mip-qqy-nav 控制导航打开与关闭
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    customElement.prototype.firstInviewCallback = function () {
        var e = $(this.element);
        e.find('.btn-menu').on('click', function () {
            var bodyheight = $(document).height();
            e.find('.quick_bg').css('height', bodyheight);
            e.find('.quick-nav,.quick_bg').toggle();
        });
    };

    return customElement;
});
