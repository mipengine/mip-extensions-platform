/**
 * @file mip-faniu-filter 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var me = this.element.firstElementChild.parentElement;
        var url = me.getAttribute('url');
        var frm = me.getElementsByTagName('form')[0];
        var parms = {};
        var href;

        for (var i = 0; i < frm.length; i++) {
            frm[i].addEventListener('change', function () {
                doFilter();
            });
        }

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
            console.log(href);
        }
    };

    return customElement;
});
