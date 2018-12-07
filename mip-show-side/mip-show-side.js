/**
 * @file mip-show-side 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var markId = ele.getAttribute('mark-id') || 'mark';
        var viewId = ele.getAttribute('view-id') || 'view';
        var sideId = ele.getAttribute('side-id') || 'side';
        var mark = document.querySelector('#' + markId);
        var view = document.querySelector('#' + viewId);
        var side = document.querySelector('#' + sideId);
        ele.addEventListener('click', function () {
            mark.className = mark.className.replace(' none', '');
            view.className += ' active';
            side.className += ' active';
        }, false);
        mark.addEventListener('click', function () {
            mark.className += ' none';
            view.className = view.className.replace(' active', '');
            side.className = side.className.replace(' active', '');
        }, false);
    };
    return customElement;
});
