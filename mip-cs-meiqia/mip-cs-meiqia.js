/**
 * @file mip-cs-meiqia 美洽在线客服组件
 * @author marhey
 * Tencent QQ；52010899
 * @E-mail  marhey@163.com
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var element = this.element;
        var eid = element.getAttribute('eid');
        (function (m, ei, q, i, a) {
            m[i] = m[i] || function _MEIQIA() {
                (m[i].a = m[i].a || []).push(arguments);
            };
            var j = ei.createElement(q);
            var s = ei.getElementsByTagName(q)[0];
            j.async = true;
            j.charset = 'UTF-8';
            j.src = 'https://static.meiqia.com/dist/meiqia.js';
            s.parentNode.insertBefore(j, s);
            this._MEIQIA('entId', eid);
        })(window, document, 'script', '_MEIQIA');
    };
    return customElement;
});
