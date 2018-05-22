/**
 * @file mip-jdd-scroll 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var leftEleClass = 'chart-left';
    var topEleClass = 'chart-top';
    var bodyEleClass = 'chart-body';

    //  build说明：组件标签含有scroll属性则需要立即初始化，没有则监听scroll事件(firstInviewCallback在组件display:none;的情况下仍会触发。)
    customElement.prototype.build = function () {
        var element = this.element;
        var immediateScroll = this.element.hasAttribute('scroll');
        this.hasinited = false;
        if (immediateScroll) {
            initScroll(this);
        }
        else {
            this.addEventAction('scroll', initScroll);
        }

        /**
         * 初始化滚动
         */
        function initScroll() {
            if (this.hasinited) {
                return;
            }
            this.hasinited = true;
            var left = element.querySelector('.' + leftEleClass);
            var top = element.querySelector('.' + topEleClass);
            var body = element.querySelector('.' + bodyEleClass);
            body.addEventListener('scroll', function () {
                left.scrollTop = this.scrollTop;
                top.scrollLeft = this.scrollLeft;
            }, false);
        }
    };

    return customElement;
});
