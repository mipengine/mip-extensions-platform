/**
 * @file mip-zxzrem 组件
 * @author sanguogege
 */

define(function (require) {
    var customElement = require('customElement').create();
    function remResize() {
        var o = 800;
        var html = document.getElementsByTagName('html')[0];
        var w = html.offsetWidth;
        var n = Math.max(Math.min(w, 480), 320);
        var p = Math.floor((n / o) * 100);
        document.querySelector('html').style.fontSize = p + 'px';
    }
    remResize();
    window.onresize = function () {
        remResize();
    };
    if (self !== top) {
        top.location.href = self.location.href;
    }
    var UC_INFO = navigator.userAgent.indexOf('UCBrowser') > -1;
    var MI_INFO = navigator.userAgent.indexOf('MiuiBrowser') > -1;
    return customElement;
});

