/**
 * @file mip-25game-tabsplit 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var element = this.element;
        var tab = element.getAttribute('tab');
        var split = element.getAttribute('split');
        var tabArray = tab.split(split);
        var type = element.getAttribute('type');
        var html = '';
        for (var i = 0; i < tabArray.length; i++) {
            html = html + '<' + type + '>' + tabArray[i] + '</' + type + '>';
        }
        element.innerHTML = html;
    };
    return customElement;
});
