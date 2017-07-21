/**
 * @file mip-cnkang-sex 康网两性文章mip化
 * @author cnkang
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        $(document).ready(function (e) {
            var height = $(window).height() * 1.5;
            var boxheight = $('.p-details-box').height();
            var viewall = $('.viewall').height();
            var box2heihgt = height - viewall;
            if (boxheight > box2heihgt) {
                $('.p-details-box').height(box2heihgt);
                $('.p-details-box').css('overflow', 'hidden');
                $('.viewall').removeClass('hide');
                $('.linear').removeClass('hide');
            }
            $('.viewall').click(function () {
                $('.p-details-box').css('height', 'inherit');
                $('.viewall').addClass('hide');
                $('.linear').addClass('hide');
            });
            $('.close').click(function () {
                $('.bigbox').hide();
            });
        });
    };
    return customElement;
});
