/**
 * @file mip-pc6-dif 组件
 * @author fl
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var e = this.element;
        var id = $('body').attr('cid');
        var cname = $(e).find('.ca');
        var div =  $(e).find('.dif');
        var ca = '';
        var num = 0;
        var newsUrl = 'https://m.pc6.com/pc.html';
        var ang = [634, 695, 594, 696, 697, 712, 598, 592, 596, 593, 595, 637, 713, 638, 636, 842];
        var anr = [588, 589, 584, 582, 583, 585, 586, 587, 590, 600, 703, 704, 708, 709, 875, 876,
        877, 878, 879, 880, 881, 628, 705, 706, 627, 599];
        var ig = [797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810];
        var ir = [776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791,
        792, 793, 794, 795];
        if (id) {
            t(ang, 0), t(anr, 1), t(ig, 2), t(ir, 3);
        }
        function t(t, e) {
            for (var o = 0; o < t.length; o++) {
                if (id.indexOf(t[o]) > -1) {
                    ca = e;
                    div.children('div').eq(ca).show().siblings().remove();
                    num++;
                }
            }
            if (ca === 0 || ca === 2) {
                cname.html('手游');
                newsUrl = 'https://m.pc6.com/article.html';
            }
            else if (ca === 1 || ca === 3) {
                cname.html('软件');
                newsUrl = 'https://m.pc6.com/jiaocheng.html';
            }
            if ($('.xgwz').length > 0) {
                var obj = $('.xgwz');
                if (obj.find('.d_title').length > 0) {
                    obj.find('.d_title span').remove();
                    obj.find('.d_title').prepend('<span><a href="https://m.pc6.com/pc.html">更多+</a></span>');
                    $('.xgwz').find('.d_title span a').attr('href', newsUrl);
                }
                else if (obj.find('.dtit').length > 0) {
                    obj.find('.dtit span').remove();
                    obj.find('.dtit').prepend('<span><a href="https://m.pc6.com/pc.html">更多+</a></span>');
                    $('.xgwz').find('span a').attr('href', newsUrl);
                }
            }
        }
        if (num === 0) {
            $('body').attr('show', 0);
        }
    };
    return customElement;
});
