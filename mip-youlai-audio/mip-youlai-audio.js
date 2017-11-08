/**
 * @file mip-youlai-audio  有来音频组件
 * @author youlai
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var biaoqian = document.createElement('script');
        biaoqian.setAttribute('type', 'text/javascript');
        biaoqian.setAttribute('src', '//static.youlai.cn/js/newcommon/audio/answer/audio1.min.js');
        document.body.appendChild(biaoqian);
        var conBoxOffsetTop = $('#containnerBox').offset().top;
        $(window).scroll(function () {
            if ($(window).scrollTop() > conBoxOffsetTop) {
                $('.containner_box').addClass('containner_box_top');
            } else {
                $('.containner_box').removeClass('containner_box_top');
            }
        });
    };
    return customElement;
});
