/**
 * @file mip-sina-sudalog 组件
 * @author fengzihao
 */

define(function (require) {

    var customElement = require('customElement').create();
    var sudaLog = require('./suda_log.min');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {

        sudaLog.init();
    };

    return customElement;
});
