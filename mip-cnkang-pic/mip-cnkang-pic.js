/**
 * @file mip-cnkang-pic 康网添加三张图片
 * @author cnkang
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var timestamp = new Date().getTime();
        var pictu = $('.pictu').html();
        $.ajax({
            type: 'GET',
            url: 'https://m.cnkang.com/ask/adlistmip/?issex=' + pictu + '&time = ' + timestamp,
            dataType: 'json',
            success: function (data) {
                $('#asknews').html(data.data);
            }
        });
    };
    return customElement;
});
