/**
 * @file mip-st-textarea 组件
 * @author
 */

/* global MIP, m */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    var util = require('util');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var max = (element.getAttribute('max') || 200) - 0;
        var min = (element.getAttribute('min') || 5) - 0;
        var field = element.getAttribute('field');
        var placeholder = element.getAttribute('placeholder') || '';
        var data = {};
        data[field] = '';
        MIP.setData(data);

        // var html = '<div>';
        // html += '<textarea class="textarea" placeholder="' + placeholder + '"></textarea>';
        // html += '<div class="textarea-count" m-text="textareaCount"></div>';
        // html += '</div>';
        // element.innerHTML = html;

        MIP.setData({textareaCount: '最少' + min + '个字'});

        var el = element.querySelector('.textarea');
        util.event.delegate(element, '.textarea', 'input', function () {
            var length = el.value.length;
            // if (length > max) {
            //     el.value = el.value.substr(0, max);
            //     length = max;
            // }
            data[field] = el.value;
            MIP.setData(data);
            if (length >= min) {
                MIP.setData({textareaCount: length + '/' + max});
            }
            else {
                MIP.setData({textareaCount: '最少' + min + '个字'});
            }
        });
    };

    return customElement;
});
