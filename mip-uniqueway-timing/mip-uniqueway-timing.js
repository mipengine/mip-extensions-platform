/**
 * @file mip-uniqueway-timing 组件
 * @author likai
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var viewer = require('viewer');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $ele = $(this.element);
        var $target = $ele.find('#' + $ele.attr('target'));
        if (!$target) {
            return;
        }

        var action = $ele.attr('action');
        if (action === '') {
            return;
        }

        $target[0].addEventListener('click', function (event) {
            viewer.eventAction.execute('tap', event.target, event);
        });

        var wait = $ele.attr('wait') || 1000;
        var timeout = setTimeout(function () {
            $target.trigger(action);
            clearTimeout(timeout);
        }, wait);
    };

    return customElement;
});
