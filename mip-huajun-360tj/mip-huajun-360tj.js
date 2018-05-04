/**
* fixed nav
* @file fixed nav component
* @author 873920193@qq.com
* @version 1.0
* @copyright 2018 onlinedown.net, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    function init(isid) {
        (function (b, a, e, h, f, c, g, s) {
            b[h] = b[h] || function () {
                (b[h].c = b[h].c || []).push(arguments);
            };
            b[h].s = !!c;
            g = a.getElementsByTagName(e)[0];
            s = a.createElement(e);
            s.src = '//s.union.360.cn/' + f + '.js';
            s.defer = !0;
            s.async = !0;
            g.parentNode.insertBefore(s, g);
        })(window, document, 'script', '_qha', isid, false);
    }
    //
    customElem.prototype.firstInviewCallback = function () {
        var element = this.element;
        var hsId = $(element).attr('hsId');
        init(hsId);
    };
    return customElem;
});
