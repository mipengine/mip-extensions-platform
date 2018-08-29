/**
 * @file mip-apple-nav 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var navShowing = false;
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;

        $('body').append('<div class="mip-apple-nav-maskLayer"></div>');
        $(element).find('.navbar-toggle').on('click', function () {
            if (!navShowing) {
                $(element).find('#mobileNavList').css({'display': 'block', 'height': window.screen.height + 'px'});
                $('.mip-apple-nav-maskLayer').css({'display': 'block'});
                $(element).find('#mobileNavList').animate({
                        'width': '100%'
                    },
                    100, function () {
                        navShowing = true;
                    });
            } else {
                $(element).find('#mobileNavList').animate({
                        'width': '0'
                    },
                    100, function () {
                        $(element).find('#mobileNavList').css({'display': 'none'});
                        $('.mip-apple-nav-maskLayer').css({'display': 'none'});
                        navShowing = false;
                    });
            }
        });
        $('body').find('.mip-apple-nav-maskLayer').on('click', function () {
            $(element).find('#mobileNavList').animate({
                    'width': '0'
                },
                100, function () {
                    $(element).find('#mobileNavList').css({'display': 'none'});
                    $('.mip-apple-nav-maskLayer').css({'display': 'none'});
                    navShowing = false;
                });
        });
    };

    return customElement;
});
