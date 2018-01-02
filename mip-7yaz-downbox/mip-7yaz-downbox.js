/**
 * @file mip-7yaz-downbox 组件
 * @author 趣游小强
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var el = this.element;
        el.addEventListener('click', function () {
            var DialogBody = document.getElementById('DialogBody');
            DialogBody.innerHTML = '数据加载中...';
            var size = el.getAttribute('size');
            var arr = el.getAttribute('links').split('|');
            var html = '';
            for (var i = 0; i < arr.length; i++) {
                var arrdetail = arr[i].split('#');
                html += '<li><a href=\'' + arrdetail[1] + '\' rel=\'nofollow\' target=\'_blank\'>';
                html += arrdetail[0] + '(' + size + ')</a></li>';
            }
            DialogBody.innerHTML = html;
        });
    };

    return customElement;
});
