/**
 * @file mip-dz-component 组件
 * @author yxl
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        var updatesrc = ele.attr('update-src');
        var id = ele.attr('data-id');
        $.ajax({
            type: 'post',
            url: updatesrc,
            data: {
                'id': id
            },
            dataType: 'json',
            success: function (ret) {
                if (ret.state === 1) {
                    if (ele.find('.eye')) {
                        ele.find('.eye').html(ret.data.readNum + '次浏览');
                    }
                }
            }
        });
    };
    return customElement;
});