/**
 * @file mip-tanx 组件
 * @author 点点
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */

    customElement.prototype.firstInviewCallback = function () {
        if (document.domain !== 'm.baidu.com') {
            var e = this.element;
            var p = e.getAttribute('pid');
            e.innerHTML = '<a style="display:none!important" id="tanx-a-mm_' + p + '"></a>';
            var d = document.createElement('script');
            d.type = 'text/javascript';
            d.charset = 'gbk';
            d.id = 'tanx-s-mm_' + p;
            d.async = true;
            d.src = 'https://p.tanx.com/ex?i=mm_' + p;
            var h = document.getElementsByTagName('head')[0];
            if (h) {
                h.insertBefore(d, h.firstChild);
            }
        // TODO
        }
    };
    return customElement;
});
