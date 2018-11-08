/**
 * 切换样式组件
 *
 * @author wangsha@mail.china.cn
 *
 * @file mip-chinacn-tabs 组件
 */
define(function (require) {
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;
        var myMenu = element.querySelector('span');
        var myContent = document.querySelector('.tab-product');
        myMenu.addEventListener('click', function () {
            if (myMenu.className === 'menu-list') {
                myMenu.className = 'menu-big';
                myContent.classList.remove('product-bigImg');
            } else {
                myMenu.className = 'menu-list';
                myContent.classList.add('product-bigImg');
            };
        });
    };
    return customElement;

});
