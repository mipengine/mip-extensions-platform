/**
 * @file mip-51la 组件
 * @author 点点
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.createdCallback = function () {
        // TODO
        var e = this.element;
        var s = e.getAttribute('sid');
        var d = document.createElement('script');
        d.src = 'https://js.users.51.la/' + s + '.js';
        e.appendChild(d);
    };

    return customElement;
});
