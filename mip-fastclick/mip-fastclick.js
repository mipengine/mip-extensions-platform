/**
 * @file mip-fastclick 组件
 * @author zhangpenghe@baidu.com
 * @date 2018-07-28
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var Fastclick = require('./fastclick.min');

    customElement.prototype.build = function () {
        Fastclick.attach(this.element);
    };

    return customElement;
});
