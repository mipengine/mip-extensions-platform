/**
 * @file mip-hs-answerdelete 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    $('body').on('click', '.answer_delete', function () {
        var That = $(this);
        var id = That.attr('data-id');
        if (confirm('您确定要删除吗？')) {
            $.ajax({
                url: '/question/del',
                data: {
                    id: id
                },
                type: 'POST',
                success: function (data) {
                    if (data.status === 0) {
                        That.parents('li').remove();
                        var num = $('#question').children('i').text() - 1;
                        $('#question').children('i').text(num);
                    }
                    else {
                        alert(data.msg);
                    }
                }
            });
        }
        else {
            return;
        }

    });

    customElement.prototype.firstInviewCallback = function () {};
    return customElement;
});
