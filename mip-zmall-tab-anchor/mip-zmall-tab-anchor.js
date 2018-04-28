/**
 * @file mip-zmall-tab-anchor 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var viewport = require('viewport');

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

        if (!settings.tabAnchorText || !settings.tabAnchorText.length) {
            console.error('mip-zmall-tab-anchor: the config lost!'); // eslint-disable-line
            return;
        }

        // 去除没有的
        settings.tabPanelIds.forEach(function (item, index) {
            var panel = document.querySelector(item);
            if (!panel) {
                settings.tabAnchorText.splice(index, 1);
            }
        });

        var activeClassName = settings.activeClass;
        var tabAnchorHtml = '';
        settings.tabAnchorText.forEach(function (item, index) {
            tabAnchorHtml += '<li class="tab-anchor-item">' + item + '</li>';
        });
        var tabAnchorTpl = [
            '<div class="tab-anchor-box">',
            '<ul class="tab-anchor-list">',
            tabAnchorHtml,
            '</ul></div>'
        ].join('');
        element.innerHTML = tabAnchorTpl;

        var tabPanelIds = settings.tabPanelIds;
        var tabAnchorItems = element.querySelectorAll('.tab-anchor-item');
        var elementHeight = element.offsetHeight;

        // 页面 scroll 事件
        viewport.on('scroll', function () {
            var st = viewport.getScrollTop();
            tabPanelIds.forEach(function (item, index) {
                var tabPanelElement = document.querySelector(item);
                var top = tabPanelElement.offsetTop - elementHeight;
                var bottom = tabPanelElement.offsetHeight + top;
                if (st > top && st < bottom) {
                    var anchorElement = tabAnchorItems[index];
                    var activeAnchor = anchorElement.parentNode.querySelector('.' + activeClassName);
                    activeAnchor && activeAnchor.classList.remove(activeClassName);
                    anchorElement.classList.add(activeClassName);
                }
            });
        });

        // 锚点点击
        [].forEach.call(tabAnchorItems, function (item, index) {
            item.addEventListener('click', function () {
                item.parentNode.querySelector('.' + activeClassName).classList.remove(activeClassName);
                item.classList.add(activeClassName);
                var targetPanel = document.querySelector(tabPanelIds[index]);
                var targetPanelOffsetTop = targetPanel.offsetTop;
                var top = targetPanelOffsetTop - elementHeight;
                viewport.setScrollTop(top);
            });
        });
    };

    return customElement;

});
