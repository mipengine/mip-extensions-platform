/**
 * @file mip-cambrian 寒武纪组件
 * @author liulangyu
 * @date 2017-04-20
 * @version 1.0.1
 */

define(function (require) {
    var customElement = require('customElement').create();

    // viewer 窗口
    var viewer = require('viewer');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var id = this.element.getAttribute('site-id');
        id && viewer.sendMessage('cambrian-header', id);
    };

    return customElement;
});
