/**
 * @file mip-hs-praise 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    $('.praise').click(function () {
        var That = $(this);
        var unzan = That.attr('url-unzan');
        var zan = That.attr('url-zan');
        var num = That.siblings('.constants').html();
        if (That.hasClass('praiseon')) {
            $.ajax({
                type: 'post',
                url: unzan,
                data: {
                    'answer_id': num
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status === 0) {
                        var b = That.children('i').text();
                        var oText = parseFloat(b);
                        That.children('i').text(oText - 1);
                        That.removeClass('praiseon');
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
                    'answer_id': num
                },
                dataType: 'json',
                success: function (data) {
                    console.log(That);
                    if (data.status === 0) {
                        var b = That.children('i').text();
                        var oText = parseFloat(b);
                        That.addClass('praiseon');
                        That.children('i').text(oText + 1);
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
