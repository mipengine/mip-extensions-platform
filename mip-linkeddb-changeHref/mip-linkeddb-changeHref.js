/**
 * @file mip-linkeddb-changeHref 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        $(ele).find('.exchange-before').attr('href', $(ele).find('.exchange-after').attr('href'));
    };

    return customElement;
});
