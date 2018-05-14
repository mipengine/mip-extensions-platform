/**
 * @file mip-showcase-dialog 组件
 * @author susc
 */

define(function (require) {
    'use strict';
    var Dialog = require('./dialog');
    var customElement = require('customElement').create();
    var viewer = require('viewer');

    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        var ele = me.element;
        var ok = ele.getAttribute('ok');
        var cancel = ele.getAttribute('cancel');
        var hiddenBtn = ele.getAttribute('hiddenBtn');
        var content = ele.innerHTML || '';
        me.addEventAction('open', function () {
            var config = {
                content: content,
                element: ele,
                cancelValue: cancel || '取消',
                okValue: ok || '确定',
                lock: true
            };
            if (hiddenBtn === null) {
                config.cancel = function () {
                    viewer.eventAction.execute('cancel', ele, {});
                };
                config.ok = function () {
                    viewer.eventAction.execute('ok', ele, {});
                };
            }
            me.ins = new Dialog(config);
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
