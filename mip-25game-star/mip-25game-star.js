/**
 * @file mip-25game-star 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var element = this.element;
        var sum = element.getAttribute('sum');
        var total = element.getAttribute('total');
        if (total == null || total === '') {
            total = 5;
        }
        var color = element.getAttribute('color');
        var bgcolor = element.getAttribute('bgcolor');
        if (bgcolor == null || bgcolor === '') {
            bgcolor = '#cccccc';
        }
        var size = element.getAttribute('size');
        if (sum == null || sum === '') {
            sum = 0;
        }
        var star1 = '';
        for (var i = 0; i < sum; i++) {
            star1 = star1 + '&#9733;';
        }
        var star2 = '';
        for (var i = 0; i < (total - sum); i++) {
            star2 = star2 + '&#9733;';
        }
        var html = '<span style="color:' + color + ';font-size:' + size + ';">' + star1 + '</span>';
        html = html + '<span style="color:' + bgcolor + ';font-size:' + size + ';">' + star2 + '</span>';
        element.innerHTML = html;
    };

    return customElement;
});
