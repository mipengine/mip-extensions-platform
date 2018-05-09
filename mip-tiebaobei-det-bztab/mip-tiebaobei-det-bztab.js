/**
 * @file mip-tiebaobei-det-bztab 组件
 * @author weiss
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $ = require('zepto');
        var ele = $(this.element);
        var box = ele.find('#fidelityBox');
        var tjbbox = ele.find('.tjbMask');
        box.on('click', '.btn', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var idx = $(this).index();
            $(this).addClass('selected').siblings().removeClass('selected');
            box.find('.solgan li').eq(idx).addClass('act').siblings().removeClass('act');
        });
        box.find('.btn').eq(0).addClass('selected');
        box.find('.solgan li').eq(0).addClass('act');
        // 保真-更多按钮
        box.on('click', '.tjbMore', function (e) {
            e.preventDefault();
            e.stopPropagation();
            tjbbox.show();
        });
        tjbbox.on('touchmove', function () {
            return false;
        });
        // 铁甲保弹层关闭
        tjbbox.on('click', '.tjbClose', function () {
            tjbbox.hide();
        });
    };
    return customElement;
});
