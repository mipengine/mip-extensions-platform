/**
 * @file mip-onga 组件
 * @author
 */

define(function (require) {
    var ga;
    var $ = require('jquery');
    require('https://c.mipcdn.com/static/v1/mip-jzbga/mip-jzbga.js');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        var parent = ele.parent();
        parent.click(function () {
            var text = parent.attr('data-text');
            ga('send', 'event', 'm_newad', '引导', text);
        });
    };

    return customElement;
});
