/**
 * @file mip-showcase-ripple 组件
 * @author zhuguoxi
 * @description 此组件只为showcase，请勿在正式产品使用。
 */

define(function (require) {
    'use strict';

    var Compile = require('./compile');

     /**
     * Ripple Class
     *
     * @class
     */
    var Ripple = function () {
    };

    Ripple.prototype.start = function () {
        new Compile().start();
    };

    return new Ripple().start();

});
