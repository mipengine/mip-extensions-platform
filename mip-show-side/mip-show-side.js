/**
 * @file mip-show-side 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var markId = ele.getAttribute('mark-id');
        var viewId = ele.getAttribute('view-id');
        var sideId = ele.getAttribute('side-id');
        var mark = document.querySelector(markId);
        var view = document.querySelector(viewId);
        var side = document.querySelector(sideId);
        ele.addEventListener('click', function () {
            mark.className = mark.className.replace(' none', '');
            side.className += ' active';
            if (!!view) {
                view.className += ' active';
            };
        }, false);
        mark.addEventListener('click', function () {
            mark.className += ' none';
            side.className = side.className.replace(' active', '');
            if (!!view) {
                view.className = view.className.replace(' active', '');
            };
        }, false);
    };
    return customElement;
});
