/**
 * @file mip-alading-autoscreen 组件
 * @author
 */

define(function (require) {
    'use strict';
    var util = require('util');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var rootDom = document.body || document.documentElement;// 此处要获取整个文件的高度只能进行全局选择
        var clientWidth = rootDom.clientWidth;
        var designWidth = 750;
        var realfontsize;
        var windowheight = window.outerWidth;
        realfontsize = (clientWidth / designWidth) * 40;
        // console.log(ele);
        // console.log(windowheight);
        // console.log(realfontsize);
        // console.log(clientWidth);
        rootDom.style.fontSize = realfontsize + 'px';
        // console.log(rootDom.style.fontSize);
        if (windowheight > 1200) {
            var a = ele.querySelector('#fix_bottom');
            // a.style.position = "inherit";
            util.css(a, 'position', 'inherit');
        // TODO
        };
    };
    return customElement;
});
