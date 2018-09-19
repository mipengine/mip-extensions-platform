/**
 * @file mip-169kang-bottom-btn 组件
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
        var leftText = element.getAttribute('left-text') || '';
        var rightText = element.getAttribute('right-text') || '';
        var leftUrl = element.getAttribute('left-url');
        var rightUrl = element.getAttribute('right-url');
        var leftA = document.createElement('a');
        leftA.className = 'left-link';
        leftA.innerHTML = '<span>' + leftText + '</span>';
        leftA.href = leftUrl;
        var rightA = document.createElement('a');
        rightA.className = 'right-link';
        rightA.innerHTML = '<span>' + rightText + '</span>';
        rightA.href = rightUrl;
        element.appendChild(leftA);
        element.appendChild(rightA);
    };
    return customElement;
});