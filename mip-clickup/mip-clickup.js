/**
 * @file mip-clickup 康网链接点击记录
 * @author cnkang
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        $('.clickup').click(function () {
            var canshu = $('.canshu').html();
            var shuliang = parseFloat(10000000000000 * Math.random());
            $.ajax({url: 'https://m.cnkang.com/api/urlview?position=' + canshu + '&' + new Date().getTime() + shuliang});
        });
    };
    return customElement;
});
