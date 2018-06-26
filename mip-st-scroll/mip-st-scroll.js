/**
 * @file mip-st-scroll 组件
 * @author
 */

/* global MIP */
define(function (require) {
    'use strict';

    var util = require('util');

    var viewer = require('viewer');
    var customElement = require('customElement').create();

    function getQuery(url) {
        url = url || location.href;
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

    function render(element, template, data) {
        var html = template.replace(/#(\w+)#/g, function ($0, $1) {
            return data[$1] || '';
        });
        element.innerHTML = html;
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var htmlTemplate = element.querySelector('template').innerHTML;
        var url = element.getAttribute('url');
        var tag = MIP.hash.get('tag');
        var productid = getQuery().product_id;
        render(element, htmlTemplate, {url: url + '?product_id=' + productid + '&tag=' + tag});
        this.addEventAction('tagchange', function (event) {
            var tag = MIP.hash.get('tag');
            render(element, htmlTemplate, {url: url + '?product_id=' + productid + '&tag=' + tag});
        });
        util.event.delegate(element, '.pic-thumb', 'click', function (e) {
            var current = util.dom.closest(e.target, 'mip-img').getAttribute('original');
            var wrapper = util.dom.closest(e.target, '.st-content-imgs');
            var imgs = wrapper.querySelectorAll('mip-img');
            var imgsArr = [];
            for (var i = 0; i < imgs.length; i++) {
                imgsArr.push(imgs[i].getAttribute('original'));
            }
            viewer.eventAction.execute('showslide', element, {
                imgs: imgsArr,
                current: current
            });
        });
    };

    return customElement;
});
