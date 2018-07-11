/**
 * @file mip-ruby-scrollup 组件
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
        var step = 52;
        var delay = 2000;
        var id = 'join_stats';
        var liNum = 2;
        this.t;
        this.p = false;
        this.o = document.getElementById(id);
        this.h = this.o.innerHTML;
        var that = this;
        var ele = this.element;
        var len = ele.querySelectorAll('li').length;
        var sel = ele.querySelector('#' + id);

        var i = 1;
        var j = 1;

        function animate(obj, step, interval, speedFactor, func) {
            clearInterval(obj.timer);
            function getStyle(obj, prop) {
                if (obj.currentStyle) {
                    return obj.currentStyle[prop];
                } else {
                    return document.defaultView.getComputedStyle(obj, null)[prop];
                }
            }
            obj.timer = setInterval(function () {
                var flag = true;
                var cur = 0;
                cur = parseInt(getStyle(obj, 'margin-top'), 10);
                var speed = (step - cur) * speedFactor;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (cur !== step) {
                    flag = false;
                }
                obj.style['margin-top'] = cur + speed + 'px';
                if (flag) {
                    if (func) {
                        func();
                    }
                    clearInterval(obj.timer);
                }
            }, interval);
        }

        this.start = function () {
                sel.innerHTML += this.h;
                if (!this.p) {
                    animate(sel, -step, 10, 0.01);
                }
                i = 1;
                this.t = setInterval(function () {
                    that.scrolling();
                }, delay * liNum);
            };
        this.scrolling = function () {
                j ++;
                i ++;
                animate(sel, -(step * j), 10, 0.01);
                if (i >= (len / liNum)) {
                    i = 1;
                    sel.innerHTML += this.h;
                }
                if (j >= 99) {
                    i = 1;
                    j = 0;
                    sel.style.marginTop = 0;
                    animate(sel, 0, 10, 0.01, function () {
                        var ul = sel.querySelectorAll('ul');
                        var len = ul.length;
                        for (var i = 1; i < len; i++) {
                            ul[i].parentNode.removeChild(ul[i]);
                        }
                    });
                }
            };
        setTimeout(function () {
            that.start();
        }, delay);
    };

    return customElement;
});
