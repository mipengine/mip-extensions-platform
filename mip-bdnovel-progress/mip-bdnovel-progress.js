/**
 * @file mip-bdnovel-progress 组件
 * @author
 */

define(function (require) {
    'use strict';

    const customElement = require('customElement').create();
    const util = require('util');
    function leftPad2(str = '') {
        str += '';
        switch (str.length) {
            case 0:
                return '00';
            case 1:
                return '0' + str;
            default:
                return str;
        }
    }

    customElement.prototype.build = function () {
        const element = this.element;
        const title = element.getAttribute('chapter-title');
        const url = element.getAttribute('chapter-url');
        if (title) {
            util.css(element, 'display', 'none');
            const date = new Date();
            const dateStr = (date.getYear() + 1900) + '' + leftPad2(date.getMonth() + 1) + leftPad2(date.getDate());

            const node = document.createElement('script');
            node.type = 'text/javascript';
            node.src = 'https://gss0.bdstatic.com/5foIcy0a2gI2n2jgoY3K/n/nvn/jslib/BDTR_NOVEL.js?v=' + dateStr;
            element.appendChild(node);

            node.onload = function () {
                const options = url && url.length > 0 ? {url} : {};
                window.BDTR.saveLastChapter(title || '', options);
            };
        }
        else {
            console.warn('[mip-bdnovel-progress] You Must pass title property to enable this plugin');
        }
    };

    return customElement;
});
