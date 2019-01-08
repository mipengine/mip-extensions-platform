/**
 * @file mip-yuandun-page 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('url');
        var content = element.getAttribute('content');
        var container = element.getAttribute('container');
        var categoryId = $('.oncategory').attr('ydcategory');
        if (categoryId) {
            url = url + '&&categoryId=' + categoryId;
        }
        element.addEventListener('click', function () {
            $('#' + container).empty();
            $('#' + container).load(url + ' #' + content).fadeIn('fast');
        });
    };
    return customElement;
});
