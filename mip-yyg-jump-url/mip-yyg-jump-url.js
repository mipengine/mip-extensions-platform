/**
 * @file mip-yyg-jump-url 组件
 * @author Summer
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 存储对象
     * @type {{}}
     */
    var that = {};

    var parmas = {
        jumpUrl: ''
    };

    var main = {
        init: function () {

            $(that.elem).on('click', function () {
                window.location.href = that.attrs.jumpUrl;
            });
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        that.self = this;
        that.elem = this.element;

        that.attrs = {
            jumpUrl: this.element.getAttribute('jumpUrl') || parmas.phone
        };

        main.init();
    };

    return customElement;
});
