/**
 * @file mip-alading-autoscreen 组件
 * @author
 */

define(function (require) {
    'use strict';
    var util = require('util');

    var customElement = require('customElement').create();
    // 初始创建元素时也要执行自适应
    customElement.prototype.createdCallback = function () {
        var ele = this.element;
        var a = ele.querySelector('#fix_bottom');
        util.css(a, 'visibility', 'visibility');
        var rootDom = document.body || document.documentElement; // 此处要获取整个文件的高度只能进行全局选择
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

    /**
     * （因为用户可能存在刷新操作）每一次进入时都触发自定义适配事件
     */
    customElement.prototype.firstInviewCallback = function () { // viewportCallback
        var ele = this.element;
        var a = ele.querySelector('#fix_bottom');
        util.css(a, 'visibility', 'visibility');
        var rootDom = document.body || document.documentElement; // 此处要获取整个文件的高度只能进行全局选择
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
