/**
 * @file mip-360-entered 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        (function () {
            var src = (document.location.protocol === 'http:') ? 'http://js.passport.qihucdn.com/11.0.1.js?0420e6c24fffb212f288ad21669d7628' : 'https://jspassport.ssl.qhimg.com/11.0.1.js?0420e6c24fffb212f288ad21669d7628';
            document.write('<script src="' + src + '" id="sozz"><\/script>');
        })();
    };

    return customElement;
});
