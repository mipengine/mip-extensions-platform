/**
 * @file lianyun.51.la 平台广告组件
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
        var z = e.getAttribute('q');
        var q = document.createElement('script');
        var d = e.getAttribute('id');
        var t;
        if (d === 'APP_51LA_EDU') {
            t = 'education';
        }
        else if (d === 'APP_51LA_INS') {
            t = 'insurance';
        }
        q.src = 'https://lianyun.51.la/' + t + '/app.js?q=' + z; // 广告JS地址。51.la平台旗下联运平台JS地址啊。小姐姐？看注释啊。
        q.id = d;
        if (t !== undefined) {
            e.appendChild(q);
        }
    };

    return customElement;
});
