/**
 * @file mip-shushi100-ajax 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('jquery');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var params = JSON.parse($(ele).attr('params').replace(/'/g, '"'));
        var url = $(ele).attr('url');
        $.post(url, params,
            function (data) {
                console.log(data);
            }, 'json');
    };

    return customElement;
});
