/**
 * @file mip-mfk-source 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var link = this.element.getAttribute('src');
        var referrer = document.referrer;
        if (link.indexOf('?') === -1) {
            link += '?referrer=' + encodeURIComponent(referrer);
        }
        else {
            link += '&referrer=' + encodeURIComponent(referrer);
        }
        link += '&location=' + encodeURIComponent(window.location.href);
        var t = setTimeout(function () {
            var quest = document.createElement('img');
            quest.setAttribute('src', link);
            quest.style.display = 'none';
            element.appendChild(quest);
            clearTimeout(t);
        }, 2000);
    };

    return customElement;
});
