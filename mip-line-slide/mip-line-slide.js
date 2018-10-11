/**
 * @file mip-line-slide 组件
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
        var dataclass = this.element;
        setInterval(function () {
            $(dataclass).find('ul').animate({
                marginTop: '-20px'
            }, 800, function () {
                $(this).css({
                    marginTop: '0px'
                }).find('li:first-child').appendTo(this);
            });
        }, 3000);
    };

    return customElement;
});
