/**
 * @file mip-zmall-tab-ajax 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var viewer = require('viewer');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;

        var script = element.querySelector('script[type="application/json"]');
        var settings = {};
        if (script) {
            var customSettings = JSON.parse(script.textContent.toString());
            settings = util.fn.extend(settings, customSettings);
        }

        if (!settings.tabs.length) {
            console.error('mip-zmall-tab-ajax: the config lost!'); // eslint-disable-line
            return;
        }

        var tabsHtml = '';
        var activeClassName = settings.activeClassName;
        settings.tabs.forEach(function (item, index) {
            var current = index === settings.defaultIndex ? (' ' + activeClassName) : '';
            var eventAttr = item.on ? (' on="tabAjax:' + item.on + '"') : '';
            tabsHtml += '<li class="ajax-tab-item' + current + '"' + eventAttr + '><span>' + item.text + '</span></li>';
        });
        var tabAnchorTpl = [
            '<div class="ajax-tab-box">',
            '<ul class="ajax-tab flex">',
            tabsHtml,
            '</ul></div>'
        ].join('');
        element.innerHTML = tabAnchorTpl;

        var tabItems = element.querySelectorAll('.ajax-tab-item');

        // 锚点点击
        [].forEach.call(tabItems, function (item, index) {
            item.addEventListener('click', function (e) {
                if (item.classList.contains(activeClassName)) {
                    return;
                }
                viewer.eventAction.execute('tabAjax', e.target, e);
                item.parentNode.querySelector('.' + activeClassName).classList.remove(activeClassName);
                item.classList.add(activeClassName);
            });
        });
    };

    return customElement;
});
