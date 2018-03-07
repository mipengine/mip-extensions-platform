/**
 * @file mip-xilu-ad 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var me = this;
        var el = this.element;
        var adtype = el.getAttribute('type');
        var token = el.getAttribute('token');
        var $element = $(el);

        switch (adtype) {
            case 'taobao':
                taobaoAd($element, me, token);
                break;
        }
    };

    // 淘宝
    function taobaoAd($element, me, token) {
        var appendtxt = $('<a style="display:none!important" id="tanx-a-mm_34617634_3494431_' + token + '"></a>');
        $element.append(appendtxt);
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = 'https://p.tanx.com/ex?i=mm_34617634_3494431_' + token;
        node.async = 'true';
        node.id = 'tanx-s-mm_34617634_3494431_' + token;

        $element.append(node);
        me.applyFillContent(node, true);
    }

    return customElement;
});
