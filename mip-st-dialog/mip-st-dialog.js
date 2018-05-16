/**
 * @file mip-showcase-dialog 组件
 * @author susc
 */
/* eslint-disable */
define(function (require) {
    'use strict';
    var viewer = require('viewer');
    var Dialog = require('./dialog');
    var customElement = require('customElement').create();

    /**
     * 通过事件被其他组件调用因此尽快加载
     */
    customElement.prototype.build = function () {
        var me = this;
        var ele = me.element;
        var ok = ele.getAttribute('ok');
        var cancel = ele.getAttribute('cancel');

        var content = ele.innerHTML || '';
        me.addEventAction('open', function (params) {
            var arg = arguments;
            var text = params.text;
            var buttons = params.buttons;
            var title = params.title;
            var options = {
                title: title,
                content: '<div class="msg">' + text + '</div>',
                button: [],
                element: ele,
                lock: true
            };
            if (buttons && buttons.length) {
                for (var i = 0; i < buttons.length; i++) {
                    (function (i) {
                        var btn = buttons[i];
                        options.button.push({
                            id: btn.id,
                            value: btn.value,
                            callback: function () {
                                viewer.eventAction.execute(btn.id, ele, {});
                            }
                        });
                    })(i);
                }
            }
            else {
                options.ok = function () {
                    viewer.eventAction.execute('ok', ele, {});
                };
            }
            me.ins = new Dialog(options);
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
