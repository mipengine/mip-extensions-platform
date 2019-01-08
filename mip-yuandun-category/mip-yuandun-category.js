/**
 * @file mip-yuandun-category 组件
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
        element.addEventListener('click', function () {
            $('.oncategory').removeClass('oncategory');
            $(element).addClass('oncategory');
            $('#' + container).empty();
            $('#' + container).load(url + ' #' + content).fadeIn('fast');
        });
    };
    return customElement;
});
