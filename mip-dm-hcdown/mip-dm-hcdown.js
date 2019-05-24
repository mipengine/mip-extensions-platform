/**
 * @file mip-dm-hcdown 组件
 * @author lls
 */
define(function (require) {
    var customElement = require('customElement').create();
    var i = require('zepto');
    var u = require('util');
    var c = u.platform;
    customElement.prototype.build = function () {
        var e = i(this.element);
        var g = function (s, c) {
            if (/苹果iOS系统|ipad|ipod|iPhone/i.test(s) && c.isIos()) {
                return true;
            } else if (/android|Android|安卓/i.test(s) && c.isAndroid()) {
                return true;
            } else {
                return false;
            }
        };
        var n = e.find('.dctext');
        if (n.is('div')) {
            if (n.height() < 120) {
                e.find('.dcopera').hide();
                n.addClass('bottom_line');
            }
        }
        e.find('.dcopera').click(function () {
            if ('展开' === i(this).find('a').html()) {
                n.css('max-height', 'inherit');
                i(this).find('a').addClass('dhide').html('收起');
            } else {
                n.css('max-height', '120px');
                i(this).find('a').removeClass('dhide').html('展开');
            }
        });
        var a = e.find('.down-top table a').attr('href');
        var f = false;
        e.find('.down-top table a').each(function (k, val) {
            if (2628 % i(val).attr('down-type') === 10 && c.isAndroid()) {
                f = true;
                a = i(val).attr('href');
            }
            if (i(val).attr('down-type') === '15' && c.isIos()) {
                f = true;
                a = i(val).attr('href');
            }
        });
        var s = e.find('span.dmess p:eq(3)').text();
        var x = 'http://www.huacolor.com/static/wdj520.html';
        if (g(s, c) || f) {
            e.find('.xzdzad').before('<div class="newBox"><div class="topBox"><a href="' + a
			+ '" class="downonclick" data-id="' + i('.down-top table a').attr('data-id')
			+ '" data-cid="' + i('.down-top table a').attr('data-cid')
			+ '">立即下载</a></div><div class="normal"><div class="main"></div></div></div>');
        } else if (c.isAndroid()) {
            e.find('.xzdzad').before('<div class="newBox"><div class="topBox"><a href="' + x
			+ '" class="downonclick">立即下载</a></div><div class="normal"><div class="main"></div></div></div>');
        } else if (c.isIos()) {
            e.find('.xzdzad').before('<div class="newBox"><div class="topBox"><a class="downnone">暂无下载'
			+ '</a></div><div class="normal"><div class="main"></div></div></div>');
        }
    };
    return customElement;
});