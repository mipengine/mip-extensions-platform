/**
 * @file mip-hao315-rem 组件
 * @author hYanDou
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     * 换算成rem所除的那个数=设计图量出的尺寸÷（设计图的最大宽度/320*20）
     * eg : 21px的font-size==>21÷rem所除的那个数=**rem
     * document.body.style.fontSize = document.body.clientWidth / 320 * 20 + 'px';
     * document.documentElement.style.fontSize = document.documentElement.clientWidth / 320 * 20 + 'px';
     * window.addEventListener('resize', function (e) {
     * document.body.style.fontSize = document.body.clientWidth / 320 * 20 + 'px';
     * document.documentElement.style.fontSize = document.documentElement.clientWidth / 320 * 20 + 'px';
     * }, false);
     */
    customElement.prototype.firstInviewCallback = function () {
        function changeRootfontsize() {
            var doc = document;
            var docEle = doc.documentElement;
            var viewWidth = docEle.getBoundingClientRect().width;
            var baseSize = viewWidth / 320 * 20;
            var rootfontsizeObj;
            if (doc.getElementById('rootfontsize')) {
                rootfontsizeObj = doc.getElementById('rootfontsize');
            } else {
                rootfontsizeObj = doc.createElement('style');
                doc.getElementsByTagName('head')[0].appendChild(rootfontsizeObj);
                rootfontsizeObj.id = 'rootfontsize';
            }
            rootfontsizeObj.innerHTML = 'html{font-size:' + baseSize + 'px !important;}';
        }
        changeRootfontsize();
        window.addEventListener('resize', function (e) {
            changeRootfontsize();
        }, false);
    };

    return customElement;

});
