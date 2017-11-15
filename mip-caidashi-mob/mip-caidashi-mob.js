/**
 * @file mip-caidashi-mob 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        var url = location.href;
        var src = ele.getAttribute('src');
        var mobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i);
        if ((url.indexOf(src) !== -1) && mobile == null) {
            var newUrl = url.replace('http://m', 'http://www');
            location.href = newUrl;
        }
    };

    return customElement;
});
