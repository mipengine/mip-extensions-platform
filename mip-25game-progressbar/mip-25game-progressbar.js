/**
 * @file mip-25game-progressbar 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var height = element.getAttribute('height');
        var progress = element.getAttribute('progress');
        var color = element.getAttribute('color');
        var bgcolor = element.getAttribute('bgcolor');
        element.setAttribute('style', 'width : 100%; height : ' + height + 'px; background-color : ' + bgcolor + '; ');
        var html = '<div style="z-index : 2; width : ' + progress + '%; height : ';
        html = height + html + 'px; background-color : ' + color + '; "></div>';
        element.innerHTML = html;
    };

    return customElement;
});
