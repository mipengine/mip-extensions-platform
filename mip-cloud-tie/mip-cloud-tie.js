/**
 * @file mip-cloud-tie 组件
 * @author 点点
 */
define(function (require) {
    var i = require('customElement').create();
    return i.prototype.firstInviewCallback = function () {
        var i = this.element;
        var s = i.getAttribute('sourceId');
        var p = i.getAttribute('productKey');
        var t = i.getAttribute('target') || 'cloud-tie-wrapper';
        var u = i.getAttribute('url');
        var a = document.createElement('script');
        a.src = 'https://img1.cache.netease.com/f2e/tie/yun/sdk/loader.js';
        var r = ['var cloudTieConfig ={url:"' + u + '","sourceId:"'
        + s + '",productKey:"' + p + '",target:"' + t + '"};'].join('');
        var d = document.createElement('script');
        d.innerHTML = r;
        i.appendChild(d), i.appendChild(a);
    }, i;
});
