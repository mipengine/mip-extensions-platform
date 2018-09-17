/**
 * @file mip-collectionStatistics 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var mobile = window.location.href.replace('www.', 'm.');
    var www = window.location.href.replace('m.', 'www.');
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
//      移动端
        if (window.location.href.indexOf(mobile) === -1) {
            window.location.href = window.location.href.replace(www, mobile);
        }
    }
    else {
//      PC端
        if (window.location.href.indexOf(www) === -1) {
            window.location.href = window.location.href.replace(mobile, www);
        }
    }
    customElement.prototype.firstInviewCallback = function () {
        // TODO
    };

    return customElement;
});
