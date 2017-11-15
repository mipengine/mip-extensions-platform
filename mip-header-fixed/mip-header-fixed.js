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
        var target = ele.getAttribute('data-target');
        shadowDom.style.height = eleH + 'px';
        shadowDom.className += 'mip-header-fixed-shadow';
        if (target === null || target === '') {
            target = 'inner';
        }
        switch (target) {
            case 'inner':
                ele.appendChild(shadowDom);
                break;
            default:
                try {
                    var targetObj = document.querySelector(target);
                    targetObj.parentNode.insertBefore(shadowDom, targetObj);
                }
                catch (e) {
                    console.log(e + ' (xiaojp:组件的data-target参数，请传递一个dom的选择器)');
                }
        }
    };
    return customElement;
});
