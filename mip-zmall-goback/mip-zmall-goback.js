/**
 * @file mip-zolzmall-goback 组件
 * @author jiao.yang@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;

        element.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            window.history.go(-1);
        });
    };

    return customElement;
});
