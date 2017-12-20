/**
 * @file mip-trueland-rem 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {

        var myRoot = document.documentElement;
        var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';

        function resizeFont() {
            var clientWidth = myRoot.clientWidth;
            myRoot.style.fontSize = (clientWidth / 3.75) + 'px';
        }

        window.addEventListener(resizeEvent, resizeFont, false);
        resizeFont();
        document.addEventListener('DOMContentLoaded', resizeFont, false);
    };

    return customElement;
});
