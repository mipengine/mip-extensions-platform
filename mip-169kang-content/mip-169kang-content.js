/**
 * @file mip-169kang-content 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    // build说明: 异步广告备用组件，百度广告被屏蔽时超时检测后展现，需要尽快加载
    customElement.prototype.build = function () {
        var el = this.element;
        var baseUrl = el.getAttribute('base-url');
        var id = el.getAttribute('sg-id');
        var sgWidth = el.getAttribute('sg-width');
        var sgHeight = el.getAttribute('sg-height');
        var elId = 'sogou_wap_' + id + el.getAttribute('el-index');
        var d = document.createDocumentFragment();
        var div = document.createElement('div');
        div.setAttribute('id', elId);
        var scriptTxt = 'var sogou_div = document.getElementById("' + elId + '");';
        scriptTxt += 'window.sogou_un = window.sogou_un || [];';
        scriptTxt += 'window.sogou_un.push({id: "' + id + '",ele:sogou_div,w:' + sgWidth + ',h:' + sgHeight + '});';
        var innerSc = document.createElement('script');
        innerSc.innerHTML = scriptTxt;
        var sc = document.createElement('script');
        sc.src = baseUrl;
        sc.setAttribute('async', 'async');
        d.appendChild(div);
        d.appendChild(innerSc);
        d.appendChild(sc);
        el.appendChild(d);
    };
    return customElement;
});