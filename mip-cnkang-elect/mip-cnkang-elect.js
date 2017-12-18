/**
 * @file mip-cnkang-elect 康网下拉列表点选组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var touch = document.getElementById('touch_page');
        var url = $('#dian').attr('href');
        touch.onchange = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var fu = $('.fuhao').html();
            url += (this.value + fu);
            $('#dian').attr('href', url);
            $('#dian').click();
        };
    };
    return customElement;
});
