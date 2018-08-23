/**
 * @file mip-cnzzm 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var cnzzStag = document.createElement('script');
        cnzzStag.type = 'text/javascript';
        cnzzStag.async = true;
        cnzzStag.charset = 'utf-8';
        cnzzStag.src = '//w.cnzz.com/c.php?id=4039248&async=1';
        var rootS = document.getElementsByTagName('script')[0];
        rootS.parentNode.insertBefore(cnzzStag, rootS);
        var hmt = [];
        hmt = hmt || [];
        (function () {
            var hm = document.createElement('script');
            hm.src = 'https://hm.baidu.com/hm.js?af4c4140b72e1d6cafc97aa35d131487';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(hm, s);
        })();
    };

    return customElement;
});