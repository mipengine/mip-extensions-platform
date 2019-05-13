/**
 * @file mip-wedoctor-ad 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        var type = element.getAttribute('wd-ad-type');
        var iframe = document.createElement('mip-iframe');
        var uri = window.location.href.split('#')[0].split('?')[0];
        var width = window.innerWidth;
        var height = window.innerHeight;
        var fosi = 20 * (width / 375);
        var adtypeWidth = {
            firstadtype: {
                height: 2.5
            },
            secondadtype: {
                height: 3
            },
            thirdadtype: {
                height: 2.5
            }
        };
        iframe.setAttribute('style', 'display: block;');
        iframe.setAttribute('width', width);
        iframe.setAttribute('height', adtypeWidth[type] && adtypeWidth[type].height * fosi);
        // iframe.setAttribute('src', 'http://192.168.128.223:9999/index.html?ad-type=' + type + '&uri=' + uri + '&width=' + width + '&height=' + height + '');
        iframe.setAttribute('src', 'https://houtai.xindingwealth.com/ad-index.html?ad-type=' + type + '&uri=' + uri + '&width=' + width + '&height=' + height + '');
        element.append(iframe);
    };

    return customElement;
});
