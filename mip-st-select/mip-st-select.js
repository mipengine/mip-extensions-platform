/**
 * @file mip-st-select 组件
 * @author
 */

/* global MIP, m */
define(function (require) {
    'use strict';

    var util = require('util');

    var customElement = require('customElement').create();

    var viewer = require('viewer');

    function getQuery(url) {
        url = url || location.href;
        url = url.split('#')[0];
        var query = url.split('?')[1] || '';
        if (!query) {
            return {};
        }
        return query.split('&').reduce(function (obj, item) {
            var data = item.split('=');
            obj[data[0]] = decodeURIComponent(data[1]);
            return obj;
        }, {});
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        this.addEventAction('dataloaded', function (event) {
            var value = getQuery().tag || element.getAttribute('value');
            var tags = m.data.tags;
            var html = '<div class="st-select">';
            for (var key in tags) {
                if (tags.hasOwnProperty(key)) {
                    var tag = tags[key];
                    html += '<div class="st-tag-wrapper' + (key === value ? ' selected' : '') + '" key="' + key + '">';
                    html += '   <div class="st-tag" key="' + key + '">';
                    html += '       <span class="st-tag-text">' + tag.text + '</span>';
                    html += '       <span class="st-tag-count">' + tag.count + '</span>';
                    html += '   </div>';
                    html += '</div>';
                }
            }
            html += '</div>';
            element.innerHTML = html;
        });
        util.event.delegate(element, '.st-tag', 'click', function (e) {
            var wrapper = util.dom.closest(e.target, '.st-tag-wrapper');
            var el = element.querySelector('.selected');
            var currentKey;
            if (el) {
                var prevKey = el.getAttribute('key');
                currentKey = wrapper.getAttribute('key');
                if (prevKey === currentKey) {
                    return;
                }
                el.classList.remove('selected');
            }

            wrapper.classList.add('selected');
            var url = location.origin
                + location.pathname
                + location.search.replace(/tag=\w+/, 'tag=' + currentKey);
            if (!/tag=/.test(url)) {
                url = url.replace('?', '?tag=' + currentKey + '&');
            }
            history.replaceState('', null, url);
            // location.hash = '#tag=' + currentKey;
            viewer.eventAction.execute('tagchange', element);
        });
    };

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;
});
