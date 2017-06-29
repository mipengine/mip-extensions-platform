/**
 * @file mip-gallery 康网图库链接
 * @author cnkang
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var prev = $('.data_page_prev').html();
        var next = $('.data_page_next').html();
        var prevurl = $('.data_article_prev_url').html();
        var nexturl = $('.data_article_next_url').html();
        var AIYUE = $('.HOST_SITE_AIYUE').html();
        var MIP = $('.HOST_SITE_TUKU_MIP').html();
        var lianjie = '<a href = ' + MIP + AIYUE + '/view/' + prev + '></a>';
        var lianjie1 = '<a href = ' + MIP + nexturl + '></a>';
        var lianjie2 = '<a href = ' + MIP + prevurl + '></a>';
        var lianjie3 = '<a href = ' + MIP + AIYUE + '/view/' + next + '></a>';
        if (!next) {
            var wrapEles = $('<div class = jump>' + lianjie + '</div><div class=jump>' + lianjie1 + '</div>');
        } else if (!prev) {
            var wrapEles = $('<div class = jump >' + lianjie2 + '</div><div class = jump>' + lianjie3 + '</div>');
        } else {
            var wrapEles = $('<div class = jump >' + lianjie + '</div><div class = jump>' + lianjie3 + '</div>');
        }
        $('.detail03').find('mip-img').before(wrapEles).removeAttr('style').css('height', 'auto');
        $('.jump').eq(0).addClass('left');
        $('.jump').eq(1).addClass('right');
        $(function () {
            $('#detail03 mip-img').removeAttr('style');
            $('#detail03 mip-img').css('height', 'auto');
        });
    };
    return customElement;
});
