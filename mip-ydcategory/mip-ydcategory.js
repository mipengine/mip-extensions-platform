/**
 * @file mip-ydcategory 组件
 * @author
 */

define(function (require) {
    let $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        let element = this.element;
        let url = element.getAttribute('url');
        let content = element.getAttribute('content');
        let container = element.getAttribute('container');
        element.addEventListener('click', function () {
            $('.oncategory').removeClass('oncategory');
            $(element).addClass('oncategory');
            $('#' + container).empty();
            $('#' + container).load(url + ' #' + content).fadeIn('fast');
        });
    };
    return customElement;
});
