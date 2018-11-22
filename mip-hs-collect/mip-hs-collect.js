/**
 * @file mip-hs-collect 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    $('.collect').click(function () {
        var That = $(this);
        var uncollect = That.attr('url-uncollect');
        var collect = That.attr('url-collect');
        var num = That.siblings('.collectnum').html();
        if (That.hasClass('collected')) {
            $.ajax({
                type: 'post',
                url: uncollect,
                data: {
                    'answer_id': num
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status === 0) {
                        That.removeClass('collected');
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
                url: collect,
                data: {
                    'answer_id': num
                },
                dataType: 'json',
                success: function (data) {
                    That.addClass('collected');
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
