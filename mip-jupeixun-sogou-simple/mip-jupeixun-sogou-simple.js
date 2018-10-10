/**
 * @file mip-jupeixun-sogou-simple 组件
 * 搜狗广告简版
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        var adId = ele.getAttribute('ad_id');

        var adsBlockHtml = document.createElement('div');
        adsBlockHtml.id = 'sogou_wap_' + adId;

        var adhtml = 'var sogou_div = document.getElementById("sogou_wap_' + adId + '");';
        adhtml += 'window.sogou_un = window.sogou_un || [];';
        adhtml += 'window.sogou_un.push({id: "' + adId + '",ele:sogou_div});';
        var scriptTag1 = document.createElement('script');
        scriptTag1.innerHTML = adhtml;

        var scriptTag2 = document.createElement('script');
        scriptTag2.async = 'async';

		// 引入搜狗广告js文件
        scriptTag2.src = 'https://theta.sogoucdn.com/wap/js/aw.js';

        ele.appendChild(adsBlockHtml);
        ele.appendChild(scriptTag1);
        ele.appendChild(scriptTag2);
    };

    return customElement;
});
