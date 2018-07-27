/**
 * @file mip-xyz-probe 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var gb = document.createElement('script');
        gb.type = 'text/javascript';
        gb.async = true;
        gb.src = 'https://pylon.pro6e.com/gb/js/assets/probe/probe_3415_1.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gb, s);
        gb.onload = function () {
            if (typeof Probe !== 'undefined') {
                (new Probe({
                    probability: 100,
                    cookies: ['pid'],
                    resourceCollect: ['https://www.googleadservices.com/pagead/conversion.js']
                })).start();
            }
        }
    };

    return customElement;
});
