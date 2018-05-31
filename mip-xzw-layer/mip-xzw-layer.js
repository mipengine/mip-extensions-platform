

/**
* 星座屋mip改造
* @file 星座屋layer弹层组件
* @author mipxzw@163.com
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var xzw = {
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

                    $('.wrapper').addClass('blur');
                    $('html').addClass('look');
                },
                layerHide: function () {
                    var A = $('.m_layer');
                    A.fadeOut(400, function () {
                        $(A).hide();
                    });
                    $('.wrapper').removeClass('blur');
                    $('html').removeClass('look');
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
                    });

                }
            }
        };

        xzw.fun.setpTops();

    };
    return customElement;
});
