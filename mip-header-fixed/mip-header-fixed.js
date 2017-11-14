/**
 * @file mip-header-fixed 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this .element;
        var headerFixedDom = ele.children[0];
        var eleH = headerFixedDom.offsetHeight;
        var shadowDom = document.createElement('div');
        shadowDom.style.height = eleH + 'px';
        shadowDom.className += 'mip-header-fixed-shadow';
        ele.appendChild(shadowDom);
    };
    return customElement;
});
