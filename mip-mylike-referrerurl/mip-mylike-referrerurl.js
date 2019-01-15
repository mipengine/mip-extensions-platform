/**
 * @file mip-mylike-referrerurl 组件
 * @author 55555
 */

define(function (require) {
    var customElement = require('customElement').create();
    // build说明: 统计来源功能，需首屏获取相关信息。
    customElement.prototype.build = function () {
        var element = this.element;
        var referrer = encodeURIComponent(document.referrer);
        var url = encodeURIComponent(document.URL);
        var img = document.createElement('img');
        var src = element.getAttribute('tj-src');
        src = src.replace('{{referrer}}', referrer).replace('{{url}}', url);
        img.src = src;
        img.style.display = 'none';
        element.appendChild(img);
    };

    return customElement;

});