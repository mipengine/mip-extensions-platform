/**
 * @file mip-options 组件
 * @author susc
 */

define(function (require) {
    'use strict';

    var attrs = {};
    var customElement = require('customElement').create();
    var util = require('util');
    var EventEmitter = util.EventEmitter;
    var CHANGE = 'change';

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var me = this;
    };

    /**
     * 组件构建
     */
    customElement.prototype.build = function () {
        var me = this;
        attrs = {};
        me.emitter = new EventEmitter();
        me.addEventAction('setParam', function (e) {
            setParam.call(me, Array.prototype.slice.call(arguments, 1));
        });
    };

    /**
     * 设置选项属性
     * @param {Array} param 组件中方法参数
    */
    function setParam(param) {
        param = param || [];
        var paramStr = param[0] || '';
        var pData = paramStr.split(',');
        if (pData.length > 1) {
            var order = pData[0];
            var type = pData[1];
            setAttrs.call(this, order, type);
        }
    }

    /**
     * 给组件设置属性
     * @param {string} k 属性名
     * @param {string} v 属性值
    */
    function setAttrs(k, v) {
        var me = this;
        var ele = me.element;
        attrs[k] = v;

        for (var i in attrs) {
            if (attrs.hasOwnProperty(i)) {
                ele.setAttribute(i, attrs[i]);
                me.emitter.trigger(CHANGE, attrs);
            }
        }
    }

    return customElement;
});
