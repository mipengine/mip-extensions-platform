/**
 * @file mip-tabs-lf 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO

        // 获取this
        var myThis = this.element;
        // 获取元素
        var lftop = myThis.querySelector('.mip-tabs-lf-top');
        var lftopspan = myThis.querySelectorAll('.mip-tabs-lf-top-span');
        var lfwrapboxs = myThis.querySelectorAll('.mip-tabs-lf-boxs');
        //	点击
        lftop.onclick = function (event) {
            var event = event || window.event;
            var target = event.target || event.srcElement;
            if (target.nodeName.toLowerCase() === 'span') {
                //	取消所有高亮
                for (var i = 0; i < lftopspan.length; i++) {
                    lftopspan[i].classList.remove('act');
                }
                //	点击添加高亮
                target.classList.add('act');
                //	降低所有z-index
                for (var j = 0; j < lftopspan.length; j++) {
                    lfwrapboxs[j].style.zIndex = 0;
                }
                //	点击显示对应的内容
                lfwrapboxs[parseInt(target.getAttribute('data-number'), 0)].style.zIndex = 1;
            }

        };
    };

    return customElement;
});
