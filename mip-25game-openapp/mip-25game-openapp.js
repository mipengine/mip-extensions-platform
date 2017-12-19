/**
 * @file mip-25game-openapp 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        element.addEventListener('click', function () {
            var scheme = element.getAttribute('scheme');
            var downurl = element.getAttribute('downurl');
            window.location = scheme;
            setTimeout(function () {
                window.location = downurl;
            }, 500);
        }, false);
    };

    return customElement;
});
