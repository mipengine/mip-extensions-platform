/**
 * @file mip-lezun 乐樽广告联盟组件
 * @author 点点
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var e = this.element;
        var z = e.getAttribute('adz_id');
        var q = document.createElement('script');
        q.src = 'https://www.hxyifu.com/title/' + z;
        e.appendChild(q);
    };

    return customElement;
});
