/**
 * @file mip-qtkj-removeStyle 组件
 * @author yzxsl
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var a = document.getElementsByClassName('remove-style');
        for (var i = 0; i < a.length; i++) {
            a[i].removeAttribute('style');
            var b = a[i].children;
            for (var j = 0; j < b.length; j++) {
                b[j].removeAttribute('style');
                var c = b[j].children;
                for (var k = 0; k < c.length; k++) {
                    c[k].removeAttribute('style');
                    var d = c[k].children;
                    for (var l = 0; l < d.length; l++) {
                        d[l].removeAttribute('style');
                        var e = d[l].children;
                        for (var m = 0; m < e.length; m++) {
                            e[m].removeAttribute('style');
                            var f = e[m].children;
                            for (var n = 0; n < f.length; n++) {
                                f[n].removeAttribute('style');
                            }
                        }
                    }
                }
            }
        }
    };
    return customElement;
});
