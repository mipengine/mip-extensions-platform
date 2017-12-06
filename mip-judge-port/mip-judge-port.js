/**
 * @file mip-judge-port 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            if (ele.getAttribute('ios') === '') {
                ele.setAttribute('href', ele.getAttribute('game'));
            } else {
                ele.setAttribute('href', ele.getAttribute('ios'));
            }
        } else if (/android/.test(ua)) {
            if (ele.getAttribute('an') === '') {
                ele.setAttribute('href', ele.getAttribute('game'));
            } else {
                ele.setAttribute('href', ele.getAttribute('an'));
            }
        }
        ele.addEventListener('click', function (event) {
            window.location.href = this.getAttribute('href');
        });
    };
    return customElement;
});
