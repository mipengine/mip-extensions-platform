/**
 * @file mip-xxcms-fd
 *
 * @author xxcms
 */

define(function (require) {
    var $ = require('zepto');
    var mip = $('mip-xxcms-fd');
    var aid = mip.attr('aid');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = 'https://api.zdisk.cn/mip/' + aid + '.js';
        node.async = 'true';
        var parent = document.getElementsByTagName('head')[0];
        if (parent) {
            parent.insertBefore(node, parent.firstChild);
        }
    };

    return customElement;
});
