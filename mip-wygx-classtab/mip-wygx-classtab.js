/**
 * @file mip-wygx-classtab 组件.
 * @author east_qiu@gmail.com.
 * @version 1.1.0
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    // 需要样式切换的节点和类名
    function toggleCls(node, classname) {
        node.classList.add(classname);
        $(node).siblings().removeClass(classname);
    }
    customElement.prototype.build = function () {
        var ele = this.element; // 获取根节点
        var bdEle = []; // 类储存器
        var bindToClassname = ele.getAttribute('bind-to'); // 获取需要绑定节点
        var buttonClass = ele.getAttribute('botton-class'); // 获取需要绑定节点
        var activeClass = ele.getAttribute('active-class'); // 获取需要绑定节点
        var bindElements = $(bindToClassname);

        // 如果需要激活的类名存在，进行子元素遍历,增加按钮的初始状态
        if (activeClass) {
            // 元素增加初始类名
            bindElements.addClass(activeClass);
            // 按钮设置初始样式
            var child = $(ele).children();
            for (var i = 0; i < child.length; i++) {
                var toggleClass = $(child[i]).attr('toggle-class');
                if (toggleClass === activeClass) {
                    $(child[i]).addClass(buttonClass);
                }
            }
        }

        // 根元素绑定事件
        ele.addEventListener('click', function (e) {

            // 判断点击节点
            if (e.target.nodeName !== this.nodeName) {
                var bindToClassname = e.target.getAttribute('toggle-class');
                // 如果按钮初始样式存在
                if (buttonClass) {
                    toggleCls(e.target, buttonClass);
                }
                // 清空记录方便下次储存
                if (bdEle.length > 0) {
                    bindElements.removeClass(bdEle.join(',')); // 移除上次样式
                }

                bdEle = [];
                bindElements.addClass(bindToClassname); // 添加样式
                bdEle.push(bindToClassname);
            }
        });
    };
    return customElement;
});
