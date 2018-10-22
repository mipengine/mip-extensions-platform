/**
 * @file mip-hunliji-order 组件
 * @author lishu
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var viewer = require('viewer');
    var sessionId = '';
    var targetElement = '';
    var targetEvent = '';

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        this.addEventAction('orderCustomLogin', function (e) {
            if (e.origin === 'asynLogOrder') {
                viewer.eventAction.execute('open', targetElement, targetEvent);
            }
        });
        $(element).on('click', function (e) {
            var info = JSON.parse($(element).attr('info'));
            targetElement = e.target;
            targetEvent = e;
            if (info.isLogin) {
                e.stopPropagation();
                e.preventDefault();
                sessionId = info.sessionId;
                viewer.eventAction.execute('toggle', e.target, e);
            } else {
                viewer.eventAction.execute('actionOrder', e.target, e);
            }
        });
    };

    return customElement;
});
