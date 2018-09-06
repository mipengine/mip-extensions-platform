/**
 * @file 非凡漫画网广告轮播组件
 *
 * @author shen@shenl.com
 * @version 1.0.0
 * @copyright 2018 shenl.com, Inc. All Rights Reserved
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    function render() {
        var element = this.element;
        var node = document.createElement('script');
        node.type = 'text/javascript';
        // 引入非凡漫画网广告管理组件，实现广告素材轮播功能，服务提供商为：非凡漫画网
        node.src = 'http://www.90ff.com/mip/a-90ff.js';
        node.async = 'async';
        $(element).append(node);
    }
    customElement.prototype.build = render;
    return customElement;
});
