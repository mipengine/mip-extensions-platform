/**
 * @file 分页加载新闻插件
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var page = parseInt($(element).attr('data-page'), 10);
        var maxpage = parseInt($(element).attr('data-maxpage'), 10);
        var filename = $(element).attr('data-filename');
        function newHtml(obj, filename, page) {
            $.ajax({
                type: 'get',
                url: filename + '-' + page + '.htm?tim=' + new Date().getTime(),
                scriptCharset: 'utf-8',
                dataType: 'html',
                success: function (data) {
                    if (data) {
                        $(element).find('.news-content').html($(element).find('.news-content').html() + data);
                        obj.attr('data-page', ++page);
                    }
                },
                error: function (data) {
                    return false;
                }
            });
        }
        $(element).find('.more-button').click(function () {
            if (page <= maxpage) {
                newHtml($(this), filename, page);
            } else {
                $(this).remove();
            }
        });
    };
    return customElem;
});
