/**
 * @file mip-gotop 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    $('#GO_TOP').click(function () {
        $(window).scrollTop(0);
        return false;
    });

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        console.log(scrollTop);
        if (scrollTop > 300) {
            $('#FLOAT_BTN').show();
            setTimeout(floatHide, 3000);
        } else {
            $('#FLOAT_BTN').hide();
        }
        // 停止3秒后隐藏侧边栏
        function floatHide() {
            var nowTop = $(this).scrollTop();
            if (scrollTop === nowTop) {
                $('#FLOAT_BTN').hide();
            }
        }
    });
    return customElement;
});
