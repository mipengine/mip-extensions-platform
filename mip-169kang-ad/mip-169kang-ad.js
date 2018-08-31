/**
 * @file mip-169kang-ad 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var e = this.element;
        var baseUrl = e.getAttribute('data-base-url');
        var elId = 'wap_' + e.getAttribute('data-el-id');
        var id = e.getAttribute('data-id');
        var d = document.createDocumentFragment();
        var div = document.createElement('div');
        div.dataset.elId = elId;
        var sc1 = document.createElement('script');
        var scStr = 'var tar_div = document.querySelector("[data-el-id=\'' + elId + '\']");';
        scStr += 'window.sogou_un = window.sogou_un || [];';
        scStr += 'window.sogou_un.push({id: "' + id + '",ele:tar_div});';
        sc1.innerHTML = scStr;
        var sc2 = document.createElement('script');
        sc2.src = baseUrl + id + '.js';
        d.appendChild(div);
        d.appendChild(sc1);
        d.appendChild(sc2);
        e.appendChild(d);
    };
    return customElement;
});
