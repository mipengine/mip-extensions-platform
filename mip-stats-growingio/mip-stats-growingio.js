/**
 * @file mip-stats-growingio 组件
 * @author Uncle Zheng
 * @email zhengyongbo0128@gmail.com
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var myVds = [];
        window._vds = myVds;
        var element = this.element;
        var accountId = element.getAttribute('accountid');
        myVds.push(['setAccountId', accountId]);
        var vdsSrc = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'assets.growingio.com/vds.js';
        var vds = document.createElement('script');
        vds.setAttribute('type', 'text/javascript');
        vds.setAttribute('src', vdsSrc);
        $(element).append(vds);
    };

    return customElement;
});
