/**
 * @file mip-faniu-filter 组件
 * @author
 */

define(function (require) {
    'use strict';
    var util = require('util');
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var me = this.element;
        var url = me.getAttribute('url');
        var frm = me.querySelector('form');
        var parms = {};
        var href;
        util.event.delegate(me, 'select,input', 'change', function () {
            doFilter();
        });

        function doFilter() {
            parms = {};
            for (var i = 0; i < frm.length; i++) {
                if (parms[frm[i].name] === undefined) {
                    parms[frm[i].name] = frm[frm[i].name].value;
                }
            }
            href = url;
            for (var i in parms) {
                if (parms[i] !== '') {
                    href += (href.indexOf('?') < 0 ? '?' : '&') + i + '=' + parms[i];
                }
            }
            window.top.location.href = href;
        }
    };

    return customElement;
});
