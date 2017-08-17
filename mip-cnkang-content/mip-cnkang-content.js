/**
 * @file mip-cnkang-content 区分cnkang两性和非两性
 * @author ankang
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var canshu = $('.canshu1').html();
        if (canshu !== '1') {
            $('.show1').hide();
            $('.xiahua').hide();
            $('.baikuang').css('margin-top', '-0.04rem');
        }
        if (canshu === '1') {
            $('.centergao').hide();
        }
    };
    return customElement;
});
