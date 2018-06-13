/**
 * @file mip-yesky-tbad 引入淘宝组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        // if (document.domain !== 'm.baidu.com') {
        var e = this.element;
        var p = e.getAttribute('pid');
        e.innerHTML = '<a style="display:none!important" id="tanx-a-mm_' + p + '"></a>';
        var d = document.createElement('script');
        d.type = 'text/javascript';
        d.charset = 'gbk';
        d.id = 'tanx-s-mm_' + p;
        d.async = true;
	// 淘宝组件说明:引入淘宝广告，为网站引流，服务提供商阿里妈妈
        d.src = 'https://p.tanx.com/ex?i=mm_' + p;
        var h = document.getElementsByTagName('head')[0];
        if (h) {
            h.insertBefore(d, h.firstChild);
        }
        // }
    };
    return customElement;
});
