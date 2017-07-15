/**
 * @file mip-fn-width 组件
 * @author fn
 * @modify fn 200170626
 */
define(function (require) {
    var customElem = require('customElement').create();

    customElem.prototype.build = function () {
        var ele = this.element;
        var child = ele.childNodes;
        var childArr = [];
        var w = 0;
        for (var i = 0; i < child.length; i++) {
            if (child[i].nodeType === 1) {
                childArr.push(child[i]);
            }
        }
        for (var i = 0; i < childArr.length; i++) {
            var marginWidth = parseInt(getComputedStyle(childArr[i], null).marginRight, 0);
            w = w + childArr[i].offsetWidth + marginWidth;
        }
        ele.style.width = w + 'px';
    };
    return customElem;
});

