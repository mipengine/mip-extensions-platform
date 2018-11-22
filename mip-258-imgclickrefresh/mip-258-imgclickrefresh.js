/**
 * @file mip-258-imgclickrefresh 组件
 * @author hongzequan
 * @mail hongzequan@258.com
 */

define(function (require) {
    var customElement = require('customElement').create();

    var obj = document.querySelector('mip-img');
    if (obj) {
        var src = obj.getElementsByTagName('img')[0].src;
        obj.addEventListener('click', function () {
            this.setAttribute('src', '');
            this.setAttribute('src', src);
        });
    }
    customElement.prototype.firstInviewCallback = function () {

    };
    return customElement;
});
