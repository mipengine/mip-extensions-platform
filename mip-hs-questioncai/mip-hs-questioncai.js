/**
 * @file mip-hs-questioncai 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    $('body').on('click', '.cai', function () {
        var That = $(this);
        var uncai = That.parent().attr('url-uncai');
        var cai = That.parent().attr('url-cai');
        var urlid = That.parent().attr('url-id');
        if (That.hasClass('caiactive')) {
            $.ajax({
                type: 'post',
                url: uncai,
                data: {
                    'answer_id': urlid
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status === 0) {
                        That.removeClass('caiactive');
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
                url: cai,
                data: {
                    'answer_id': urlid
                },
                dataType: 'json',
                success: function (data) {
                    console.log(That);
                    if (data.status === 0) {
                        That.addClass('caiactive');
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
