/**
 * @file mip-jupeixun-sogou-ad 组件
 * 搜狗广告
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        var adWidth = ele.getAttribute('ad_width');
        var adHeight = ele.getAttribute('ad_height');
        var adId = ele.getAttribute('ad_id');
        var adSrc = ele.getAttribute('ad_src');

        var adhtml = 'var sogou_ad_id=' + adId + ';';
        adhtml += 'var sogou_ad_content_height=' + adHeight + ';';
        var scriptTag1 = document.createElement('script');
        scriptTag1.innerHTML = adhtml;

        var scriptTag2 = document.createElement('script');
        scriptTag2.src = adSrc,
        scriptTag2.setAttribute('async', 'true');

        ele.appendChild(scriptTag1);
        ele.appendChild(scriptTag2);
    };

    return customElement;
});
