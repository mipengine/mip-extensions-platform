/**
 * @file zol广告组件
 * @author jiang.weiwei@zol.com.cn
 * @copyright www.zol.com.cn
 *
 */

define(function (require) {
    require('./ad');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var comment = document.createComment('AD');
        this.element.appendChild(comment);
        window._da_.render(comment, this.element.getAttribute('pid'));
    };
    return customElement;
});
