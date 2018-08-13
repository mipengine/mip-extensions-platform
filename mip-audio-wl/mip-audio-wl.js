/**
 * @file mip-audio-wl 组件
 * @author
 */
define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        ele.on('click', function () {
            var $this = $(this);
            if ($this.find('.audio-big-cont')) {
                $this.find('.audio-big-cont').toggleClass('playing');
            }
            if ($this.find('.move')) {
                $this.find('.move').toggleClass('play');
            }
        });
    };
    return customElement;
});