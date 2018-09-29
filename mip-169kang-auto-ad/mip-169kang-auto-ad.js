/**
 * @file mip-169kang-auto-ad 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    // build说明: 异步广告加载组件，有被屏蔽的超时检测，需要尽快加载
    customElement.prototype.build = function () {
        var el = this.element;
        var bdid = el.getAttribute('bd-id');
        var sgid = el.getAttribute('sg-id');
        var sgWidth = el.getAttribute('sg-width');
        var sgHeight = el.getAttribute('sg-height');
        var elIndex = el.getAttribute('el-index');
        var baseUrl = el.getAttribute('base-url');
        var timeout = parseInt(el.getAttribute('timeout'), 10);
        var bdad = document.createElement('mip-ad');
        bdad.setAttribute('type', 'ad-baidu');
        bdad.setAttribute('cproid', bdid);
        el.appendChild(bdad);
        setTimeout(function () {
            if (el.querySelector('iframe') === null) { // 替换sgad
                bdad.style.display = 'none';
                var sgad = document.createElement('mip-169kang-ad');
                sgad.setAttribute('sg-id', sgid);
                sgad.setAttribute('sg-width', sgWidth);
                sgad.setAttribute('sg-height', sgHeight);
                sgad.setAttribute('el-index', elIndex);
                sgad.setAttribute('base-url', baseUrl);
                el.appendChild(sgad);
            }
        }, timeout);
    };
    return customElement;
});