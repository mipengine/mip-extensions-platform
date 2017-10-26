/**
 * @file mip-shushi100-timeout 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('jquery');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var that = this;
        var $ele = $(this.element);
        var $target = $ele.find('.' + $ele.attr('target'));
        if (!$target) {
            return;
        }
        var ev = $ele.attr('ev') || 'click';
        var interval = $ele.attr('interval') || 3;

        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            $target.trigger(ev);
        }, interval * 1000);
    };
    return customElement;
});
