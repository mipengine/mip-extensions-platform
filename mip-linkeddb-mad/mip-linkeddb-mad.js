/**
 * @file mip-linkeddb-mad 组件
 * @author linkeddb
 */
define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var script = document.createElement('script');
        script.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.setAttribute('async', 'async');
        var s0 = document.getElementsByTagName('script')[0];
        s0.parentNode.insertBefore(script, s0);
        var adsbygoogle;
        (adsbygoogle = window.adsbygoogle || []).push({});
    };

    return customElement;
});
