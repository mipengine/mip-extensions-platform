/**
 * @file mip-like-component 组件
 * @author yxl
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var tipsBox = function (ele, options) {
        options = $.extend({
            obj: null,
            str: '+1',
            startSize: '12px',
            endSize: '30px',
            interval: 600,
            color: 'red',
            callback: function () {}
        }, options);
        ele.append('<span class=\'__num\'>' + options.str + '</span>');
        var box = $('.__num');
        var left = options.obj.offset().left;
        var top = options.obj.offset().top;
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
        // var element = $(this.element);
        var ele = $(this.element);
        ele.on('click', function () {
            tipsBox(ele, {
                obj: $('.fabulous')
            });
        });
    };
    return customElement;
});