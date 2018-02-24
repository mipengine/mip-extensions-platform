/**
 * @file mip-pcgroup-circle 组件
 * @author JJdad2016
 * @version 1.0
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var drawCircle = function (ctx, radius, color, border, value) {
            value = Math.min(Math.max(0, value || 1), 1);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2 * value, true);
            ctx.strokeStyle = color;
            ctx.lineCap = 'round';
            ctx.lineWidth = border;
            ctx.stroke();
        };
        var fz = getComputedStyle(window.document.documentElement)['font-size'];
        fz = parseInt(fz, 10);
        var ele = this.element;
        if ((typeof ele.getAttribute('size')) === 'undefined') {
            ele.setAttribute('size', fz);
        }
        var options = {
            value: ele.getAttribute('value') || 0,
            size: ele.getAttribute('size') || fz,
            border: ele.getAttribute('border') || 3,
            bgColor: ele.getAttribute('bgColor') || '#eee',
            color: ele.getAttribute('color') || '#1f89e3',
            rotate: ele.getAttribute('rotate') || 0
        };
        var canvas = document.createElement('canvas');
        var span = document.createElement('span');
        span.style.lineHeight = fz + 'px';
        span.style.color = options.color;
        span.textContent = (options.value / 20).toFixed(1);
        var ctx = canvas.getContext('2d');
        canvas.width = canvas.height = options.size;

        ele.parentNode.style.width = fz + 'px';
        ele.parentNode.appendChild(span);
        ele.parentNode.appendChild(canvas);
        ele.parentNode.removeChild(ele);
        ctx.translate(options.size / 2, options.size / 2);
        ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);
        var radius = (options.size - options.border) / 2;
        drawCircle(ctx, radius, options.bgColor, options.border, 100 / 100);
        drawCircle(ctx, radius, options.color, options.border, (1 - options.value / 100));
    };
    return customElement;
});
