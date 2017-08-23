/**
 * @file mip-pc6-touchslide 组件
 * @author fl
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var e = this.element;
        var num = $(e).attr('num');
        num = (num) ? num : 8;
        var len = $(e).find('.tags-main-ul li').length;
        var page = Math.ceil(len / num);
        var c = {s: [], d: ''};
        var u = 0;
        if (len === 0) {
            $(e).remove();
        }
        else {
            if (len < num) {
                $(e).find('.pagenum').remove();
            }
            for (var i = 0; i < page; i++) {
                var htm = '<div class="tags-main-box"><ul class="tags-box-ul"></ul></div>';
                $(e).find('.tags-main-ul > li').slice(0, num).wrapAll(htm);
            }
        }
        var r = $(e).find('.tags-main-ul');
        var o = r.find('.tags-main-box');
        var a = '<span class="active"></span>';
        var l = parseInt($(e).find('.touchslide').width(), 10);
        // 初始宽度
        o.width(l);
        r.width(o.length * o.width());
        // 循环输出分页
        for (var d = 1; d < o.length; d++) {
            a += '<span></span>';

        }
        $(e).find('.pagenum').html(a);
        // 滑动
        r[0].addEventListener('touchstart', function (t) {
            c.s[0] = t.targetTouches[0].pageX,
                c.s[1] = t.targetTouches[0].pageY,
                c.s[2] = (new Date()).getTime();
        });
        r[0].addEventListener('touchmove', function (t) {
            var n1 = Math.abs(t.targetTouches[0].pageX - c.s[0]);
            var n2 = Math.abs(t.targetTouches[0].pageY - c.s[1]);
            if (n1 >= n2 && '' === c.d) {
                c.d = 1;
            }
            else if ('' === c.d) {
                c.d = 0;
            }
            if (1 === c.d) {
                var w = -(l * u - t.targetTouches[0].pageX + c.s[0]);
                t.preventDefault(), r.css({
                    '-webkit-transform': 'translate3d(' + w + 'px, 0px, 0px)'
                });
            }
        });
        r[0].addEventListener('touchend', function (e) {
            if (1 === c.d) {
                if ((new Date()).getTime() - c.s[2] > 700) {
                    if (e.changedTouches[0].pageX - c.s[0] > l / 3) {
                        t('right');
                    }
                    else if (c.s[0] - e.changedTouches[0].pageX > l / 3) {
                        t('left');
                    }
                    else {
                        t('reset');
                    }
                }
                else if (e.changedTouches[0].pageX > c.s[0]) {
                    t('right');
                }
                else if (c.s[0] > e.changedTouches[0].pageX) {
                    t('left');
                }
            }
            c.d = '';
        });
        function t(t) {
            if ('left' === t) {
                u >= o.length - 1 ? o.length : u++, r.animate({
                    '-webkit-transform': 'translate3d(' + -l * u + 'px, 0px, 0px)'
                });
            }
            else if ('reset' === t) {
                r.animate({
                    '-webkit-transform': 'translate3d(' + -l * u + 'px, 0px, 0px)'
                });
            }
            else if ('right' === t) {
                u <= 0 ? u = 0 : u--, r.animate({
                    '-webkit-transform': 'translate3d(' + -l * u + 'px, 0px, 0px)'
                });
            }

            b();
            $(e).find('.pagenum span').eq(u).addClass('active').siblings().removeClass('active');
        }
        function b() {
            setTimeout(function () {
                $('body').scrollTop($('body').scrollTop() + 1).scrollTop($('body').scrollTop() - 1);
            }, 150);
        }
    };
    return customElement;
});
