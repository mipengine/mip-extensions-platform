/**
 * @file mip-uniqueway-timing 组件
 * @author likai
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    var customElement = require('customElement').create();
    var viewer = require('viewer');
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $ele = $(this.element);
        var $target = $ele.find('#' + $ele.attr('target'));
        var id = 'mip-uniqueway-timing-' + $ele.data('id');

        if (storage.get(id) !== null) {
            return;
        }

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
