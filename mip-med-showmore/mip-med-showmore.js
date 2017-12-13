/**
 * @file mip-message 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        // 获取当前组件dom
        var element = this.element;
        // 获取展现list个数
        var len = element.getAttribute('maxLength');

        // 获取最近的子节点
        var getChildren = function (obj) {
            var objChild = [];
            var objs = obj.getElementsByTagName('*');
            for (var i = 0,
                    j = objs.length; i < j; ++i) {
                if (objs[i].nodeType !== 1) {
                    alert(objs[i].nodeType);
                    continue;
                }
                var temp = objs[i].parentNode;
                if (temp.nodeType === 1) {
                    if (temp === obj) {
                        objChild[objChild.length] = objs[i];
                    }
                }
                else if (temp.parentNode === obj) {
                    objChild[objChild.length] = objs[i];
                }
            }
            return objChild;
        };

        // 获取元素
        var listWrap = element.querySelectorAll('.med-showmore-wrap')[0];
        var listInner = getChildren(listWrap);
        var clickBtn = document.querySelector('.med-showmore-btn');

        var forList = function (display) {
            for (var i = 0; i < listInner.length; i++) {
                if (i > len - 1) {
                    listInner[i].style.display = display;
                }
            }
        };

        // 显示展开更多
        if (listInner.length > len) {
            clickBtn.style.display = 'block';
            forList('none');
        }

        // 点击展开
        clickBtn.addEventListener('click', function () {
            forList('block');
            clickBtn.style.display = 'none';
        }, false);

    };
    return customElement;
});
