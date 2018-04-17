/**
 * @file mip-showcase-dialog 组件
 * @author susc
 */

define(function (require) {
    'use strict';
    var Dialog = require('./dialog');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.build = function () {
        var me = this;
        var ele = me.element;
        var ok = ele.getAttribute('ok');
        var cancel = ele.getAttribute('cancel');

        var content = ele.innerHTML || '';
        me.addEventAction('open', function () {
            var arg = arguments;
            me.ins = new Dialog({
                content: content,
                element: ele,
                cancel:  function () {
                    console.log('cancel', arg);
                },
                ok: function () {
                    console.log('ok', arg);
                },
                lock: true,
            });
        });
        ele.innerHTML = '';

        me.addEventAction('close', function (e) {
            me.ins && me.ins.close();
        });
        me.addEventAction('destroy', function (e) {
            me.ins && me.ins.destroy();
        });
    };

    return customElement;
});
