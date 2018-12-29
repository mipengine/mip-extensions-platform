/**
 * @file mip-component-filter 组件
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
        var util = require('util');
        var dom = {
            btnDropdown: element.querySelector('.btn-dropdown'),
            mask: element.querySelector('.mask'),
            btnBack: element.querySelector('.search-line').firstElementChild,
            btnSearch: element.querySelector('.search-line').querySelector('.btn-default')
        };
        var open = function () {
            dom.mask.classList.add('show');
        };
        var close = function () {
            var mask = dom.mask;
            if (event.target === mask || event.target === dom.btnBack) {
                mask.classList.remove('show');
            }
        };
        var search = function () {
            var dom = event.target.closest('.search-line');
            var value = dom.children[1].value;
            var url = dom.children[2].dataset.url;
            window.top.location.href = url + value;
        };
        var getWare = function () {
            var target = event.target;
            var parent = target.parentElement;
            var loadid = target.dataset.loadid;
            var loadname = target.dataset.loadname;
            var name = target.textContent;
            var template = parent.dataset.template;
            var templateall = parent.dataset.templateall;
            var getUrl = parent.dataset.url;
            var title = parent.dataset.title;
            fetch(getUrl + loadid).then(function (response) {
                return response.text();
            }).then(function (text) {
                var data = JSON.parse(text);
                var linkTemplate = '<a data-type="mip"  title="{title}" href="{href}">{text}</a>';
                var allTitle = title.replace('{0}', (!title.startsWith('{0}') && name === '全部') ? '' : name);
                var html = linkTemplate
                    .replace('{title}', allTitle)
                    .replace('{href}', (loadname ? template.replace('{0}', loadname) : templateall))
                    .replace('{text}', '全部');
                for (var item in data) {
                    html += linkTemplate
                        .replace('{title}', title.replace('{0}', data[item].Name))
                        .replace('{href}', template.replace('{0}', data[item].LoadName))
                        .replace('{text}', data[item].Name);
                }
                element.querySelector('.filter-box').innerHTML = html;
            });
        };
        var listenEnter = function () {
            if (event.keyCode === 13) {
                search();
            }
        };
        dom.btnDropdown.addEventListener('click', open);
        dom.mask.addEventListener('click', close);
        dom.btnBack.addEventListener('click', close);
        dom.btnSearch.addEventListener('click', search);
        element.querySelector('.search-line').addEventListener('keyup', listenEnter);
        util.event.delegate(element.querySelector('.scroll-filter'), 'button', 'click', getWare);
    };

    return customElement;
});
