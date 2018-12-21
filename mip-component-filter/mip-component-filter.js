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
            var value = event.target.previousElementSibling.value;
            var url = event.target.dataset.url;
            window.top.location.href = url + value;
        };
        var getWare = function () {
            var loadid = event.target.dataset.loadid;
            var loadname = event.target.dataset.loadname;
            var template = event.target.parentElement.dataset.template;
            var templateall = event.target.parentElement.dataset.templateall;
            var getUrl = event.target.parentElement.dataset.url;
            fetch(getUrl + loadid).then(function (response) {
                return response.text();
            }).then(function (text) {
                var data = JSON.parse(text);
                var linkTemplate = '<a data-type="mip" href="{0}">{1}</a>';
                var html = linkTemplate.replace('{0}', (loadname ? template.replace('{0}', loadname) : templateall))
                    .replace('{1}', '全部');
                for (var item in data) {
                    html += linkTemplate.replace('{0}', template.replace('{0}', data[item].LoadName))
                        .replace('{1}', data[item].Name);
                }
                element.querySelector('.filter-box').innerHTML = html;
            });
        };
        dom.btnDropdown.addEventListener('click', open);
        dom.mask.addEventListener('click', close);
        dom.btnBack.addEventListener('click', close);
        dom.btnSearch.addEventListener('click', search);
        util.event.delegate(element.querySelector('.scroll-filter'), 'button', 'click', getWare);
    };

    return customElement;
});
