/**
 * @file mip-mipengine-reverse 给小说目录页逆序
 * @author caoru
 */

define(function (require) {
    var customElement = require('customElement').create();

    /**
     * 绑定排序方法，为了页面效果更好，需要提前加载
     */
    customElement.prototype.build = function () {
        var hasName = false;
        // 给小说目录页（在组件外）逆序，需要操作组件外的dom结构，故必须要用全局选择
        var catalog = document.querySelectorAll('.catalog-li li');
        if (this.element.querySelector('.reverse-name')) {
            var reverseName = this.element.querySelector('.reverse-name');
            hasName = true;
        }
        var arra = [];
        arra = Array.prototype.slice.call(catalog);
        this.element.addEventListener('click', function (e) {
            e.stopPropagation();
            if (hasName) {
                reverseName.innerHTML = reverseName.innerHTML === '正序' ? '倒序' : '正序';
            }
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