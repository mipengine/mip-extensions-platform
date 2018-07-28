/**
 * @file mip-st-scroll 组件
 * @author
 */

/* global MIP, m */
define(function (require) {
    'use strict';


    var util = require('util');

    var viewer = require('viewer');
    var customElement = require('customElement').create();

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

    var htmlTemplate = require('./tpl');

    function render(element, template, data, tag) {
        var wrappers = element.querySelectorAll('.scroll-wrapper');
        for (var i = 0; i < wrappers.length; i++) {
            wrappers[i].style.display = 'none';
        }
        var el = element.querySelector('#' + tag);
        if (el) {
            el.style.display = '';
        }
        else {
            el = document.createElement('div');
            el.id = tag;
            el.className = 'scroll-wrapper';
            var html = template.replace(/#(\w+)#/g, function ($0, $1) {
                return data[$1] || '';
            });
            el.innerHTML = html;
            element.appendChild(el);
        }
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        // var htmlTemplate = element.querySelector('template').innerHTML;
        var querys = getQuery();
        var url = element.getAttribute('url');
        var tag = querys.tag || '';
        var productid = querys.product_id;
        var xzhid = querys.xzh_id;
        if (productid) {
            url += '?product_id=' + productid;
        }
        else if (xzhid) {
            url += '?xzh_id=' + xzhid;
        }
        if (m.currentTab) {
            url += '&spu_cate=' + m.currentTab;
        }
        render(element, htmlTemplate, {url: url + '&tag=' + tag}, tag);
        this.addEventAction('tagchange', function (event) {
            var querys = getQuery();
            var tag = querys.tag;
            render(element, htmlTemplate, {url: url + '&tag=' + tag}, tag);
        });
        util.event.delegate(element, '.pic-thumb', 'click', function (e) {
            var current = util.dom.closest(e.target, '.pic-thumb').getAttribute('original');
            var wrapper = util.dom.closest(e.target, '.st-content-imgs');
            var imgs = wrapper.querySelectorAll('.pic-thumb');
            var imgsArr = [];
            var currentIndex = 0;
            for (var i = 0; i < imgs.length; i++) {
                var url = imgs[i].getAttribute('original');
                if (url === current) {
                    currentIndex = i;
                }
                imgsArr.push(url);
            }
            viewer.eventAction.execute('showslide', element, {
                imgs: imgsArr,
                currentIndex: currentIndex,
                current: current
            });
        });
    };

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;
});
