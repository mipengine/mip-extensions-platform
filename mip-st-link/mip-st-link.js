/**
 * @file mip-st-link 组件
 * @author
 */

define(function (require) {
    'use strict';

    var viewer = require('viewer');
    var isIframed = viewer.isIframed;

    var customElement = require('customElement').create();

    function bindEvents(element, url, title, cache, replace) {

        element.onclick = function () {
            window.MIP.viewer.sendMessage(
                'loadiframe',
                {
                    url: url,
                    query: {
                        nocache: cache ? 0 : 1,
                        title: title || ''
                    },
                    click: {
                        replace: replace ? 1 : 0
                    }
                }
            );
            return false;
        };
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        if (!isIframed) {
            return;
        }

        var element = this.element;

        var aID = element.dataset['id'];
        var aLink;
        var aLinkEl;

        if (aID) {
            aLinkEl = element.querySelector('#' + aID);
            aLink = aLinkEl.getAttribute('href');
            aLinkEl.setAttribute('href', 'javascript:void(0)');
            aLinkEl.removeAttribute('data-type');
        }
        aLink = aLink || element.dataset['url'];

        if (!aLink) {
            throw new Error('缺少参数');
        }

        if (!aLinkEl) {
            aLinkEl = element;
        }

        bindEvents(
            aLinkEl,
            aLink,
            element.dataset['title'],
            element.dataset['cache'],
            element.dataset['replace']
        );

    };

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;
});
