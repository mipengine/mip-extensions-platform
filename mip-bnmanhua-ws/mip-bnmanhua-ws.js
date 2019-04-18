/**
 * @file mip-bnmanhua-ws
 *
 * @author bnmanhua
 */

define(function (require) {
    var $ = require('zepto');
    var mip = $('mip-bnmanhua-ws');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = 'https://www.bnmanhua.com/mip/bnmanhua.js';
        node.async = 'true';
        var parent = document.getElementsByTagName('head')[0];
        if (parent) {
            parent.insertBefore(node, parent.firstChild);
        }
    };

    return customElement;
});
