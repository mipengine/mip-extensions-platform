/**
 * @file mip-show-dom-li 组件
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
        var elelist = ele.querySelectorAll('[ifShow]');
        var eleHideList = ele.querySelectorAll('[ifShow="false"]');
        for (var i = 0; i < eleHideList.length; i++) {
            if (!hasClass(eleHideList[i], 'hide')) {
                eleHideList[i].className += 'hide';
            }
        }
        ele.addEventListener('click', function () {
            for (var i = 0; i < elelist.length; i++) {
                if (hasClass(elelist[i], 'hide')) {
                    elelist[i].className = elelist[i].className.replace('hide', '');
                }
                else {
                    elelist[i].className += 'hide';
                }
            }
        });
    };
    return customElement;
});

function hasClass(ele, clsName) {
    return (' ' + ele.className + ' ').indexOf(' ' + clsName + ' ') > -1;
}
