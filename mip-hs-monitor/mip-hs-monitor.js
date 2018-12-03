/**
 * @file mip-hs-monitor 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        doTimeNotice();
        setInterval(function () {
            doTimeNotice();
        }, 20000);
        function doTimeNotice() {
            $.ajax({
                url: '/new_notice',
                type: 'GET',
                success: function (res) {
                    var data = res.data;
                    if (data.notice > 0) {
                        $el.find('#notice_dot').addClass('dotRed');
                    }
                    else {
                        $el.find('#notice_dot').removeClass('dotRed');
                    }
                    if (data.zan > 0) {
                        $el.find('#digg_dot').addClass('dotRed');
                    }
                    else {
                        $el.find('#digg_dot').removeClass('dotRed');
                    }
                    if (data.comment > 0) {
                        $el.find('#comment_dot').addClass('dotRed');
                    }
                    else {
                        $el.find('#comment_dot').removeClass('dotRed');
                    }
                    if (data.focus > 0) {
                        $el.find('#follow_dot').addClass('dotRed');
                    }
                    else {
                        $el.find('#follow_dot').removeClass('dotRed');
                    }
                    var count = data.notice + data.zan + data.comment + data.focus;
                    if (count > 0) {
                        $el.find('#msg_num').text(count);
                        $el.find('#msg_num').addClass('msg_num');
                    }
                    else {
                        $el.find('#msg_num').text('');
                        $el.find('#msg_num').removeClass('msg_num');
                    }
                }
            });
        }
    };
    return customElement;
});
