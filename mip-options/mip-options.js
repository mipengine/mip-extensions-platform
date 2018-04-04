/**
 * @file mip-options 组件
 * @author susc
 */

define(function (require) {
    'use strict';

    var attrs = {};
    var customElement = require('customElement').create();
    var viewer = require('viewer');
    // var EventEmitter = util.EventEmitter;
    var CHANGE = 'change';
    var ACTIVE = 'active';

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
        var ele = me.element;
        var customClass = ele.getAttribute('data-class') || ACTIVE;
        var prev = null;
        attrs = {};

        // me.emitter = new EventEmitter();
        me.addEventAction('setParam', function (e) {
            window.xxx = e;
            var target = e.target || {};

            if (target.hasAttribute('on')) {
                var parent = target.parentNode;
                var idx = indexOf(target);
                if (idx === 0) {
                    parent.classList.toggle(customClass);
                }
                else {
                    var paramStr = arguments[1] || '';
                    var pData = paramStr.split(',');
                    if (pData.length > 1) {
                        var order = pData[0];
                        var type = pData[1];
                        setAttrs.call(me, order, type, event);
                    }
                    parent.classList.add(customClass);
                }
                if (prev && (prev !== parent)) {
                    prev.classList.remove(customClass);
                }
                prev = parent;
            }
        });
    };

    /**
     * 获取元素index
     * @param {object} el dom元素
     * @return {number} a.length 元素的index值
    */
    function indexOf(el){
        var a = [];
        if(!el) return [];
        el = prev(el);
        while(el){
            a.unshift(el);
            el = prev(el);
        }
        return a.length;
    }

    /**
     * 获取元素前一个元素
     * @param {object} el dom元素
    */
    function prev(el){
        if(typeof el.previousElementSibling == "object"){
            return el.previousElementSibling;
        }else{
            var pe = el.previousSibling;
            while(pe){
                if(pe.nodeType == 1){
                    return pe;
                }
                pe = pe.previousSibling;
            }
        }
    }

    /**
     * 给组件设置属性
     * @param {string} k 属性名
     * @param {string} v 属性值
    */
    function setAttrs(k, v, event) {
        var me = this;
        var ele = me.element;
        attrs[k] = v;

        for (var i in attrs) {
            if (attrs.hasOwnProperty(i)) {
                ele.setAttribute(i, attrs[i]);
                // me.emitter.trigger(CHANGE, attrs);
                viewer.eventAction.execute(CHANGE, ele, event);
            }
        }
    }

    return customElement;
});
