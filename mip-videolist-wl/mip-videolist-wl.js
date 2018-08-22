/**
 * @file mip-videolist-wl 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        var vid = ele.find('.data-read');
        var vidlength = vid.length;
        var url = ele.attr('data-src');
        var ids = [];
        if (vidlength > 0) {
            for (var i = 0; i < vidlength; i++) {
                ids.push(vid.eq(i).attr('data-id'));
            }
        }
        $.ajax({
            type: 'post',
            url: url,
            data: {ids: ids},
            dataType: 'json',
            success: function (ret) {
                if (ret.state === 1) {
                    $.each(ret.data, function (k, v) {
                        ele.find('#item-read' + k).html(v.readNum + '播放');
                    });
                }
            }
        });
    };
    return customElement;
});