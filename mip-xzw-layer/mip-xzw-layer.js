
/**
* 星座屋mip改造
* @file 星座屋layer弹层组件
* @author mipxzw@163.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var xzw = {
            data: {
                xz: [
                    ['aries', '白羊'], ['taurus', '金牛'], ['gemini', '双子'],
                    ['cancer', '巨蟹'], ['leo', '狮子'], ['virgo', '处女'], ['libra', '天秤'], ['scorpio', '天蝎'],
                    ['sagittarius', '射手'], ['capricorn', '摩羯'], ['aquarius', '水瓶'], ['pisces', '双鱼']],
                sx: [
                    ['mouse', '鼠'], ['cattle', '牛'], ['tiger', '虎'], ['rabbit', '兔'], ['Loong', '龙'],
                    ['snake', '蛇'], ['horse', '马'], ['sheep', '羊'], ['monkey', '猴'],
                    ['chicken', '鸡'], ['dog', '狗'], ['pig', '猪']]
            },
            fun: {
                layerShow: function (f) {
                    if (!$('.m_layer').length) {
                        $('.wrapper').append('<div class="m_layer"></div>');
                    }

                    var A = $('.m_layer');
                    A.fadeIn(400).on('touchmove', function (e) {
                        e.preventDefault();
                    });
                    if (f && typeof (f) === 'function') {
                        A.click(function (e) {
                            f();
                        });
                    }

                },
                layerHide: function () {
                    var A = $('.m_layer');
                    A.fadeOut(400, function () {
                        $(A).hide();
                    });
                },
                bSelShow: function (f) {
                    xzw.fun.layerShow(function () {
                        xzw.fun.bSelHide();
                    });
                    var A = $('.float_sbox');
                    A.on('touchmove', function (e) {
                        e.preventDefault();
                    });
                    A.show();
                    A.animate({
                        bottom: 0
                    }, 400);
                    f && typeof (f) === 'function' ? f() : '';
                },
                bSelHide: function () {
                    var A = $('.float_sbox');
                    A.animate({
                        bottom: -A.height()
                    }, 400, function () {
                        $(A).hide();
                    });
                    xzw.fun.layerHide();
                },
                setpTops: function () {
                    var E = $('.title');
                    E.click(function () {
                        xzw.fun.bSelShow();
                        $(this).addClass('active').siblings().removeClass('active');
                        $('.float_sbox li').click(function () {
                            var url = $(this).parent().attr('url');
                            var type = $(this).parent().attr('type');
                            var i = $(this).index();
                            xzw.fun.bSelHide();
                            if (type === '1') {
                                window.location.href = url.replace('[aid]', xzw.data.xz[i][0]); // 星座
                            }
                            else if (type === '2') {
                                window.location.href = url.replace('[aid]', xzw.data.sx[i][0]); // 生肖
                            }
                            else if (type === '3') {
                                var p = $('.pair li.active');
                                var imgurl = p.attr('imgurl').replace('[aid]', i + 1);
                                p.data('id', i + 1);
                                $('mip-img', p).attr('src', imgurl);
                                $('span.name', p).html($('span', $(this)).html());
                            }

                        });
                    });
                    $('.pair_btn').click(function () {
                        var url = $(this).data('url');
                        url = url.replace('[aid]', $('.pair1').data('id')).replace('[bid]', $('.pair2').data('id'));
                        window.location.href = url; // 配对
                    });
                }
            }
        };

        xzw.fun.setpTops();

    };
    return customElement;
});
