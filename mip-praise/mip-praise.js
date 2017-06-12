/**
 * @file mip-praise 带有参数的点赞功能
 * @author youlai
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var constant = $('.constants').html();
    $.ajax({
            type: 'get',
            url: 'https://m.youlai.cn/video/miparticlepv?aid=' + constant + '&isload=isshow&' + new Date().getTime(),
            dataType: 'json',
            success: function (data) {
                $('.praise').children('span').text(data.likes);
                if (data.isclick) {
                    $('.praise').addClass('praiseon');
                }
            }
        });
    $('.praise').click(function () {
            if ($('.praise').hasClass('praiseon')) {
            } else {
                var b = $(this).children('span').text();
                var oText = parseFloat(b);
                $(this).addClass('praiseon');
                $(this).children('span').text(oText + 1);
                $.ajax({
                    type: 'get',
                    url: 'https://m.youlai.cn/video/miparticlepv?aid=' + constant + '&' + new Date().getTime(),
                    dataType: 'json',
                    success: function (data) {
                    }
                });
            }
        });
    customElement.prototype.build = function () {
    };
    return customElement;
});

