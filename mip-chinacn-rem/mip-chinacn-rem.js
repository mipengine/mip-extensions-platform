/**
 * @file mip-chinacn-rem组件
 * @author shenfanzui
 */
define(function (require) {
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth > 640) {
            deviceWidth = 640;
        };
        document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';
    };
    return customElement;
});
