/**
 * @file mip-hs-commentpraise 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    $('body').on('click', '.zan', function () {
        var That = $(this);
        var unzan = That.parent().attr('url-unzan');
        var zan = That.parent().attr('url-zan');
        var urlid = That.parent().attr('url-id');
        if (That.hasClass('praiseactive')) {
            $.ajax({
                type: 'post',
                url: unzan,
                data: {
                    'comment_id': urlid
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status === 0) {
                        var b = That.text();
                        var oText = parseFloat(b);
                        That.text(data.data.count);
                        That.removeClass('praiseactive');
                        That.parents('.num').removeClass('numactive');
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
                url: zan,
                data: {
                    'comment_id': urlid
                },
                dataType: 'json',
                success: function (data) {
                    console.log(That);
                    if (data.status === 0) {
                        var b = That.text();
                        var oText = parseFloat(b);
                        That.addClass('praiseactive');
                        That.parents('.num').addClass('numactive');
                        That.text(data.data.count);
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
