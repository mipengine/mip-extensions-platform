
/**
 * @file mip-51la-official 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var attr = document.querySelector('[data-51laid]').attributes['data-51laid'];
        var id = attr ? attr.value : null;
        if (id) {
            var script = document.createElement('script');
            script.src = document.location.protocol + '//js.users.51.la/' + id + '.js';
            document.body.appendChild(script);
        }
    };

    return customElement;
});


