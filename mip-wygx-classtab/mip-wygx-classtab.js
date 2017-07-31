/**
 * @file mip-wygx-classtab 组件.
 * @author east_qiu@gmail.com.
 * @version 1.0.2
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var ele = this.element; // 获取根节点
        var bdEle = []; // 类储存器
        var bindToClassname = ele.getAttribute('bind-to'); // 获取需要绑定节点
        var bindElements = $(bindToClassname);

        // 根元素绑定事件
        ele.addEventListener('click', function (e) {

            // 判断点击节点
            if (e.target.nodeName !== this.nodeName) {
                var bindToClassname = e.target.getAttribute('toggle-class');

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
