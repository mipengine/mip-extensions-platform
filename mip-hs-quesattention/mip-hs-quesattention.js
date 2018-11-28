/**
 * @file mip-hs-quesattention 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    $('body').on('click', '.attention', function () {
        var That = $(this);
        var unattention = That.parent().attr('url-unattention');
        var attention = That.parent().attr('url-attention');
        var userid = That.parent().attr('user-id');
        if (That.hasClass('gzactive')) {
            $.ajax({
                type: 'post',
                url: attention,
                data: {
                    'user_id': userid
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status === 0) {
                        That.removeClass('gzactive');
                        That.text('已关注');
                    }
                    else {
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    if (data.statusText === 'Unauthorized') {
                        alert('请登录');
                        window.top.location.href = '/login?service=welcome';
                    }

                }
            });
        }
        else {
            $.ajax({
                type: 'post',
                url: unattention,
                data: {
                    'user_id': userid
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status === 0) {
                        That.addClass('gzactive');
                        That.text('关注');
                    }
                    else {
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    if (data.statusText === 'Unauthorized') {
                        alert('请登录');
                        window.top.location.href = '/login?service=welcome';
                    }

                }
            });
        }
    });
    customElement.prototype.firstInviewCallback = function () {};
    return customElement;
});
