/**
 * @file mip-ppkao-rotate 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        ele.addEventListener('click', function () {
            var rotateDeg = ele.dataset.rotate ? ele.dataset.rotate : '90deg';
            if (ele.classList.contains('active')) {
                ele.classList.remove('active');
                ele.style.transform = 'rotate(0)';
            } else {
                ele.classList.add('active');
                ele.style.transform = 'rotate(' + rotateDeg + ')';
            }
        }, false);
    };

    return customElement;
});
