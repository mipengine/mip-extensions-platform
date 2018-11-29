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
        var myContent = document.querySelector('.tab-product');
        var queryAll = document.querySelectorAll.bind(document);
        var $ = queryAll;
        var myMenu = $('.tab-li span');
        var unboundForEach = Array.prototype.forEach;
        var forEach = Function.prototype.call.bind(unboundForEach);

        forEach(myMenu, function (el) {
            el.addEventListener('click', function () {
                for (var i = 0; i < myMenu.length; i++) {
                    var menu = myMenu[i];
                    if (menu.className === 'menu-list') {
                        menu.className = 'menu-big';
                        myContent.classList.remove('product-bigImg');
                    } else {
                        menu.className = 'menu-list';
                        myContent.classList.add('product-bigImg');
                    }
                }
            });
        });
    };
    return customElement;
});
