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
        var separator = me.getAttribute('separator') || false;

        util.event.delegate(me, 'select,input', 'change', function () {
            doFilter();
        });

        function doFilter() {
            var ipts = me.querySelectorAll('input[name]:enabled,select[name]:enabled,textarea[name]:enabled');
            var parms = {};
            var href = '';

            for (var i = 0; i < ipts.length; i++) {
                switch (ipts[i].type.toLowerCase()) {
                    case 'radio':
                        if (ipts[i].checked) {
                            parms[ipts[i].name] = ipts[i].value;
                        }
                        break;
                    case 'checkbox':
                        if (ipts[i].checked) {
                            if (parms[ipts[i].name] === undefined) {
                                parms[ipts[i].name] = [ipts[i].value];
                            } else {
                                parms[ipts[i].name][parms[ipts[i].name].length] = ipts[i].value;
                            }
                        }
                        break;
                    default:
                        parms[ipts[i].name] = ipts[i].value;
                }
            }

            href = url.split('#');
            for (var i in parms) {
                if (parms[i] instanceof Array) {
                    if (separator) {
                        href[0] += (href[0].indexOf('?') < 0 ? '?' : '&') + i + '=' + parms[i].join(separator);
                    } else {
                        for (var j in parms[i]) {
                            href[0] += (href[0].indexOf('?') < 0 ? '?' : '&') + i + '[]=' + parms[i][j];
                        }
                    }
                } else {
                    if (parms[i] !== '') {
                        href[0] += (href[0].indexOf('?') < 0 ? '?' : '&') + i + '=' + parms[i];
                    }
                }
            }
            window.top.location.href = href.join('#');
        }
    };

    return customElement;
});
