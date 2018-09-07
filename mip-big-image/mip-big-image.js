/**
 * @file mip-big-image 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
    };
    $('.mip-big-image-mickey').on('click', function () {
        var src = $(this).attr('src');
        var w = window.screen.width;
        var h = window.screen.height;
        $('body').append('<div id="mip-big-image-mickey-box"><img src=""></img></div>');
        $('#mip-big-image-mickey-box').css({'text-align': 'center', 'display': 'none'});
        $('#mip-big-image-mickey-box').css({
            'width': '100%',
            'height': h + 'px',
            'line-height': h + 'px',
            'background': 'rgba(0,0,0,1)',
            'position': 'fixed',
            'top': '0',
            'left': '0'
        });
        $('#mip-big-image-mickey-box img').attr('src', src).css({'margin': '0', 'vertical-align': 'middle'});

        $('#mip-big-image-mickey-box img').each(function () {
            $(this).on('load', function () {
                var imgH = $(this).height();
                if (imgH <= h) {
                    $('#mip-big-image-mickey-box img').css({'width': '100%', 'max-width': '1200px', 'height': 'auto'});
                } else {
                    $('#mip-big-image-mickey-box img').css({'width': 'auto', 'height': 0.8 * h + 'px'});
                }
            });
        });

        $('#mip-big-image-mickey-box').css({'display': 'block'});

        $('#mip-big-image-mickey-box').on('click', function () {
            $('#mip-big-image-mickey-box').css({'display': 'none'});
            $('#mip-big-image-mickey-box').remove();
        });
    });
    return customElement;
});
