/**
 * @file mip-another-change 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var templates = require('templates');
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var url = $(ele).attr('url');
        var view = $($(ele).attr('view-id'));
        var active = $($(ele).attr('active-id'));
        var activeClass = $(ele).attr('active-class');
        var dataType = $(ele).attr('data-type');

        ele.addEventListener('click', function () {
            getData(ele, url, view, active, activeClass, dataType);
        }, false);
    };

    function getData(ele, url, view, active, activeClass, dataType) {
        active && active.addClass(activeClass);
        $.get(url, function (data) {
            if (dataType && dataType.split('|')[0]) {
                dataType.split('|').forEach(function (e) {
                    data = data[e];
                });
            };
            active && active.removeClass(activeClass);
            render(ele, data, view);
        });
    }

    function render(ele, data, view) {
        templates.render(ele, data).then(function (html) {
            view && (view.html(html));
        });
    }

    return customElement;
});
