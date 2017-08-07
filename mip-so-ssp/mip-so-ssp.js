/**
 * @file mip-so-ssp 组件
 * @author 点点
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var e = this.element;
        var id = e.getAttribute('id');
        var dom = e.getAttribute('dom');
        var tagsA = $(dom).find('a');
        var tagsLen = tagsA.length;
        for (var i = 0; i < tagsLen; i++) {
            var obj = $(tagsA[i]);
            var val = obj.text();
            obj.attr('href', 'https://www.so.com/s?src=lm&ls=' + id + '&lm_extend=ctype:4&q=' + val);
        }
        // TODO
    };

    return customElement;
});
