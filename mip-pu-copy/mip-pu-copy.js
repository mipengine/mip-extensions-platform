/**
 * @file mip-pu-copy 组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        function copy(str) {
            var save = function (e) {
                e.clipboardData.setData('text/plain', str);
                e.preventDefault();
            };
            document.addEventListener('copy', save);
            document.execCommand('copy');
        }
        ele.addEventListener('click', function (ev) {
            copy(ev.target.getAttribute('hhh'));
        });
    };
    return customElement;
});
