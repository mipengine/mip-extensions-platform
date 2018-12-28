/**
 * @file mip-ydpage 组件
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
        let categoryId = $('.oncategory').attr('ydcategory');
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
