/**
 * @author: renyanwei
 * @date: 2017-05-10
 * @file: mip-tiantis-54kefu.js
 */

define(function (require) {
    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var currentElement = this.element;
        var token = currentElement.getAttribute('token') || '';

        var elescript = document.createElement('script');
        elescript.src = 'https://ui.tiantis.com/ThirdParty/service_54kefu?id=' + token;
        $('body').append(elescript);
    };

    return customElement;

});
