/**
 * @file mip-scroll-list 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        var con1 = element.children[0];
        var con2 = element.children[1];
        var speed = element.getAttribute('speed');
        con2.innerHTML = con1.innerHTML;
        var i = setInterval(function () {
            if (element.scrollTop >= con1.scrollHeight) {
                element.scrollTop = 0;
            } else { element.scrollTop++;}
        }, speed);
        element.addEventListener('mouseover', function () {
            clearInterval(i);
        });
        element.addEventListener('mouseout', function () {
            i = setInterval(function () {
                if (element.scrollTop >= con1.scrollHeight) {
                    element.scrollTop = 0;
                } else {element.scrollTop++;}
            }, speed);
        });
    };

    return customElement;
});
