/**
 * @file mip-shushi100-toggle 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var that = this;
        var ele = this.element;
        var target = document.querySelector('.' + ele.getAttribute('target'));
        if (!target) {
            return;
        }

        ele.addEventListener('click', function () {
            if (that._hasClass(target, 'toggle-show')) {
                target.className = target.className.replace(' toggle-show', '');
            } else {
                target.className += ' toggle-show';
            }
        }, false);
    };

    customElement.prototype._hasClass = function (element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    };

    return customElement;
});
