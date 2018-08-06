/**
 * @file mip-laitui 广告联盟组件
 * @author 点点
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var e = this.element;
        var z = e.getAttribute('adz_id');
        var q = document.createElement('script');
        q.src = 'https://t.arrows-hitech.com/' + z; // laitui.net 广告联盟JS地址。原有mip-lezun可以下线了。那联盟出现跑路情况。
        e.appendChild(q);
    };

    return customElement;
});
