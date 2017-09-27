/**
 * @file mip-lnxyw-switch 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element = this.element;
        var speed = element.getAttribute('speed') || '20';
        var delay = element.getAttribute('delay') || '1500';
        var id = element.getAttribute('ulid');
        window.onload = startmarquee(22, speed, delay, id);
    };
    function startmarquee(lh, speed, delay, id) {
        var p = false;
        var t;
        var o = document.getElementById(id);
        o.innerHTML += o.innerHTML;
        o.style.marginTop = 0;
        o.onmouseover = function () {
            p = true;
        };
        o.onmouseout = function () {
            p = false;
        };
        function start() {
            t = setInterval(scrolling, speed);
            if (!p) {
                o.style.marginTop = parseInt(o.style.marginTop, 10) - 1 + 'px';
            }
        }

        function scrolling() {
            if (parseInt(o.style.marginTop, 10) % lh !== 0) {
                o.style.marginTop = parseInt(o.style.marginTop, 10) - 1 + 'px';
                if (Math.abs(parseInt(o.style.marginTop, 10)) >= o.scrollHeight / 2) {
                    o.style.marginTop = 0;
                }
            } else {
                clearInterval(t);
                setTimeout(start, delay);
            }
        }

        setTimeout(start, delay);
    }

    return customElement;
});
