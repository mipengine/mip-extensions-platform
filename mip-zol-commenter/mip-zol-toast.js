/**
 * @file ZOL公共组件--toast
 * @author  mulianju
 * @time  2017-10-25
 * @version 1.0.0
 */
define(function (require, exports) {
    var util = require('util');
    var element;

    var toast = function (c, t, s, h) {
        toast.dismiss = function () {
            if (typeof h === 'function') {
                h.call(element);
            } else {
                element.classList.remove('visible');
            }
            c.timeout = setTimeout(function () {
                element.style.display = 'none';
            }, 400);
            toast.dismiss = function () {};
            return element;
        };
        if (typeof c === 'string') {
            if (!element) {
                element = document.createElement('div');
                element.className = 'mip-zol-toast';
                document.body.appendChild(element);
                element.addEventListener('click', toast.dismiss);
                element.lastTop = getComputedStyle(element).top;
                element.moveTo = toast.moveTo;
                element.dismiss = toast.dismiss;
            }
            element.innerHTML = c;
            c = element;
        }
        if (element.lastTop) {
            element.style.top = element.lastTop;
        }
        if (typeof s === 'function') {
            s.call(c);
        } else {
            c.classList.add('visible');
        }
        if (c.timeout) {
            clearTimeout(c.timeout);
        }
        element.style.display = 'block';
        if (t !== Infinity) {
            t = parseInt(t, 10) || 0;
            if (t < 1) {
                t = 2000;
            }
            c.timeout = setTimeout(toast.dismiss, t);
        }
        return c;
    };
    toast.moveTo = function (target) {
        var y;
        var bounds;
        if (element && target && (bounds = util.rect.getElementRect(target))) {
            y = bounds.top - element.offsetHeight + 55;
            if (y < 0) {
                y = bounds.bottom + 10;
            }
            element.style.top = y + 'px';
        }
        return element;
    };

    return toast;
});
