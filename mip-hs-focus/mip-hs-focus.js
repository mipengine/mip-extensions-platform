/**
 * @file mip-hs-focus 组件
 * @author
 */

define(function (require) {
    'use strict';
    var util = require('util');
    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var onOff = true;
        var focus = document.getElementsByClassName('.focus');
        focus.onclick = function () {
            if (focus.onOff) {
                util.css(focus, 'background', '#ff9900'),
                util.css(focus, 'color', '#ffffff'),
                focus.onOff = false;
            } else {
                util.css(focus, 'background', '#ebebeb'),
                util.css(focus, 'color', '#56585d'),
                focus.onOff = true;
            }
        };
    };

    return customElement;
});
