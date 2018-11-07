/**
 * @file mip-role-notice 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var speed = ele.getAttribute('speed') ? ele.getAttribute('speed') : 50;
        var scroll = ele.children[0];
        var scrollCopy = scroll.cloneNode('true');
        ele.appendChild(scrollCopy);
        var scroll2 = ele.children[1];
        setInterval(function () {
            scroll2.innerHTML = scroll.innerHTML;
            if (scroll.offsetWidth <= ele.scrollLeft) {
                ele.scrollLeft -= scroll.offsetWidth;
            }
             else {
                ele.scrollLeft++;
            }
        }, speed);
    };
    return customElement;
});


