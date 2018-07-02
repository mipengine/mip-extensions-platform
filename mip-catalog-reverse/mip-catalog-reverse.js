/**
 * @file mip-mipengine-reverse 给小说目录页逆序
 * @author caoru
 */

define(function (require) {
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // 给小说目录页（在组件外）逆序，需要操作组件外的dom结构，故必须要用全局选择
        var catalog = document.querySelectorAll('.catalog-li li');
        var arra = [];
        arra = Array.prototype.slice.call(catalog);
        this.element.addEventListener('click', function () {
            var ss = [];
            for (var i = 0; i < arra.length; i++) {
                ss[i] = arra[i].innerHTML;
            };

            for (var i = 0; i < ss.length; i++) {
                arra[i].innerHTML = ss[ss.length - 1 - i];
            };

        }, false);
    };
    return customElement;
});
