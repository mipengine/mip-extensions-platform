/**
 * @file mip-258-imgclickrefresh 组件
 * @author hongzequan
 * @mail hongzequan@258.com
 */

define(function (require) {
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var obj = document.querySelector('mip-img');
        var src = obj.getElementsByTagName('img')[0].src;
        obj.addEventListener('click', function () {
            this.setAttribute('src', '');
            this.setAttribute('src', src);
        });
    };
    return customElement;
});
