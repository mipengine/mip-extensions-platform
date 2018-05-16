/**
 * @file mip-st-goods 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var templates = require('templates');
    // var viewer = require('viewer');

    /**
     * 数据处理组件,需要尽快绑定message事件
     */
    customElement.prototype.build = function () {
        var element = this.element;
        window.addEventListener('message', function (e) {
            var loc = window.location;
            var domain = loc.protocol + '//' + loc.host;
            if (e.origin === domain
                && e.source === window && e.data
                && e.data.type === 'bind') {
                var data = e.data.m;
                if (data.code !== 0) {
                    return;
                }
                templates.render(element, data.data).then(function (html) {
                    document.body.querySelector('.hide').style.opacity = 1;
                    element.innerHTML = html;
                });
            }
        });
    };

    return customElement;
});
