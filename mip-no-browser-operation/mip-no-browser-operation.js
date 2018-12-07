/**
 * @file mip-no-browser-operation 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var element = this.element;

        /**
         * 获取控件相对应的属性值
         * @type {any}
         */
        // 禁止右键
        var isNoOpenMenu = element.getAttribute('no-open-menu').toLowerCase() === 'true' ? true : false;
        // 禁止选取
        var isNoSelect = element.getAttribute('no-select').toLowerCase() === 'true' ? true : false;
        // 禁止复制
        var isNoCopy = element.getAttribute('no-copy').toLowerCase() === 'true' ? true : false;


        if (isNoOpenMenu) {
            // 禁止右键
            document.oncontextmenu = function () {
                event.returnValue = false;
            };
        }

        if (isNoSelect) {
            // 禁止选取网页上的内容
            document.onselectstart = function () {
                event.returnValue = false;
            };
        }

        if (isNoCopy) {
            // 禁止复制
            document.oncopy = function () {
                event.returnValue = false;
            };
        }


    };

    return customElement;
});
