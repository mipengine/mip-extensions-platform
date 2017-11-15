/**
 * @file mip-xiaojp-display 点击组件，可根据传递的data-type类型，打开或者 关闭 目标dom;
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var targetIdname = ele.getAttribute('target-idname');
        var dataType = ele.getAttribute('data-type');
        if (targetIdname !== null) {
            if (targetIdname.length > 0) {
                var targetDom = document.getElementById(targetIdname);
                targetDom.classList.add('mip-xiaojp-display');
                switch (dataType) {
                    case 'hide':
                        ele.addEventListener('click', function () {
                            targetDom.classList.remove('show');
                            targetDom.classList.add('hide');
                        });
                        break;
                    case 'toggle':
                        ele.addEventListener('click', function () {
                            targetDom.classList.toggle('show');
                        });
                        break;
                    default:
                        ele.addEventListener('click', function () {
                            targetDom.classList.remove('hide');
                            targetDom.classList.add('show');
                        });
                }
            }
        }
    };
    return customElement;
});
