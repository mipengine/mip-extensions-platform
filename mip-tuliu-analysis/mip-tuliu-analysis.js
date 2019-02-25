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
        var element = this.element;
        window._tbEventAnalysis = window._tbEventAnalysis || [];
        window.tbSiteType = 'tuliu_wap';
        var vdsSrc = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'statics.tuliu.com/stats/js/tb_prod_v1.js';
        var vds = document.createElement('script');
        vds.setAttribute('type', 'text/javascript');
        vds.setAttribute('src', vdsSrc);
        $(element).append(vds);
    };

    return customElement;
});
