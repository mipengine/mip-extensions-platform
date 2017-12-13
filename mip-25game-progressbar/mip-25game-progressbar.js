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
        if (height == null || height === '') {
            height = 5;
        }
        var progress = element.getAttribute('progress');
        var color = element.getAttribute('color');
        if (color == null || color === '') {
            color = '#3BAFDA';
        }
        var bgColor = element.getAttribute('bgcolor');
        if (bgColor == null || bgColor === '') {
            bgColor = '#E2E2E2';
        }
        var radius = element.getAttribute('radius');
        if (radius == null || height === '') {
            radius = 0;
        }
        var html = 'width : 100%; height : ' + height + 'px;';
        html = html + ' background-color : ' + bgColor + '; border-radius: ' + radius + 'px;';
        element.setAttribute('style', html);
        html = '<div style="width : ' + progress + '%; height : ';
        html = html + height + 'px; border-radius: ' + radius + 'px;';
        html = html + ' background-color : ' + color + '; "></div>';
        element.innerHTML = html;
    };

    return customElement;
});
