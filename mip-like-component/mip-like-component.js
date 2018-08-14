/**
 * @file mip-like-component 组件
 * @author yxl
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var tipsBox = function (options) {
        options = $.extend({
            obj: null,
            str: '+1',
            startSize: '12px',
            endSize: '30px',
            interval: 600,
            color: 'red',
            callback: function () {}
        }, options);
        options.obj.append('<span class=\'__num\'>' + options.str + '</span>');
        var box = $('.__num');
        var left = 0;
        var top = 0;
        box.css({
            'position': 'absolute',
            'left': left + 'px',
            'top': top + 'px',
            'z-index': 9999,
            'font-size': options.startSize,
            'line-height': options.endSize,
            'color': options.color
        });
        box.animate({
            'font-size': options.endSize,
            'opacity': '0',
            'top': top - parseInt(options.endSize, 0) + 'px'
        }, options.interval, function () {
            box.remove();
            options.callback();
        });
    };

    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        ele.find('.fabulous').on('click', function () {
            var num =  parseInt(ele.find('.fabulous .like-num').text(), 0);
            ele.find('.fabulous .like-num').text(num + 1);
            tipsBox({
                obj: $('.fabulous')
            });
        });
    };
    return customElement;
});